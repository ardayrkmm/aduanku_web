import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect dashboard paths
  if (pathname.startsWith("/dashboard")) {
    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie ? tokenCookie.value : null;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET not configured");
      jwt.verify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
