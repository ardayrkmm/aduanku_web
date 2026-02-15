
import ComplaintFilter from "@/components/dashboard/ComplaintFilter";
import ComplaintTable from "@/components/dashboard/ComplaintTable";
import Pagination from "@/components/dashboard/Pagination";
import { CategoryOption } from "@/components/dashboard/ComplaintFilter";
import { ComplaintTableRow } from "@/components/dashboard/ComplaintTable";
import React from "react";

const DUMMY_COMPLAINTS = [
  {
    _id: "1",
    ticketNumber: "ADU-2025-001",
    reporterName: "Hafidz",
    category: "Infrastructure",
    status: "DITERIMA",
    priorityLevel: "HIGH",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    ticketNumber: "ADU-2025-002",
    reporterName: "Budi",
    category: "Sanitation",
    status: "DIPROSES",
    priorityLevel: "MEDIUM",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    ticketNumber: "ADU-2025-003",
    reporterName: "Siti",
    category: "Road Damage",
    status: "SELESAI",
    priorityLevel: "LOW",
    createdAt: new Date().toISOString(),
  },
];

const DUMMY_CATEGORIES = [
  { _id: "1", name: "Infrastructure" },
  { _id: "2", name: "Sanitation" },
  { _id: "3", name: "Road Damage" },
];

export default async function ComplaintManagementPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    status?: string;
    category?: string;
    search?: string;
  };
}) {
  const page = Math.max(Number(searchParams?.page) || 1, 1);
  const limit = Math.max(Number(searchParams?.limit) || 10, 1);
  const status = searchParams?.status || "";
  const category = searchParams?.category || "";
  const search = searchParams?.search || "";

  let filteredData = DUMMY_COMPLAINTS;
  if (status) {
    filteredData = filteredData.filter((item) => item.status === status);
  }
  if (category) {
    filteredData = filteredData.filter((item) => item.category === category);
  }
  if (search) {
    filteredData = filteredData.filter((item) =>
      item.ticketNumber.toLowerCase().includes(search.toLowerCase())
    );
  }

  const total = filteredData.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  const urlSearchParams = new URLSearchParams();
  if (status) urlSearchParams.set("status", status);
  if (category) urlSearchParams.set("category", category);
  if (search) urlSearchParams.set("search", search);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-2">Complaint Management</h1>
      <ComplaintFilter
        status={status}
        category={category}
        search={search}
        categories={DUMMY_CATEGORIES as CategoryOption[]}
      />
      <ComplaintTable data={paginatedData as ComplaintTableRow[]} />
      <Pagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        searchParams={urlSearchParams}
      />
    </div>
  );
}
