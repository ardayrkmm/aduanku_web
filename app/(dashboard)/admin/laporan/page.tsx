"use client";

import { TREND_DATA, RECOMMENDATIONS_DATA } from "@/lib/report-data";
import ReportHeader from "@/components/laporan/ReportHeader";
import TrendChart from "@/components/laporan/TrendChart";
import RecommendationList from "@/components/laporan/RecommendationList";

export default function LaporanPage() {
  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // TODO: Implement PDF export functionality
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // TODO: Implement Excel export functionality
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Report Header */}
        <ReportHeader
          title="Laporan & Rekomendasi"
          subtitle="Analisis tren laporan dan rekomendasi kebijakan untuk peningkatan layanan publik"
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
        />

        {/* Trend Chart */}
        <TrendChart data={TREND_DATA} />

        {/* Recommendations List */}
        <RecommendationList items={RECOMMENDATIONS_DATA} />
      </div>
    </div>
  );
}
