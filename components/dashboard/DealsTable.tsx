"use client";

import { ChevronDown } from "lucide-react";
import { TABLE_DATA } from "@/lib/constants";

interface TableData {
  id: number;
  productName: string;
  productInitials: string;
  productBgColor: string;
  location: string;
  dateTime: string;
  piece: number;
  amount: string;
  status: "Delivered" | "Pending" | "Processing" | "Cancelled";
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function DealsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Deals Details</h2>
        <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <span className="text-sm font-medium">October</span>
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date - Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Piece
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {TABLE_DATA.map((row: TableData) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${row.productBgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-xs font-bold">
                        {row.productInitials}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {row.productName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {row.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {row.dateTime}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {row.piece}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {row.amount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-medium text-xs ${getStatusStyles(
                      row.status,
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
