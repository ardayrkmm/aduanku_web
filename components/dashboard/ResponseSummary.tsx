import React from 'react';
import StatusBadge from './StatusBadge';

interface ResponseSummaryProps {
  createdAt: Date;
  resolvedAt?: Date | null;
  responseMinutes?: number | null;
  status: string;
}

function formatDate(date?: Date | null): string {
  if (!date) return '-';
  return new Date(date).toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatResponseTime(minutes?: number | null): string {
  if (!minutes && minutes !== 0) return '-';
  
  if (minutes < 60) {
    return `${minutes} menit`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} jam`;
  }
  
  return `${hours} jam ${remainingMinutes} menit`;
}

export default function ResponseSummary({ createdAt, resolvedAt, responseMinutes, status }: ResponseSummaryProps) {
  const isResolved = status === 'SELESAI';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Created At</div>
          <div className="font-medium text-gray-900">{formatDate(createdAt)}</div>
        </div>
        
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Resolved At</div>
          <div className="font-medium text-gray-900">
            {resolvedAt ? formatDate(resolvedAt) : '-'}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Response Time</div>
          <div className={`font-medium ${isResolved ? 'text-green-600' : 'text-gray-900'}`}>
            {formatResponseTime(responseMinutes)}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Status</div>
          <StatusBadge status={status} />
        </div>
      </div>
      
      {isResolved && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">Complaint Resolved</span>
          </div>
        </div>
      )}
    </div>
  );
}
