import React from "react";
import StatCard from "./StatCard";

interface DashboardStatsGridProps {
  total: number;
  active: number;
  completed: number;
}

const DashboardStatsGrid: React.FC<DashboardStatsGridProps> = ({ total, active, completed }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    <StatCard title="Total Complaints" value={total} />
    <StatCard title="Active Complaints" value={active} />
    <StatCard title="Completed Complaints" value={completed} />
  </div>
);

export default DashboardStatsGrid;
