import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME, verifyAuthToken } from '@/lib/auth/jwt';

function buildLoginUrl(request: NextRequest): URL {
   const loginUrl = new URL('/login', request.url);
   const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

   loginUrl.searchParams.set('next', nextPath || '/dashboard');

   return loginUrl;
}

export async function middleware(request: NextRequest) {
   const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
   const pathname = request.nextUrl.pathname;
   const isPrivateRoute = pathname.startsWith('/dashboard');
   const isLoginRoute = pathname === '/login';
   const session = token ? await verifyAuthToken(token) : null;

   if (isPrivateRoute && !session) {
      return NextResponse.redirect(buildLoginUrl(request));
   }

   if (isLoginRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/dashboard/:path*', '/login'],
};
