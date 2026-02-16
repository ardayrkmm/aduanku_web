import React from 'react';

type Status =
    | "DITERIMA"
    | "VERIFIKASI"
    | "DITERUSKAN"
    | "DIPROSES"
    | "SELESAI"
    | "DITOLAK";

interface StatusProgressBarProps {
    currentStatus: Status;
}

const STEPS = ["DITERIMA", "VERIFIKASI", "DITERUSKAN", "DIPROSES", "SELESAI"];

const STATUS_LABELS: Record<string, string> = {
    DITERIMA: "Received",
    VERIFIKASI: "Verified",
    DITERUSKAN: "Forwarded",
    DIPROSES: "Processing",
    SELESAI: "Done",
    DITOLAK: "Rejected"
};

export default function StatusProgressBar({ currentStatus }: StatusProgressBarProps) {
    const isRejected = currentStatus === "DITOLAK";
    const currentIndex = STEPS.indexOf(currentStatus);

    if (isRejected) {
        return (
            <div className="w-full">
                <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-red-700">Complaint Rejected</span>
                    <span className="text-xs text-red-600 font-medium">100%</span>
                </div>
                <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-full rounded-full" />
                </div>
                <p className="mt-2 text-xs text-red-500">
                    The complaint was reviewed and declined. Please check the timeline for details.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full py-4">
            {/* Mobile Vertical Layout */}
            <div className="flex flex-col md:hidden space-y-0">
                {STEPS.map((step, index) => {
                    const isCompleted = currentIndex > index;
                    const isCurrent = currentIndex === index;
                    const isLast = index === STEPS.length - 1;

                    return (
                        <div key={step} className="relative flex gap-4 pb-8 last:pb-0">
                            {/* Vertical Line */}
                            {!isLast && (
                                <div
                                    className={`absolute left-[15px] top-8 bottom-0 w-0.5 -ml-px
                        ${isCompleted ? "bg-green-600" : "bg-gray-200"}
                    `}
                                />
                            )}

                            {/* Indicator */}
                            <div className="relative z-10 flex-shrink-0">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200
                        ${isCompleted
                                            ? "bg-green-600 border-green-600 text-white"
                                            : isCurrent
                                                ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100"
                                                : "bg-gray-300 border-gray-300 text-gray-600"
                                        }
                    `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    )}
                                </div>
                            </div>

                            {/* Label */}
                            <div className="pt-1">
                                <p className={`text-sm font-semibold ${isCurrent ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-500"}`}>
                                    {STATUS_LABELS[step]}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Step {index + 1}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop Horizontal Layout */}
            <div className="hidden md:flex items-center justify-between w-full relative">
                {/* Background connecting line Layer */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                {/* Colored Progress Line Layer */}
                <div
                    className="absolute top-4 left-0 h-0.5 bg-green-600 -z-10 transition-all duration-500 ease-in-out"
                    style={{
                        width: `${(Math.max(0, currentIndex) / (STEPS.length - 1)) * 100}%`
                    }}
                />

                {STEPS.map((step, index) => {
                    const isCompleted = currentIndex > index;
                    const isCurrent = currentIndex === index;

                    return (
                        <div key={step} className="flex flex-col items-center relative group">
                            {/* Dot */}
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 z-10
                        ${isCompleted
                                        ? "bg-green-600 border-green-600 text-white"
                                        : isCurrent
                                            ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100 scale-110"
                                            : "bg-gray-300 border-gray-300 text-gray-600"
                                    }
                    `}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="text-xs font-bold">{index + 1}</span>
                                )}
                            </div>

                            {/* Label */}
                            <div className="absolute top-10 flex flex-col items-center w-32">
                                <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 text-center
                        ${isCurrent ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-400"}
                    `}>
                                    {STATUS_LABELS[step]}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Spacer for bottom labels on desktop */}
            <div className="hidden md:block h-8"></div>
        </div>
    );
}
