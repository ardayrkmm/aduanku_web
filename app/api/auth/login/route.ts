import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { connectDB } from "@/lib/mongo";
import AdminUser from "@/models/AdminUser";
import { generateToken, getCookieOptions } from "@/lib/auth";

// Zod schema for request validation
const LoginRequestSchema = z.object({
  email: z.string().email("Email harus valid"),
  password: z.string().min(1, "Password harus diisi"),
});

type LoginRequest = z.infer<typeof LoginRequestSchema>;

/**
 * POST /api/auth/login
 *
 * Authenticate admin user with email and password
 *
 * Request body:
 * {
 *   email: string,
 *   password: string
 * }
 *
 * Response (200):
 * {
 *   success: true,
 *   message: "Login berhasil"
 * }
 *
 * Response (401):
 * {
 *   success: false,
 *   message: "Email atau password salah"
 * }
 *
 * Response (500):
 * {
 *   success: false,
 *   message: "Terjadi kesalahan server"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Parse request body
    const body = await request.json();

    // Step 3: Validate request with Zod
    const validationResult = LoginRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah",
        },
        { status: 401 },
      );
    }

    const { email, password }: LoginRequest = validationResult.data;

    // Step 4: Find admin user by email
    const adminUser = await AdminUser.findOne({ email: email.toLowerCase() });

    // Step 5: Check if user exists
    if (!adminUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah",
        },
        { status: 401 },
      );
    }

    // Step 6: Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(
      password,
      adminUser.passwordHash,
    );

    // Step 7: Check if password is correct
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah",
        },
        { status: 401 },
      );
    }

    // Step 8: Update lastLoginAt timestamp
    adminUser.lastLoginAt = new Date();
    await adminUser.save();

    // Step 9: Generate JWT token
    const token = generateToken(adminUser._id.toString(), adminUser.email);
    const cookieOptions = getCookieOptions();

    // Step 10: Return success response with HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login berhasil",
      },
      { status: 200 },
    );

    // Set HTTP-only cookie with JWT token
    response.cookies.set(cookieOptions.name, token, cookieOptions.options);

    return response;
  } catch (error) {
    // Step 10: Handle errors
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
