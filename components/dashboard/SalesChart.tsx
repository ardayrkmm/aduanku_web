"use client";

import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_DATA } from "@/lib/constants";

const CustomTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
        {payload[0].value}%
      </div>
    );
  }

  return null;
};

export default function SalesChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Sales Details</h2>
        <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <span className="text-sm font-medium">October</span>
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={CHART_DATA}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4361ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4361ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#999"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#999" }}
            />
            <YAxis
              stroke="#999"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#999" }}
              label={{
                value: "20% - 100%",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4361ee"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{ fill: "#4361ee", r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
