import React from "react";

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center min-w-[140px]">
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-sm font-medium text-gray-500">{title}</div>
  </div>
);

export default StatCard;
