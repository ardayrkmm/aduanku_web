import React from 'react';

interface MiniMapPreviewProps {
    latitude?: number;
    longitude?: number;
}

export default function MiniMapPreview({ latitude, longitude }: MiniMapPreviewProps) {
    if (!latitude || !longitude) {
        return null;
    }

    // Calculate bounding box with a small offset for zoom level
    const offset = 0.002;
    const bbox = [
        longitude - offset, // min lon
        latitude - offset,  // min lat
        longitude + offset, // max lon
        latitude + offset   // max lat
    ].join(',');

    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;

    return (
        <div className="w-full h-[250px] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={embedUrl}
                title="Location Map"
                className="block"
                loading="lazy"
            ></iframe>
            <div className="bg-gray-50 px-3 py-1.5 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span className="font-mono">
                    {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </span>
                <a
                    href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                    View Larger Map
                </a>
            </div>
        </div>
    );
}
