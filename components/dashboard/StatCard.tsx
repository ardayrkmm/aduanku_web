"use client";

import * as Icons from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  trend: "up" | "down";
  timeframe: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  percentage,
  trend,
  timeframe,
  icon,
  bgColor,
  iconColor,
}: StatCardProps) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Users: <Icons.Users size={24} />,
      Package: <Icons.Package size={24} />,
      TrendingUp: <Icons.TrendingUp size={24} />,
      Clock: <Icons.Clock size={24} />,
    };
    return icons[iconName];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`${bgColor} ${iconColor} p-3 rounded-lg`}>
          {getIcon(icon)}
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-900 mb-4">{value}</p>

      {/* Trend & Timeframe */}
      <div className="flex items-center gap-2">
        <div
          className={`font-semibold text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? "+" : "-"}
          {percentage}
        </div>
        <div className="flex items-center gap-1">
          {trend === "up" ? (
            <TrendingUp size={16} className="text-green-600" />
          ) : (
            <TrendingDown size={16} className="text-red-600" />
          )}
          <span className="text-sm text-gray-500">{timeframe}</span>
        </div>
      </div>
    </div>
  );
}
