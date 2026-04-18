import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, getAuthCookieOptions } from "@/lib/auth/jwt";
import { getRequestOrigin } from "@/lib/http/request-origin";

export async function POST(request: Request) {
  const origin = getRequestOrigin(request);

  const response = NextResponse.redirect(new URL("/login", origin), 303);

  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...getAuthCookieOptions(),
    maxAge: 0,
  });

  return response;
}
