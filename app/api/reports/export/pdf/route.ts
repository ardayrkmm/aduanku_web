import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { connectDB } from "@/lib/mongo";
import Complaint from "@/models/Complaint";
import Category from "@/models/Category";

/**
 * POST /api/reports/export/pdf
 *
 * Generate and export complaint analytics report as PDF
 *
 * Request body (optional):
 * {
 *   startDate?: string (ISO date),
 *   endDate?: string (ISO date),
 *   includeRecommendations?: boolean
 * }
 *
 * Response:
 * - PDF file as downloadable stream
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
    // Get summary statistics
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

    // Get top categories
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
      {
        $limit: 5,
      },
    ]);

    // Get monthly trend data
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
      {
        $limit: 12,
      },
    ]);

    // Get top districts
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
      {
        $limit: 5,
      },
    ]);

    // Step 4: Create PDF document
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    const buffers: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => buffers.push(chunk));

    // Header
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("Laporan Analitik Aduan Publik", { align: "center" });

    doc
      .fontSize(12)
      .font("Helvetica")
      .text("Aduanku - Sistem Manajemen Aduan Masyarakat", {
        align: "center",
      })
      .moveDown(2);

    // Report date
    const stats = summaryStats[0] || {};
    doc
      .fontSize(10)
      .text(`Dibuat: ${new Date().toLocaleDateString("id-ID")}`, {
        align: "right",
      })
      .text(
        `Periode: ${startDate || "12 bulan terakhir"} - ${endDate || "Sekarang"}`,
        { align: "right" },
      )
      .moveDown(2);

    // Summary Section
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("RINGKASAN STATISTIK", { underline: true })
      .moveDown();

    const summaryData = [
      { label: "Total Aduan", value: stats.total || 0 },
      { label: "Terselesaikan", value: stats.resolved || 0 },
      { label: "Belum Terselesaikan", value: stats.unresolved || 0 },
      { label: "Prioritas Tinggi/Urgen", value: stats.highPriority || 0 },
      {
        label: "Rata-rata Waktu Respons",
        value: stats.averageResponseTime
          ? `${Math.round(stats.averageResponseTime / 60)} jam`
          : "N/A",
      },
    ];

    doc.fontSize(11);
    summaryData.forEach((item) => {
      doc.text(`${item.label}: ${item.value}`, { indent: 20 });
    });

    doc.moveDown(2);

    // Category Distribution Section
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("DISTRIBUSI KATEGORI ADUAN (TOP 5)", { underline: true })
      .moveDown();

    doc.fontSize(11);
    categoryStats.forEach((cat, index) => {
      const percentage = ((cat.count / stats.total) * 100).toFixed(1);
      doc.text(
        `${index + 1}. ${cat.name}: ${cat.count} aduan (${percentage}%)`,
        { indent: 20 },
      );
    });

    doc.moveDown(2);

    // Area/District Section
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("AREA PALING BERMASALAH (TOP 5)", { underline: true })
      .moveDown();

    doc.fontSize(11);
    districtStats.forEach((dist, index) => {
      doc.text(`${index + 1}. ${dist.area}: ${dist.total} aduan`, {
        indent: 20,
      });
    });

    doc.moveDown(2);

    // Monthly Trend Section
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("TREN BULANAN", { underline: true })
      .moveDown();

    doc.fontSize(11);
    trendStats.forEach((trend) => {
      doc.text(`${trend._id}: ${trend.count} aduan`, { indent: 20 });
    });

    doc.moveDown(2);

    // Footer
    doc
      .fontSize(9)
      .text(
        "Laporan ini dibuat otomatis oleh sistem Aduanku untuk keperluan analisis dan pengambilan keputusan.",
        { align: "center" },
      );

    // Finalize PDF
    doc.end();

    // Wait for PDF to finish
    await new Promise<void>((resolve, reject) => {
      doc.on("finish", () => resolve());
      doc.on("error", reject);
    });

    const pdfBuffer = Buffer.concat(buffers);

    // Step 5: Return PDF as file download
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="laporan-aduan-${new Date().getTime()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat laporan PDF",
      },
      { status: 500 },
    );
  }
}
