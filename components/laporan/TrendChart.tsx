"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendDataPoint } from "@/lib/report-data";

interface TrendChartProps {
  data: TrendDataPoint[];
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Tren Laporan Tahunan
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            cursor={{ stroke: "#0A3B7C", strokeWidth: 2 }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
          <Line
            type="monotone"
            dataKey="infrastruktur"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ fill: "#4f46e5", r: 4 }}
            activeDot={{ r: 6 }}
            name="Infrastruktur"
          />
          <Line
            type="monotone"
            dataKey="pelayanan_publik"
            stroke="#0A3B7C"
            strokeWidth={2}
            dot={{ fill: "#0A3B7C", r: 4 }}
            activeDot={{ r: 6 }}
            name="Pelayanan Publik"
          />
          <Line
            type="monotone"
            dataKey="kebersihan"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
            name="Kebersihan"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
