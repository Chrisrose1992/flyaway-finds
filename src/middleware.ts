import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    if (pathname.startsWith("/auth")) {
        if (token) {
            try {
                const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
                const { payload } = await jwtVerify(token, secret);
                const role = payload.role;

                const redirectPath = role === "admin" ? "/admin/dashboard" : "/account/my-profile";
                return NextResponse.redirect(new URL(redirectPath, req.url));
            } catch (err) {
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
        const { payload } = await jwtVerify(token, secret);
        const role = payload.role;

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("Authorization", `Bearer ${token}`);
        requestHeaders.set("x-user-id", String(payload.id || ""));

        // Role-based route protection
        if (pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (pathname.startsWith("/account") && role !== "customer") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (err) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/auth/:path*", "/account/:path*", "/admin/:path*"],
};
