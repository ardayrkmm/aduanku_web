"use client";

import { RecommendationItem } from "@/lib/report-data";
import RecommendationCard from "./RecommendationCard";

interface RecommendationListProps {
  items: RecommendationItem[];
}

export default function RecommendationList({ items }: RecommendationListProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Rekomendasi Kebijakan & Tindak Lanjut
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <RecommendationCard
            key={item.id}
            type={item.type}
            title={item.title}
            description={item.description}
            action={item.action}
          />
        ))}
      </div>
    </section>
  );
}
