import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

interface Location {
  district?: string;
  village?: string;
  rw?: number;
  rt?: number;
}

interface ComplaintDetailCardProps {
  detail: {
    ticketNumber: string;
    reporterName?: string;
    reporterPhone?: string;
    category?: string;
    title?: string;
    description?: string;
    location?: Location;
    address?: string;
    latitude?: number;
    longitude?: number;
    priorityLevel?: string;
    status: string;
  };
}

export default function ComplaintDetailCard({ detail }: ComplaintDetailCardProps) {
  const renderLocation = () => {
    const rtRwParts = [];
    if (detail.location?.rt) rtRwParts.push(`RT ${detail.location.rt}`);
    if (detail.location?.rw) rtRwParts.push(`RW ${detail.location.rw}`);
    const line1 = rtRwParts.join(' / ');

    const villageDistrictParts = [];
    if (detail.location?.village) villageDistrictParts.push(detail.location.village);
    if (detail.location?.district) villageDistrictParts.push(detail.location.district);
    const line2 = villageDistrictParts.join(' - ');

    return (
      <div className="space-y-1">
        {line1 && <div className="font-medium text-gray-900">{line1}</div>}
        {line2 && <div className="text-gray-600">{line2}</div>}
        {detail.address && (
          <div className="text-sm text-gray-500 pt-1">{detail.address}</div>
        )}
        {(detail.latitude || detail.longitude) && (
          <div className="text-xs text-gray-400 font-mono mt-1">
            {detail.latitude}, {detail.longitude}
          </div>
        )}
        {!line1 && !line2 && !detail.address && (
          <div className="text-gray-400 italic">Location data not available</div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 md:p-8 space-y-8 divide-y divide-gray-100">

        {/* Header: Ticket & Status */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Ticket Number
            </div>
            <div className="text-3xl font-bold text-gray-900 tracking-tight">
              {detail.ticketNumber}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={detail.status} />
            {detail.priorityLevel && (
              <PriorityBadge priority={detail.priorityLevel} />
            )}
          </div>
        </div>

        {/* Title, Category & Description */}
        <div className="pt-8">
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Issue Details
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {detail.title || 'Untitled Complaint'}
            </h2>
            <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              {detail.category || 'Uncategorized'}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100/50">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Description
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {detail.description || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Info Grid: Reporter & Location */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reporter Column */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Reporter Information
            </div>
            <div className="bg-white">
              <div className="font-medium text-gray-900 text-lg">
                {detail.reporterName || 'Anonymous'}
              </div>
              {detail.reporterPhone ? (
                <div className="text-gray-500 font-mono text-sm mt-1">
                  {detail.reporterPhone}
                </div>
              ) : (
                <div className="text-gray-400 text-sm mt-1 italic">
                  No contact info
                </div>
              )}
            </div>
          </div>

          {/* Location Column */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Location Details
            </div>
            {renderLocation()}
          </div>
        </div>
      </div>
    </div>
  );
}
