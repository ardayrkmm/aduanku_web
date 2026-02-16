import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { connectDB } from "@/lib/mongo";
import Complaint from "@/models/Complaint";
import Category from "@/models/Category";

/**
 * POST /api/reports/export/excel
 *
 * Generate and export complaint analytics report as Excel (.xlsx)
 * Creates multiple sheets: Summary, Trends, Categories, Areas
 *
 * Request body (optional):
 * {
 *   startDate?: string (ISO date),
 *   endDate?: string (ISO date)
 * }
 *
 * Response:
 * - Excel file as downloadable stream
 */
export async function POST(request: NextRequest) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Parse request body
    const body = await request.json();
    const { startDate, endDate } = body || {};

    // Build date filter
    const dateFilter: Record<string, any> = {};
    if (startDate) {
      dateFilter.$gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.$lte = new Date(endDate);
    }

    const createdAtFilter =
      Object.keys(dateFilter).length > 0
        ? { createdAt: dateFilter }
        : {
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
            },
          };

    // Step 3: Fetch report data
    // Summary statistics
    const summaryStats = await Complaint.aggregate([
      {
        $match: createdAtFilter,
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          resolved: {
            $sum: {
              $cond: [{ $eq: ["$status", "SELESAI"] }, 1, 0],
            },
          },
          unresolved: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $ne: ["$status", "SELESAI"] },
                    { $eq: ["$resolvedAt", null] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          highPriority: {
            $sum: {
              $cond: [{ $in: ["$priorityLevel", ["HIGH", "URGENT"]] }, 1, 0],
            },
          },
          averageResponseTime: { $avg: "$responseMinutes" },
        },
      },
    ]);

    // Monthly trend data
    const trendStats = await Complaint.aggregate([
      {
        $match: createdAtFilter,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Category data
    const categoryStats = await Complaint.aggregate([
      {
        $match: { category: { $exists: true, $ne: null }, ...createdAtFilter },
      },
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
      {
        $group: {
          _id: "$category",
          name: { $first: "$categoryData.name" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // District/Area data
    const districtStats = await Complaint.aggregate([
      {
        $match: { rt: { $exists: true, $ne: null }, ...createdAtFilter },
      },
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
      {
        $group: {
          _id: "$districtData._id",
          area: { $first: "$districtData.name" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    // Step 4: Create workbook
    const workbook = new ExcelJS.Workbook();

    // Sheet 1: Summary
    const summarySheet = workbook.addWorksheet("Ringkasan");
    const stats = summaryStats[0] || {};

    summarySheet.columns = [
      { header: "Metrik", key: "metric", width: 30 },
      { header: "Nilai", key: "value", width: 20 },
    ];

    const summaryRows = [
      { metric: "Total Aduan", value: stats.total || 0 },
      { metric: "Terselesaikan", value: stats.resolved || 0 },
      { metric: "Belum Terselesaikan", value: stats.unresolved || 0 },
      { metric: "Prioritas Tinggi/Urgen", value: stats.highPriority || 0 },
      {
        metric: "Rata-rata Waktu Respons (jam)",
        value: stats.averageResponseTime
          ? Math.round(stats.averageResponseTime / 60)
          : "N/A",
      },
      {
        metric: "Tingkat Penyelesaian (%)",
        value: stats.total
          ? ((stats.resolved / stats.total) * 100).toFixed(2)
          : 0,
      },
    ];

    summarySheet.addRows(summaryRows);

    // Style summary sheet
    summarySheet.getCell("A1").font = { bold: true };
    summarySheet.getCell("B1").font = { bold: true };
    summarySheet.rows.forEach((row) => {
      row.getCell("A").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      row.getCell("B").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Sheet 2: Trends
    const trendsSheet = workbook.addWorksheet("Tren Bulanan");
    trendsSheet.columns = [
      { header: "Bulan", key: "month", width: 15 },
      { header: "Jumlah Aduan", key: "count", width: 15 },
    ];

    const trendRows = trendStats.map((trend) => ({
      month: trend._id,
      count: trend.count,
    }));

    trendsSheet.addRows(trendRows);

    // Style trends sheet
    trendsSheet.getCell("A1").font = { bold: true };
    trendsSheet.getCell("B1").font = { bold: true };
    trendsSheet.rows.forEach((row) => {
      row.getCell("A").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      row.getCell("B").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Sheet 3: Categories
    const categoriesSheet = workbook.addWorksheet("Kategori");
    categoriesSheet.columns = [
      { header: "Kategori", key: "name", width: 25 },
      { header: "Jumlah", key: "count", width: 15 },
      { header: "Persentase (%)", key: "percentage", width: 15 },
    ];

    const categoryRows = categoryStats.map((cat) => ({
      name: cat.name,
      count: cat.count,
      percentage: ((cat.count / stats.total) * 100).toFixed(2),
    }));

    categoriesSheet.addRows(categoryRows);

    // Style categories sheet
    categoriesSheet.getCell("A1").font = { bold: true };
    categoriesSheet.getCell("B1").font = { bold: true };
    categoriesSheet.getCell("C1").font = { bold: true };
    categoriesSheet.rows.forEach((row) => {
      ["A", "B", "C"].forEach((col) => {
        row.getCell(col).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Sheet 4: Areas/Districts
    const areasSheet = workbook.addWorksheet("Area Wilayah");
    areasSheet.columns = [
      { header: "Wilayah", key: "area", width: 25 },
      { header: "Jumlah Aduan", key: "total", width: 15 },
      { header: "Persentase (%)", key: "percentage", width: 15 },
    ];

    const areaRows = districtStats.map((dist) => ({
      area: dist.area,
      total: dist.total,
      percentage: ((dist.total / stats.total) * 100).toFixed(2),
    }));

    areasSheet.addRows(areaRows);

    // Style areas sheet
    areasSheet.getCell("A1").font = { bold: true };
    areasSheet.getCell("B1").font = { bold: true };
    areasSheet.getCell("C1").font = { bold: true };
    areasSheet.rows.forEach((row) => {
      ["A", "B", "C"].forEach((col) => {
        row.getCell(col).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Step 5: Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Step 6: Return Excel file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="laporan-aduan-${new Date().getTime()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Excel export error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat laporan Excel",
      },
      { status: 500 },
    );
  }
}
