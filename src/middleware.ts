import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get(process.env.NODE_ENV === "development" ? "authjs.session-token" : "__Secure-authjs.session-token")?.value;
    if (request.nextUrl.pathname.startsWith("/profile") && !sessionCookie) return NextResponse.redirect(new URL("/sign-in", request.url));
    return NextResponse.next();
}
