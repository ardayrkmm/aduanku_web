import React from "react";

type Location = {
  district?: string;
  village?: string;
  rw?: string;
  rt?: string;
};

type ComplaintDetailCardProps = {
  detail: {
    _id: string;
    ticketNumber: string;
    reporterName: string;
    reporterPhone?: string;
    category?: string;
    location?: Location;
    title: string;
    description: string;
    status: string;
    priorityLevel: string;
    createdAt: string;
    resolvedAt?: string;
    responseMinutes?: number;
    statusLogs?: any[];
    attachments?: any[];
  };
};

export default function ComplaintDetailCard({ detail }: ComplaintDetailCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <div className="text-xs text-gray-400">Ticket</div>
          <div className="font-bold text-lg">{detail.ticketNumber}</div>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {detail.status}
          </span>
          <span className="ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            {detail.priorityLevel}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-xs text-gray-400">Reporter</div>
        <div className="font-medium">{detail.reporterName} {detail.reporterPhone && <span className="text-xs text-gray-500">({detail.reporterPhone})</span>}</div>
      </div>
      <div className="mb-2">
        <div className="text-xs text-gray-400">Category</div>
        <div className="font-medium">{detail.category}</div>
      </div>
      <div className="mb-2">
        <div className="text-xs text-gray-400">Location</div>
        <div className="text-sm text-gray-700">
          {detail.location?.district && <span>{detail.location.district}, </span>}
          {detail.location?.village && <span>{detail.location.village}, </span>}
          {detail.location?.rw && <span>RW {detail.location.rw}, </span>}
          {detail.location?.rt && <span>RT {detail.location.rt}</span>}
        </div>
      </div>
      <div className="mb-2">
        <div className="text-xs text-gray-400">Title</div>
        <div className="font-semibold">{detail.title}</div>
      </div>
      <div>
        <div className="text-xs text-gray-400">Description</div>
        <div className="text-gray-800 whitespace-pre-line">{detail.description}</div>
      </div>
    </div>
  );
}
