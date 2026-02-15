import { Complaint } from "../../models/index";

export type MonthlyTrendPoint = {
  month: string; // YYYY-MM
  count: number;
};

export type DashboardStats = {
  totalComplaints: number;
  activeComplaints: number;
  completedComplaints: number;
  monthlyTrend: MonthlyTrendPoint[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const activeComplaints = await Complaint.countDocuments({ status: { $nin: ["SELESAI", "DITOLAK"] } });
    const completedComplaints = await Complaint.countDocuments({ status: "SELESAI" });

    const trendAgg = await Complaint.aggregate([
      { $match: {} },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    const monthlyTrend = trendAgg.map((p: any) => {
      const mm = String(p.month).padStart(2, "0");
      return { month: `${p.year}-${mm}`, count: p.count } as MonthlyTrendPoint;
    });

    return { totalComplaints, activeComplaints, completedComplaints, monthlyTrend };
  } catch (err) {
    console.error("getDashboardStats error:", err);
    throw err;
  }
}

export default { getDashboardStats };
