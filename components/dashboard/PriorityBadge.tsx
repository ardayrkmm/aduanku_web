import React from 'react';

interface PriorityBadgeProps {
    priority: string;
}

const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
        case 'URGENT':
            return 'bg-red-100 text-red-800';
        case 'HIGH':
            return 'bg-orange-100 text-orange-800';
        case 'MEDIUM':
            return 'bg-yellow-100 text-yellow-800';
        case 'LOW':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
                priority
            )}`}
        >
            {priority}
        </span>
    );
}
