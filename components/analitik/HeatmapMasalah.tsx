"use client";

import { useState } from "react";
import { HeatmapCell } from "@/lib/analitik-data";

interface HeatmapMasalahProps {
  data: HeatmapCell[];
}

export default function HeatmapMasalah({ data }: HeatmapMasalahProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

  const getIntensityColor = (intensity: number) => {
    if (intensity < 20) return "bg-red-500/10";
    if (intensity < 40) return "bg-red-500/25";
    if (intensity < 60) return "bg-red-500/50";
    if (intensity < 80) return "bg-red-500/75";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Heatmap Kepadatan Masalah
      </h2>

      <div className="relative">
        {/* Heatmap Grid */}
        <div className="grid grid-cols-10 gap-1 mb-6">
          {data.map((cell) => (
            <div
              key={`${cell.x}-${cell.y}`}
              className={`aspect-square rounded-lg cursor-pointer transition-all ${getIntensityColor(
                cell.intensity,
              )} hover:ring-2 hover:ring-blue-500`}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
              title={`Intensitas: ${cell.intensity}%`}
            />
          ))}
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <div className="fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-xs pointer-events-none z-50">
            <p>
              Zona ({hoveredCell.x}, {hoveredCell.y})
            </p>
            <p>Intensitas: {hoveredCell.intensity}%</p>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <span className="text-xs font-medium text-gray-600">
            Tingkat Kepadatan
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/10 rounded-lg" />
              <span className="text-xs text-gray-600">Rendah</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/50 rounded-lg" />
              <span className="text-xs text-gray-600">Sedang</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-lg" />
              <span className="text-xs text-gray-600">Tinggi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
