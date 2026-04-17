import { NextResponse } from 'next/server';

import { createOpenApiSpec } from '@/lib/api/openapi';

export async function GET(request: Request) {
   return NextResponse.json(createOpenApiSpec(new URL(request.url).origin));
}
