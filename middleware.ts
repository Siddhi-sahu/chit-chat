
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname, "ran middleware");

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
        const newURL = new URL('/api/auth/signin', request.url)
        return NextResponse.redirect(newURL)


    }
    return NextResponse.next();

}

export const config = { matcher: ["/dashboard"] }