"use client";

import { AlertOctagon, Clock, MapPin } from "lucide-react";
import { ComplaintItem } from "@/lib/analitik-data";

interface RankingPrioritasProps {
  complaints: ComplaintItem[];
}

export default function RankingPrioritas({
  complaints,
}: RankingPrioritasProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Ranking Prioritas Aduan
      </h2>

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className={`border rounded-lg p-4 ${
              complaint.severity === "Kritis"
                ? "border-red-200 bg-red-50"
                : "border-orange-200 bg-orange-50"
            }`}
          >
            {/* Header with Severity Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <AlertOctagon
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    complaint.severity === "Kritis"
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {complaint.title}
                  </h3>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
                  complaint.severity === "Kritis"
                    ? "bg-red-100 text-red-700 animate-pulse"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {complaint.severity}
              </span>
            </div>

            {/* Location & Time */}
            <div className="space-y-2 ml-8">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{complaint.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{complaint.time}</span>
              </div>
              <div className="text-xs font-medium text-gray-700">
                Kategori: {complaint.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
