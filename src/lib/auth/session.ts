import 'server-only';

import { timingSafeEqual } from 'node:crypto';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
   AUTH_COOKIE_NAME,
   type AuthTokenPayload,
   verifyAuthToken,
} from '@/lib/auth/jwt';

function getAdminUsername(): string {
   const username = process.env.ADMIN_USERNAME;

   if (!username) {
      throw new Error('ADMIN_USERNAME must be set.');
   }

   return username;
}

function getAdminPassword(): string {
   const password = process.env.ADMIN_PASSWORD;

   if (!password) {
      throw new Error('ADMIN_PASSWORD must be set.');
   }

   return password;
}

function safeEqual(left: string, right: string): boolean {
   const leftBuffer = Buffer.from(left);
   const rightBuffer = Buffer.from(right);

   if (leftBuffer.length !== rightBuffer.length) {
      return false;
   }

   return timingSafeEqual(leftBuffer, rightBuffer);
}

export function validateAdminCredentials(
   username: string,
   password: string,
): boolean {
   return (
      safeEqual(username, getAdminUsername()) &&
      safeEqual(password, getAdminPassword())
   );
}

export async function getSession(): Promise<AuthTokenPayload | null> {
   const cookieStore = await cookies();
   const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

   if (!token) {
      return null;
   }

   return verifyAuthToken(token);
}

export async function requireSession(): Promise<AuthTokenPayload> {
   const session = await getSession();

   if (!session) {
      redirect('/login');
   }

   return session;
}
