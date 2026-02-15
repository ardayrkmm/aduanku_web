import React from "react";

interface ResponseSummaryProps {
  createdAt: string;
  resolvedAt?: string;
  responseMinutes?: number;
  status: string;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString();
}

export default function ResponseSummary({ createdAt, resolvedAt, responseMinutes, status }: ResponseSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="text-xs text-gray-400">Created At</div>
        <div className="font-medium">{formatDate(createdAt)}</div>
      </div>
      <div>
        <div className="text-xs text-gray-400">Resolved At</div>
        <div className="font-medium">{formatDate(resolvedAt)}</div>
      </div>
      <div>
        <div className="text-xs text-gray-400">Response Minutes</div>
        <div className="font-medium">{responseMinutes ?? "-"}</div>
      </div>
      <div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          {status}
        </span>
      </div>
    </div>
  );
}
