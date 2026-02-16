import { NextResponse } from "next/server";
import { getDashboardStats } from "../../../../lib/services/dashboard.service";

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (err) {
    console.error("dashboard stats error:", err);
    return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
  }
}
