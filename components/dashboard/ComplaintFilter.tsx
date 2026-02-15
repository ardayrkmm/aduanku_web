import React from "react";

export interface CategoryOption {
  _id: string;
  name: string;
}

export interface ComplaintFilterProps {
  status?: string;
  category?: string;
  search?: string;
  categories: CategoryOption[];
}

const statusOptions = [
  "DITERIMA",
  "VERIFIKASI",
  "DITERUSKAN",
  "DIPROSES",
  "SELESAI",
  "DITOLAK",
];

export default function ComplaintFilter({ status, category, search, categories }: ComplaintFilterProps) {
  return (
    <form className="flex flex-wrap gap-4 items-end mb-6" method="get">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          defaultValue={status || ""}
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        >
          <option value="">All</option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          name="category"
          defaultValue={category || ""}
          className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Number</label>
        <input
          type="text"
          name="search"
          defaultValue={search || ""}
          placeholder="Search ticket..."
          className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        Filter
      </button>
    </form>
  );
}
