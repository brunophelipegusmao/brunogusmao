import { NextResponse } from "next/server";

import { createOpenApiSpec } from "@/lib/api/openapi";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(createOpenApiSpec(new URL(request.url).origin));
}
