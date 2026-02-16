import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Complaint from "@/models/Complaint";
import Category from "@/models/Category";
import Rt from "@/models/Rt";
import Rw from "@/models/Rw";
import Village from "@/models/Village";
import District from "@/models/District";

/**
 * GET /api/analytics
 *
 * Fetch analytics data from MongoDB with real Complaint data
 *
 * Query parameters (optional):
 * - startDate: ISO date string (filter complaints from this date)
 * - endDate: ISO date string (filter complaints until this date)
 *
 * Response:
 * {
 *   priorityComplaints: ComplaintItem[],
 *   heatmap: HeatmapCell[],
 *   categoryStats: CategoryDataPoint[],
 *   areaIssues: AreaIssue[]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Parse query parameters for date filtering
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    // Build date match filter
    const dateFilter: Record<string, any> = {};
    if (startDateParam) {
      dateFilter.$gte = new Date(startDateParam);
    }
    if (endDateParam) {
      dateFilter.$lte = new Date(endDateParam);
    }

    const createdAtFilter =
      Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};

    // ==========================================
    // Feature 1: Priority Complaints (Top 10)
    // ==========================================
    const priorityComplaints = await Complaint.aggregate([
      // Match unresolved complaints (status != SELESAI or resolvedAt is null)
      {
        $match: {
          $or: [{ status: { $ne: "SELESAI" } }, { resolvedAt: null }],
          ...createdAtFilter,
        },
      },
      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Sort by priority score descending
      {
        $sort: { priorityScore: -1 },
      },
      // Limit to 10 records
      {
        $limit: 10,
      },
      // Format output
      {
        $project: {
          id: { $toString: "$_id" },
          ticketNumber: 1,
          title: 1,
          category: "$categoryData.name",
          priorityScore: 1,
          priorityLevel: 1,
          address: 1,
          createdAt: 1,
        },
      },
    ]);

    // ==========================================
    // Feature 2: Heatmap Data (Geo Density)
    // ==========================================
    const heatmapData = await Complaint.aggregate([
      // Match complaints with valid location only
      {
        $match: {
          "location.latitude": { $exists: true, $ne: null },
          "location.longitude": { $exists: true, $ne: null },
          $or: [{ status: { $ne: "SELESAI" } }, { resolvedAt: null }],
          ...createdAtFilter,
        },
      },
      // Group by rounded latitude/longitude (grid aggregation)
      // Round to 2 decimal places for basic grid clustering
      {
        $group: {
          _id: {
            lat: {
              $round: ["$location.latitude", 2],
            },
            lng: {
              $round: ["$location.longitude", 2],
            },
          },
          intensity: { $sum: 1 },
        },
      },
      // Format output
      {
        $project: {
          lat: "$_id.lat",
          lng: "$_id.lng",
          intensity: 1,
          _id: 0,
        },
      },
    ]);

    // ==========================================
    // Feature 3: Category Stats (Frequency)
    // ==========================================
    const categoryStats = await Complaint.aggregate([
      // Match complaints with category
      {
        $match: {
          category: { $exists: true, $ne: null },
          ...createdAtFilter,
        },
      },
      // Populate category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      // Group by category and count
      {
        $group: {
          _id: "$category",
          name: { $first: "$categoryData.name" },
          count: { $sum: 1 },
        },
      },
      // Sort by count descending
      {
        $sort: { count: -1 },
      },
      // Format output
      {
        $project: {
          name: 1,
          value: "$count",
          _id: 0,
        },
      },
    ]);

    // ==========================================
    // Feature 4: Area/District Stats
    // ==========================================
    // This requires joining through: Complaint -> RT -> RW -> Village -> District
    const areaIssues = await Complaint.aggregate([
      // Match complaints with RT reference
      {
        $match: {
          rt: { $exists: true, $ne: null },
          ...createdAtFilter,
        },
      },
      // Join with RT
      {
        $lookup: {
          from: "rts",
          localField: "rt",
          foreignField: "_id",
          as: "rtData",
        },
      },
      {
        $unwind: "$rtData",
      },
      // Join with RW
      {
        $lookup: {
          from: "rws",
          localField: "rtData.rw",
          foreignField: "_id",
          as: "rwData",
        },
      },
      {
        $unwind: "$rwData",
      },
      // Join with Village
      {
        $lookup: {
          from: "villages",
          localField: "rwData.village",
          foreignField: "_id",
          as: "villageData",
        },
      },
      {
        $unwind: "$villageData",
      },
      // Join with District
      {
        $lookup: {
          from: "districts",
          localField: "villageData.district",
          foreignField: "_id",
          as: "districtData",
        },
      },
      {
        $unwind: "$districtData",
      },
      // Group by district and count
      {
        $group: {
          _id: "$districtData._id",
          area: { $first: "$districtData.name" },
          total: { $sum: 1 },
        },
      },
      // Sort by count descending
      {
        $sort: { total: -1 },
      },
      // Limit to top 5 districts
      {
        $limit: 5,
      },
      // Format output
      {
        $project: {
          area: 1,
          total: 1,
          _id: 0,
        },
      },
    ]);

    // Step 3: Return structured response
    return NextResponse.json(
      {
        success: true,
        data: {
          priorityComplaints,
          heatmap: heatmapData,
          categoryStats,
          areaIssues,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data analytics",
      },
      { status: 500 },
    );
  }
}
