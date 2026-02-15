"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export interface MonthlyTrendPoint {
  month: string;
  count: number;
}

interface ComplaintTrendChartProps {
  data: MonthlyTrendPoint[];
}

const ComplaintTrendChart: React.FC<ComplaintTrendChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-400 bg-white rounded-xl shadow-sm">
        No trend data available.
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Complaint Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplaintTrendChart;
