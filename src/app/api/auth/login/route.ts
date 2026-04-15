import { NextResponse } from 'next/server';

import {
   AUTH_COOKIE_NAME,
   getAuthCookieOptions,
   signAuthToken,
} from '@/lib/auth/jwt';
import { validateAdminCredentials } from '@/lib/auth/session';

function getSafeNextPath(candidate: string | null): string {
   if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//')) {
      return '/dashboard';
   }

   return candidate;
}

export async function POST(request: Request) {
   const formData = await request.formData();
   const username = String(formData.get('username') ?? '').trim();
   const password = String(formData.get('password') ?? '');
   const next = getSafeNextPath(String(formData.get('next') ?? '/dashboard'));
   const redirectBaseUrl = new URL(request.url);

   if (!username || !password) {
      const redirectUrl = new URL('/login', redirectBaseUrl);
      redirectUrl.searchParams.set('error', 'missing_credentials');
      redirectUrl.searchParams.set('next', next);
      return NextResponse.redirect(redirectUrl);
   }

   try {
      if (!validateAdminCredentials(username, password)) {
         const redirectUrl = new URL('/login', redirectBaseUrl);
         redirectUrl.searchParams.set('error', 'invalid_credentials');
         redirectUrl.searchParams.set('next', next);
         return NextResponse.redirect(redirectUrl);
      }

      const token = await signAuthToken({ username });
      const response = NextResponse.redirect(new URL(next, redirectBaseUrl));

      response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

      return response;
   } catch {
      const redirectUrl = new URL('/login', redirectBaseUrl);
      redirectUrl.searchParams.set('error', 'auth_not_configured');
      redirectUrl.searchParams.set('next', next);
      return NextResponse.redirect(redirectUrl);
   }
}
