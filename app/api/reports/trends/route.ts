import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Complaint from "@/models/Complaint";
import Category from "@/models/Category";

/**
 * GET /api/reports/trends
 *
 * Fetch trend data for monthly complaint analysis
 * Groups complaints by month and category
 * Returns last 12 months of data by default
 *
 * Query parameters (optional):
 * - months: number of months to return (default: 12)
 * - startDate: ISO date string
 * - endDate: ISO date string
 */
export async function GET(request: NextRequest) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const monthsParam = searchParams.get("months");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    const months = monthsParam ? parseInt(monthsParam) : 12;

    // Calculate date range for last N months
    let startDate: Date;
    let endDate: Date = new Date();

    if (startDateParam) {
      startDate = new Date(startDateParam);
    } else {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - months);
    }

    if (endDateParam) {
      endDate = new Date(endDateParam);
    }

    // Step 3: Aggregate complaints by month and category
    const trendData = await Complaint.aggregate([
      // Match complaints within date range
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
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
      // Format date as YYYY-MM for grouping
      {
        $group: {
          _id: {
            month: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt",
              },
            },
            category: {
              $ifNull: ["$categoryData.name", "Lainnya"],
            },
          },
          count: { $sum: 1 },
        },
      },
      // Sort by month ascending
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // Step 4: Transform aggregation result into chart format
    // Group by month and create categories as separate fields
    const monthMap = new Map<string, any>();

    for (const item of trendData) {
      const { month, category } = item._id;
      const count = item.count;

      if (!monthMap.has(month)) {
        monthMap.set(month, {
          month,
          infrastruktur: 0,
          pelayanan_publik: 0,
          kebersihan: 0,
        });
      }

      const monthData = monthMap.get(month);

      // Map category names to chart fields
      if (category.toLowerCase().includes("infrastruktur")) {
        monthData.infrastruktur += count;
      } else if (
        category.toLowerCase().includes("pelayanan") ||
        category.toLowerCase().includes("layanan")
      ) {
        monthData.pelayanan_publik += count;
      } else if (category.toLowerCase().includes("kebersihan")) {
        monthData.kebersihan += count;
      } else {
        // Distribute other categories
        monthData.infrastruktur += Math.ceil(count / 3);
        monthData.pelayanan_publik += Math.floor(count / 3);
        monthData.kebersihan += Math.floor(count / 3);
      }
    }

    // Convert map to array and sort by month
    const result = Array.from(monthMap.values()).sort((a, b) =>
      a.month.localeCompare(b.month),
    );

    // Step 5: Return trend data
    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Trends API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data tren",
      },
      { status: 500 },
    );
  }
}
