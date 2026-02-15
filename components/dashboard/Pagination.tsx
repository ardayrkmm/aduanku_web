import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  searchParams: URLSearchParams;
}

export default function Pagination({ page, totalPages, limit, searchParams }: PaginationProps) {
  const getPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", limit.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <a
        href={getPageUrl(page - 1)}
        className={`px-4 py-2 rounded bg-gray-100 text-gray-700 font-medium text-sm ${page <= 1 ? "opacity-50 pointer-events-none" : "hover:bg-gray-200"}`}
        aria-disabled={page <= 1}
      >
        Previous
      </a>
      <span className="text-gray-600 text-sm">
        Page {page} of {totalPages}
      </span>
      <a
        href={getPageUrl(page + 1)}
        className={`px-4 py-2 rounded bg-gray-100 text-gray-700 font-medium text-sm ${page >= totalPages ? "opacity-50 pointer-events-none" : "hover:bg-gray-200"}`}
        aria-disabled={page >= totalPages}
      >
        Next
      </a>
    </div>
  );
}
