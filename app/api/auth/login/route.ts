import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../../../../models/index";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body || {};
    if (!username || !password) {
      return NextResponse.json({ error: "username and password required" }, { status: 400 });
    }

    const admin = await Admin.findOne({ username }).exec();
    if (!admin) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });

    const payload = { id: admin._id.toString(), username: admin.username };
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
    if (!secret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign(payload, secret, { expiresIn });

    const maxAge = (() => {
      // convert a simple "1d" or numeric seconds to seconds
      if (/^\d+d$/.test(expiresIn)) {
        const days = parseInt(expiresIn.replace("d", ""), 10);
        return days * 24 * 60 * 60;
      }
      if (/^\d+$/.test(expiresIn)) return parseInt(expiresIn, 10);
      // fallback to 1 day
      return 24 * 60 * 60;
    })();

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
  }
}
