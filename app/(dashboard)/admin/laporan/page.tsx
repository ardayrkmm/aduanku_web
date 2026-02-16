"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Loader } from "lucide-react";
import ReportHeader from "@/components/laporan/ReportHeader";
import TrendChart from "@/components/laporan/TrendChart";
import RecommendationList from "@/components/laporan/RecommendationList";
import { TrendDataPoint, RecommendationItem } from "@/lib/report-data";

export default function LaporanPage() {
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch trends data
        const trendsResponse = await fetch("/api/reports/trends");
        if (!trendsResponse.ok) throw new Error("Gagal mengambil data tren");
        const trendsResult = await trendsResponse.json();

        // Fetch recommendations data
        const recsResponse = await fetch("/api/reports/recommendations");
        if (!recsResponse.ok) throw new Error("Gagal mengambil rekomendasi");
        const recsResult = await recsResponse.json();

        // Set state
        setTrendData(trendsResult.data || []);
        setRecommendations(recsResult.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat memuat data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Export report as PDF
   * Calls POST /api/reports/export/pdf
   */
  const handleExportPDF = async () => {
    try {
      setExporting(true);

      const response = await fetch("/api/reports/export/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat laporan PDF");
      }

      // Get blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `laporan-aduan-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF export error:", err);
      alert(err instanceof Error ? err.message : "Gagal mengunduh laporan PDF");
    } finally {
      setExporting(false);
    }
  };

  /**
   * Export report as Excel
   * Calls POST /api/reports/export/excel
   */
  const handleExportExcel = async () => {
    try {
      setExporting(true);

      const response = await fetch("/api/reports/export/excel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat laporan Excel");
      }

      // Get blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `laporan-aduan-${new Date().getTime()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Excel export error:", err);
      alert(
        err instanceof Error ? err.message : "Gagal mengunduh laporan Excel",
      );
    } finally {
      setExporting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <ReportHeader
            title="Laporan & Rekomendasi"
            subtitle="Analisis tren laporan dan rekomendasi kebijakan untuk peningkatan layanan publik"
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
            disabled={true}
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-[#0A3B7C] animate-spin mx-auto" />
              <p className="mt-4 text-gray-600">Memuat data laporan...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <ReportHeader
            title="Laporan & Rekomendasi"
            subtitle="Analisis tren laporan dan rekomendasi kebijakan untuk peningkatan layanan publik"
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
            disabled={true}
          />
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Terjadi Kesalahan</p>
              <p className="text-red-700 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Report Header */}
        <ReportHeader
          title="Laporan & Rekomendasi"
          subtitle="Analisis tren laporan dan rekomendasi kebijakan untuk peningkatan layanan publik"
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
          disabled={exporting}
        />

        {/* Trend Chart */}
        {trendData.length > 0 ? (
          <TrendChart data={trendData} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <p className="text-gray-600">
              Tidak ada data tren tersedia untuk periode yang dipilih.
            </p>
          </div>
        )}

        {/* Recommendations List */}
        {recommendations.length > 0 ? (
          <RecommendationList items={recommendations} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-600">
              Sedang menganalisis data untuk menghasilkan rekomendasi...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
