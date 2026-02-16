"use client";

import { FileText, Download, Loader } from "lucide-react";

interface ReportHeaderProps {
  title: string;
  subtitle: string;
  onExportPDF: () => void;
  onExportExcel: () => void;
  disabled?: boolean;
}

export default function ReportHeader({
  title,
  subtitle,
  onExportPDF,
  onExportExcel,
  disabled = false,
}: ReportHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      {/* Left Side - Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 text-base">{subtitle}</p>
      </div>

      {/* Right Side - Export Buttons */}
      <div className="flex items-center gap-4">
        {/* Export PDF Button */}
        <button
          onClick={onExportPDF}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg transition-colors font-medium ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-50 cursor-pointer"
          }`}
        >
          {disabled ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <FileText size={18} />
          )}
          <span>{disabled ? "Mengekspor..." : "Export PDF"}</span>
        </button>

        {/* Export Excel Button */}
        <button
          onClick={onExportExcel}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium transition-colors ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600 cursor-pointer"
          }`}
        >
          {disabled ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          <span>{disabled ? "Mengekspor..." : "Export Excel"}</span>
        </button>
      </div>
    </div>
  );
}
