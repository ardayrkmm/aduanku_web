import React from "react";

interface StatusLog {
  status: string;
  changedAt: string;
  note?: string;
}

interface StatusTimelineProps {
  statusLogs?: StatusLog[];
  currentStatus: string;
}

export default function StatusTimeline({ statusLogs = [], currentStatus }: StatusTimelineProps) {
  const sortedLogs = [...statusLogs].sort((a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime());
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-semibold mb-4">Status Timeline</div>
      <ol className="relative border-l border-gray-200">
        {sortedLogs.map((log, idx) => (
          <li key={idx} className="mb-8 ml-4">
            <div className={`absolute w-3 h-3 rounded-full -left-1.5 border ${log.status === currentStatus ? "bg-blue-600 border-blue-600" : "bg-gray-300 border-gray-300"}`}></div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className={`font-semibold ${log.status === currentStatus ? "text-blue-700" : "text-gray-700"}`}>{log.status}</span>
              <span className="text-xs text-gray-400">{new Date(log.changedAt).toLocaleString()}</span>
            </div>
            {log.note && <div className="text-xs text-gray-500 mt-1">{log.note}</div>}
          </li>
        ))}
      </ol>
    </div>
  );
}
