// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//     console.log(request.nextUrl.pathname);
//     if (request.nextUrl.pathname.startsWith("/dashboard") && request.nextUrl.pathname !== "/api/auth/signin") {
//         return NextResponse.redirect(new URL('/api/auth/signin', request.url))
//     }


// }

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname);
}

export const config = { matcher: ["/dashboard"] }