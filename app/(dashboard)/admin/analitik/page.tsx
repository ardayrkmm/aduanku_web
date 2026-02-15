"use client";

import {
  PRIORITY_COMPLAINTS,
  CATEGORY_DATA,
  AREA_ISSUES,
  HEATMAP_GRID,
} from "@/lib/analitik-data";
import RankingPrioritas from "@/components/analitik/RankingPrioritas";
import HeatmapMasalah from "@/components/analitik/HeatmapMasalah";
import KategoriChart from "@/components/analitik/KategoriChart";
import WilayahBermasalah from "@/components/analitik/WilayahBermasalah";

export default function AnalitikPage() {
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
            <RankingPrioritas complaints={PRIORITY_COMPLAINTS} />
          </div>

          {/* Right Column - Heatmap Masalah (2 cols) */}
          <div className="lg:col-span-2">
            <HeatmapMasalah data={HEATMAP_GRID} />
          </div>
        </div>

        {/* Bottom Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kategori Chart */}
          <div>
            <KategoriChart data={CATEGORY_DATA} />
          </div>

          {/* Wilayah Bermasalah */}
          <div>
            <WilayahBermasalah data={AREA_ISSUES} />
          </div>
        </div>
      </div>
    </div>
  );
}
