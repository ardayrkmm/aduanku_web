"use client";

import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

interface RecommendationCardProps {
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  action: string;
}

const getTypeStyles = (type: string) => {
  switch (type) {
    case "warning":
      return {
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        iconBgColor: "bg-orange-100",
        iconColor: "text-orange-600",
        actionBgColor: "bg-orange-100",
        icon: AlertTriangle,
      };
    case "success":
      return {
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        iconBgColor: "bg-green-100",
        iconColor: "text-green-600",
        actionBgColor: "bg-green-100",
        icon: CheckCircle,
      };
    case "info":
      return {
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconBgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        actionBgColor: "bg-blue-100",
        icon: Lightbulb,
      };
    default:
      return {
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        iconBgColor: "bg-gray-100",
        iconColor: "text-gray-600",
        actionBgColor: "bg-gray-100",
        icon: Lightbulb,
      };
  }
};

export default function RecommendationCard({
  type,
  title,
  description,
  action,
}: RecommendationCardProps) {
  const styles = getTypeStyles(type);
  const IconComponent = styles.icon;

  return (
    <div
      className={`${styles.bgColor} border ${styles.borderColor} rounded-xl p-6 flex flex-col gap-4`}
    >
      {/* Header with Icon & Title */}
      <div className="flex items-start gap-4">
        <div className={`${styles.iconBgColor} rounded-lg p-3 flex-shrink-0`}>
          <IconComponent className={`${styles.iconColor} w-6 h-6`} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

      {/* Action Box */}
      <div
        className={`${styles.actionBgColor} rounded-lg p-4 border-l-4 ${
          type === "warning"
            ? "border-l-orange-600"
            : type === "success"
              ? "border-l-green-600"
              : "border-l-blue-600"
        }`}
      >
        <p className="text-sm font-semibold text-gray-900">{action}</p>
      </div>
    </div>
  );
}
