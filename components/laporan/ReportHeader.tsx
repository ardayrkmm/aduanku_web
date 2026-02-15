"use client";

import { FileText, Download } from "lucide-react";

interface ReportHeaderProps {
  title: string;
  subtitle: string;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

export default function ReportHeader({
  title,
  subtitle,
  onExportPDF,
  onExportExcel,
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
          className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          <FileText size={18} />
          <span>Export PDF</span>
        </button>

        {/* Export Excel Button */}
        <button
          onClick={onExportExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          <Download size={18} />
          <span>Export Excel</span>
        </button>
      </div>
    </div>
  );
}
