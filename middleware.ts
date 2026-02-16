import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

// Use Node.js runtime to support crypto module for JWT verification
export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin dashboard and analytics paths
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    // Get the session token from cookies
    const tokenCookie = req.cookies.get("admin_session");
    const token = tokenCookie ? tokenCookie.value : null;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/admin/login", req.url));
    }

    // Verify the JWT token
    const payload = verifyToken(token);

    if (!payload) {
      // Token is invalid or expired, redirect to login
      const response = NextResponse.redirect(
        new URL("/auth/admin/login", req.url),
      );
      // Clear the invalid cookie
      response.cookies.delete("admin_session");
      return response;
    }

    // Token is valid, continue to the next middleware or request handler
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
