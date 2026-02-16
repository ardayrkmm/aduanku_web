import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'DITERIMA':
      return 'bg-gray-100 text-gray-800';
    case 'VERIFIKASI':
      return 'bg-blue-100 text-blue-800';
    case 'DITERUSKAN':
      return 'bg-purple-100 text-purple-800';
    case 'DIPROSES':
      return 'bg-orange-100 text-orange-800';
    case 'SELESAI':
      return 'bg-green-100 text-green-800';
    case 'DITOLAK':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}