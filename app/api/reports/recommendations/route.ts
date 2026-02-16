import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Complaint from "@/models/Complaint";
import Category from "@/models/Category";
import Rt from "@/models/Rt";
import Rw from "@/models/Rw";
import Village from "@/models/Village";
import District from "@/models/District";

export interface RecommendationItem {
  id: number;
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  action: string;
  dataPoint?: number;
}

/**
 * GET /api/reports/recommendations
 *
 * Generate data-driven recommendations based on complaint analytics
 * Analyzes patterns to identify policy and process improvements
 *
 * Rules:
 * 1. If one category dominates (>30%) → policy recommendation
 * 2. If complaints in district show growth trend → infrastructure review
 * 3. If high-priority unresolved complaints exist → urgent process review
 * 4. If resolution time is high → process optimization
 * 5. If specific areas have low resolution rate → targeted deployment
 */
export async function GET(request: NextRequest) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    const recommendations: RecommendationItem[] = [];
    let recommendationId = 1;

    // ==========================================
    // Rule 1: Category Dominance Analysis
    // ==========================================
    const categoryStats = await Complaint.aggregate([
      {
        $match: {
          category: { $exists: true, $ne: null },
        },
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

    const totalComplaints = categoryStats.reduce(
      (sum, cat) => sum + cat.count,
      0,
    );

    // Check if one category dominates
    if (categoryStats.length > 0) {
      const topCategory = categoryStats[0];
      const dominancePercentage = (topCategory.count / totalComplaints) * 100;

      if (dominancePercentage > 30) {
        recommendations.push({
          id: recommendationId++,
          type: "warning",
          title: `Fokus pada Kategori ${topCategory.name}`,
          description: `${topCategory.name} menyumbang ${dominancePercentage.toFixed(1)}% dari total aduan. Diperlukan strategi khusus untuk mengatasi masalah ini.`,
          action: "Tingkatkan alokasi sumber daya untuk kategori ini",
          dataPoint: Math.round(dominancePercentage),
        });
      }
    }

    // ==========================================
    // Rule 2: Unresolved High-Priority Complaints
    // ==========================================
    const unresolvedHighPriority = await Complaint.countDocuments({
      priorityLevel: { $in: ["HIGH", "URGENT"] },
      $or: [{ status: { $ne: "SELESAI" } }, { resolvedAt: null }],
    });

    if (unresolvedHighPriority > 10) {
      recommendations.push({
        id: recommendationId++,
        type: "warning",
        title: "Penanganan Aduan Prioritas Tinggi",
        description: `Terdapat ${unresolvedHighPriority} aduan dengan prioritas tinggi/urgen yang belum diselesaikan. Eskalasi diperlukan untuk mencegah dampak negatif lebih lanjut.`,
        action: "Tinjau dan tindaklanjuti aduan prioritas tinggi segera",
        dataPoint: unresolvedHighPriority,
      });
    } else if (unresolvedHighPriority > 0) {
      recommendations.push({
        id: recommendationId++,
        type: "info",
        title: "Monitor Aduan Prioritas",
        description: `Masih ada ${unresolvedHighPriority} aduan prioritas tinggi dalam proses. Terus pantau untuk memastikan penyelesaian tepat waktu.`,
        action: "Lakukan pemeriksaan rutin terhadap aduan prioritas",
        dataPoint: unresolvedHighPriority,
      });
    }

    // ==========================================
    // Rule 3: Resolution Rate Analysis
    // ==========================================
    const completionStats = await Complaint.aggregate([
      {
        $group: {
          _id: null,
          totalComplaints: { $sum: 1 },
          resolvedComplaints: {
            $sum: {
              $cond: [{ $eq: ["$status", "SELESAI"] }, 1, 0],
            },
          },
          averageResponseTime: {
            $avg: "$responseMinutes",
          },
        },
      },
    ]);

    if (completionStats.length > 0) {
      const stats = completionStats[0];
      const resolutionRate =
        (stats.resolvedComplaints / stats.totalComplaints) * 100;

      if (resolutionRate < 50) {
        recommendations.push({
          id: recommendationId++,
          type: "warning",
          title: "Tingkat Penyelesaian Rendah",
          description: `Hanya ${resolutionRate.toFixed(1)}% aduan yang telah diselesaikan. Tinjau kembali proses penanganan dan alokasi SDM.`,
          action: "Lakukan audit proses dan tambah kapasitas jika diperlukan",
          dataPoint: Math.round(resolutionRate),
        });
      } else if (resolutionRate > 80) {
        recommendations.push({
          id: recommendationId++,
          type: "success",
          title: "Kinerja Penyelesaian Baik",
          description: `Tingkat penyelesaian mencapai ${resolutionRate.toFixed(1)}%. Pertahankan momentum dan praktik terbaik yang sedang berjalan.`,
          action:
            "Dokumentasikan best practices untuk direplikasi ke unit lain",
          dataPoint: Math.round(resolutionRate),
        });
      }

      // Average response time analysis
      if (stats.averageResponseTime && stats.averageResponseTime > 1440) {
        // 1440 minutes = 24 hours
        const days = (stats.averageResponseTime / 1440).toFixed(1);
        recommendations.push({
          id: recommendationId++,
          type: "warning",
          title: "Waktu Respons Lambat",
          description: `Rata-rata waktu respons mencapai ${days} hari. Target SLA mungkin tidak tercapai jika tren ini berlanjut.`,
          action: "Optimalkan alur kerja dan komunikasi internal",
          dataPoint: Math.round(stats.averageResponseTime / 60), // Convert to hours
        });
      }
    }

    // ==========================================
    // Rule 4: Geographic Hotspot Analysis
    // ==========================================
    const districtStats = await Complaint.aggregate([
      {
        $match: {
          rt: { $exists: true, $ne: null },
        },
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
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    if (districtStats.length > 0) {
      const topDistrict = districtStats[0];
      const unresolvedRate = (topDistrict.unresolved / topDistrict.total) * 100;

      recommendations.push({
        id: recommendationId++,
        type: "warning",
        title: `Area Perhatian Khusus: ${topDistrict.area}`,
        description: `${topDistrict.area} memiliki ${topDistrict.total} aduan dengan tingkat penyelesaian ${(100 - unresolvedRate).toFixed(1)}%. Pertimbangkan penugasan khusus atau dukungan tambahan.`,
        action:
          "Lakukan survei lapangan dan koordinasi dengan stakeholder lokal",
        dataPoint: topDistrict.total,
      });
    }

    // ==========================================
    // Rule 5: Trend-Based Recommendation
    // ==========================================
    // Check if complaints are increasing or decreasing
    const monthlyTrend = await Complaint.aggregate([
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
        $sort: { _id: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    if (monthlyTrend.length >= 2) {
      const latestMonth = monthlyTrend[0].count;
      const previousMonth = monthlyTrend[1].count;
      const changePercent =
        ((latestMonth - previousMonth) / previousMonth) * 100;

      if (changePercent > 20) {
        recommendations.push({
          id: recommendationId++,
          type: "warning",
          title: "Peningkatan Aduan Signifikan",
          description: `Aduan meningkat ${changePercent.toFixed(1)}% bulan lalu. Ada indikasi masalah baru atau eskalasi masalah yang ada.`,
          action:
            "Lakukan riset cepat untuk mengidentifikasi penyebab peningkatan",
          dataPoint: Math.round(changePercent),
        });
      } else if (changePercent < -20) {
        recommendations.push({
          id: recommendationId++,
          type: "success",
          title: "Penurunan Aduan Positif",
          description: `Aduan menurun ${Math.abs(changePercent).toFixed(1)}% bulan lalu. Intervensi yang dilakukan terbukti efektif.`,
          action: "Dokumentasikan dan evaluasi intervensi yang telah dilakukan",
          dataPoint: Math.round(changePercent),
        });
      }
    }

    // If we have fewer than 5 recommendations, add a general success one
    if (recommendations.length < 5) {
      recommendations.push({
        id: recommendationId++,
        type: "info",
        title: "Terus Monitor Metrik Kunci",
        description: `Sistem monitoring aduan berjalan dengan baik. Lanjutkan pengumpulan data dan analisis rutin untuk mengidentifikasi tren dan pola baru.`,
        action:
          "Buat dashboard monitoring real-time untuk pengambilan keputusan lebih cepat",
      });
    }

    // Step 2: Return recommendations
    return NextResponse.json(
      {
        success: true,
        data: recommendations,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Recommendations API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghasilkan rekomendasi",
      },
      { status: 500 },
    );
  }
}
