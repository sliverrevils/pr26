import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./config/auth";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await auth();

    if (!session) return NextResponse.redirect(new URL("/sign-in", request.url));

    const { user } = session;

    if (pathname.startsWith("/admin") && user.role !== "admin")
        return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/admin/:path*"],
};
