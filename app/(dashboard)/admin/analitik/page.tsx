"use client";

import { useState, useEffect } from "react";
import RankingPrioritas from "@/components/analitik/RankingPrioritas";
import HeatmapMasalah from "@/components/analitik/HeatmapMasalah";
import KategoriChart from "@/components/analitik/KategoriChart";
import WilayahBermasalah from "@/components/analitik/WilayahBermasalah";
import {
  ComplaintItem,
  CategoryDataPoint,
  AreaIssue,
  HeatmapCell,
} from "@/lib/analitik-data";

// Color palette for category chart
const CATEGORY_COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#14b8a6",
];

export default function AnalitikPage() {
  const [priorityComplaints, setPriorityComplaints] = useState<ComplaintItem[]>(
    [],
  );
  const [categoryStats, setCategoryStats] = useState<CategoryDataPoint[]>([]);
  const [areaIssues, setAreaIssues] = useState<AreaIssue[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch analytics data from API
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the analytics API
        const response = await fetch("/api/analytics");

        if (!response.ok) {
          throw new Error("Gagal mengambil data analytics");
        }

        const result = await response.json();

        if (result.success && result.data) {
          const { priorityComplaints, categoryStats, areaIssues, heatmap } =
            result.data;

          // Transform priority complaints
          const transformedComplaints: ComplaintItem[] = priorityComplaints.map(
            (complaint: any, index: number) => ({
              id: index + 1,
              title: complaint.title || "Aduan Tanpa Judul",
              location: complaint.address || "Lokasi Tidak Diketahui",
              severity:
                complaint.priorityLevel === "URGENT" ||
                complaint.priorityLevel === "HIGH"
                  ? ("Kritis" as const)
                  : ("Tinggi" as const),
              time: formatTimeAgo(new Date(complaint.createdAt)),
              category: complaint.category || "Lainnya",
            }),
          );

          // Transform category stats with colors
          const transformedCategories: CategoryDataPoint[] = categoryStats.map(
            (cat: any, index: number) => ({
              name: cat.name || "Lainnya",
              value: cat.value || 0,
              color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
            }),
          );

          // Transform area issues
          const transformedAreas: AreaIssue[] = areaIssues.map((area: any) => ({
            area: area.area || "Area Tidak Diketahui",
            totalIssues: area.total || 0,
          }));

          // Transform heatmap data
          const transformedHeatmap: HeatmapCell[] = heatmap.map(
            (point: any, index: number) => ({
              x: index % 10,
              y: Math.floor(index / 10),
              intensity: point.intensity || 0,
            }),
          );

          setPriorityComplaints(transformedComplaints);
          setCategoryStats(transformedCategories);
          setAreaIssues(transformedAreas);
          setHeatmapData(transformedHeatmap);
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan yang tidak terduga",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Helper function to format time ago
  function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} menit yang lalu`;
    } else if (diffHours < 24) {
      return `${diffHours} jam yang lalu`;
    } else if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    } else {
      return date.toLocaleDateString("id-ID");
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Analitik & Prioritas Aduan
            </h1>
            <p className="text-gray-600">
              Dashboard komprehensif untuk melihat tren, prioritas, dan
              distribusi aduan di berbagai wilayah
            </p>
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3B7C]"></div>
              <p className="mt-4 text-gray-600">Memuat data analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Analitik & Prioritas Aduan
            </h1>
            <p className="text-gray-600">
              Dashboard komprehensif untuk melihat tren, prioritas, dan
              distribusi aduan di berbagai wilayah
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 font-semibold">Terjadi Kesalahan</p>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Analitik & Prioritas Aduan
          </h1>
          <p className="text-gray-600">
            Dashboard komprehensif untuk melihat tren, prioritas, dan distribusi
            aduan di berbagai wilayah
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Ranking Prioritas (1 col) */}
          <div className="lg:col-span-1">
            <RankingPrioritas complaints={priorityComplaints} />
          </div>

          {/* Right Column - Heatmap Masalah (2 cols) */}
          <div className="lg:col-span-2">
            <HeatmapMasalah data={heatmapData} />
          </div>
        </div>

        {/* Bottom Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kategori Chart */}
          <div>
            <KategoriChart data={categoryStats} />
          </div>

          {/* Wilayah Bermasalah */}
          <div>
            <WilayahBermasalah data={areaIssues} />
          </div>
        </div>
      </div>
    </div>
  );
}
