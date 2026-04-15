import { type JWTPayload, jwtVerify, SignJWT } from 'jose';

export const AUTH_COOKIE_NAME = 'bg-admin-token';
const AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export interface AuthTokenPayload extends JWTPayload {
   sub: 'admin';
   role: 'admin';
   username: string;
}

function getJwtSecret(): Uint8Array {
   const secret = process.env.JWT_SECRET;

   if (!secret || secret.length < 32) {
      throw new Error('JWT_SECRET must be set with at least 32 characters.');
   }

   return new TextEncoder().encode(secret);
}

export function getAuthCookieOptions() {
   return {
      httpOnly: true,
      path: '/',
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      maxAge: AUTH_TOKEN_TTL_SECONDS,
   };
}

export async function signAuthToken(
   payload: Pick<AuthTokenPayload, 'username'>,
): Promise<string> {
   return new SignJWT({
      role: 'admin',
      username: payload.username,
   })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('admin')
      .setIssuedAt()
      .setExpirationTime(`${AUTH_TOKEN_TTL_SECONDS}s`)
      .sign(getJwtSecret());
}

export async function verifyAuthToken(
   token: string,
): Promise<AuthTokenPayload | null> {
   try {
      const { payload } = await jwtVerify(token, getJwtSecret(), {
         algorithms: ['HS256'],
         subject: 'admin',
      });

      if (payload.role !== 'admin' || typeof payload.username !== 'string') {
         return null;
      }

      return payload as AuthTokenPayload;
   } catch {
      return null;
   }
}
