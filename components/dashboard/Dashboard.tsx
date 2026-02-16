"use client";

import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import DealsTable from "./DealsTable";
import { STAT_CARDS } from "@/lib/constants";

export default function Dashboard() {
  return (
    <main className="ml-64 mt-20 min-h-screen bg-gray-50 p-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Beranda</h1>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={card.value}
            percentage={card.percentage}
            trend={card.trend as "up" | "down"}
            timeframe={card.timeframe}
            icon={card.icon}
            bgColor={card.bgColor}
            iconColor={card.iconColor}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <SalesChart />
      </div>

      {/* Table Section */}
      <div>
        <DealsTable />
      </div>
    </main>
  );
}
