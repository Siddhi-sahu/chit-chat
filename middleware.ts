import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname.startsWith("/") && request.nextUrl.pathname !== "/api/auth/signin") {
        return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }


}