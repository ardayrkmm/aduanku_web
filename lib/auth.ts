import jwt from "jsonwebtoken";

// Get JWT secret from environment variables
const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-this";
const JWT_EXPIRES_IN = "7d"; // 7 days

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Generate JWT token
 * @param userId - User ID from MongoDB
 * @param email - User email
 * @returns JWT token string
 */
export function generateToken(userId: string, email: string): string {
  return jwt.sign(
    {
      userId,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );
}

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

/**
 * Get cookie options for HTTP-only session cookie
 * @returns Cookie options object
 */
export function getCookieOptions() {
  return {
    name: "admin_session",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/",
    },
  };
}
