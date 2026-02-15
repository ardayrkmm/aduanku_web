"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AreaIssue } from "@/lib/analitik-data";

interface WilayahBermasalahProps {
  data: AreaIssue[];
}

export default function WilayahBermasalah({ data }: WilayahBermasalahProps) {
  // Transform data for horizontal bar chart
  const chartData = data.map((item) => ({
    area: item.area,
    totalIssues: item.totalIssues,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Wilayah Paling Bermasalah
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis
            dataKey="area"
            type="category"
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            cursor={{ fill: "#f3f4f6" }}
          />
          <Bar
            dataKey="totalIssues"
            fill="#0A3B7C"
            radius={[0, 8, 8, 0]}
            name="Total Aduan"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
