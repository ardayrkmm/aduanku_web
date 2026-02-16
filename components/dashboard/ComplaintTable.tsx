import React from "react";

export interface ComplaintTableRow {
  _id: string;
  ticketNumber: string;
  reporterName?: string;
  category: string;
  status: string;
  priorityLevel?: string;
  createdAt: string;
}

interface ComplaintTableProps {
  data: ComplaintTableRow[];
}

export default function ComplaintTable({ data }: ComplaintTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                No complaints found.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-blue-700">{row.ticketNumber}</td>
                <td className="px-4 py-2">{row.reporterName || "-"}</td>
                <td className="px-4 py-2">{row.category || "-"}</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2">{row.priorityLevel || "-"}</td>
                <td className="px-4 py-2 whitespace-nowrap">{new Date(row.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <a
                    href={`/dashboard/aduan/${row._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
