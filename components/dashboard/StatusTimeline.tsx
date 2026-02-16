import React from 'react';
import StatusBadge from './StatusBadge';

interface StatusLog {
  status: string;
  changedAt: Date;
}

interface StatusTimelineProps {
  statusLogs: StatusLog[];
  currentStatus: string;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function StatusTimeline({ statusLogs, currentStatus }: StatusTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Timeline</h3>
      
      {statusLogs.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-4">No status changes recorded</div>
      ) : (
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {statusLogs.map((log, index) => {
              const isLast = index === statusLogs.length - 1;
              const isCurrent = log.status === currentStatus;
              
              return (
                <li key={index} className="relative pb-8">
                  {/* Vertical connector line */}
                  {!isLast && (
                    <span
                      className="absolute top-4 left-2 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  
                  <div className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div
                      className={`
                        relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full
                        ${isCurrent ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-gray-200'}
                      `}
                    />
                    
                    {/* Content */}
                    <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={log.status} />
                        {isCurrent && (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 tabular-nums">
                        {formatDate(log.changedAt)}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
