import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import AdminUser from "@/models/AdminUser";

export async function GET(req: NextRequest) {
  try {
    // Get the session token from cookies
    const token = req.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No session token found",
        },
        { status: 401 },
      );
    }

    // Verify the JWT token
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired session token",
        },
        { status: 401 },
      );
    }

    // Connect to database and fetch latest user data
    await connectDB();
    const adminUser = await AdminUser.findById(payload.userId).select(
      "email lastLoginAt",
    );

    if (!adminUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    // Return user data
    return NextResponse.json(
      {
        success: true,
        data: {
          userId: payload.userId,
          email: adminUser.email,
          lastLoginAt: adminUser.lastLoginAt,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
