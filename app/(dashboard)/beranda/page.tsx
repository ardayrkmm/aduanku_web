import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import ComplaintTrendChart, { MonthlyTrendPoint } from "@/components/dashboard/ComplaintTrendChart";
import { headers } from "next/headers";
import React from "react";

interface DashboardStats {
  totalComplaints: number;
  activeComplaints: number;
  completedComplaints: number;
  monthlyTrend: MonthlyTrendPoint[];
}

async function fetchDashboardStats(): Promise<DashboardStats | null> {
  try {
    const hdrs = headers();
    const host = hdrs.get("host");
    if (!host) return null;
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/dashboard/stats`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    // If API returns the raw object, not { data: ... }
    if (
      typeof json.totalComplaints === "number" &&
      typeof json.activeComplaints === "number" &&
      typeof json.completedComplaints === "number" &&
      Array.isArray(json.monthlyTrend)
    ) {
      return json as DashboardStats;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function DashboardHomePage() {
  const stats = await fetchDashboardStats();

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <section>
        {stats ? (
          <DashboardStatsGrid
            total={stats.totalComplaints}
            active={stats.activeComplaints}
            completed={stats.completedComplaints}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-400">
            Unable to load dashboard stats.
          </div>
        )}
      </section>
      <section>
        <ComplaintTrendChart data={stats?.monthlyTrend ?? []} />
      </section>
    </div>
  );
}
