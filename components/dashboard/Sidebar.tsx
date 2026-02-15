"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU } from "@/lib/constants";
import * as Icons from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const getIcon = (iconName: string) => {
    // Using dynamic icon mapping from lucide-react
    const icons: Record<string, React.ReactNode> = {
      Home: <Icons.Home size={20} />,
      ShoppingBag: <Icons.ShoppingBag size={20} />,
      Heart: <Icons.Heart size={20} />,
      Mail: <Icons.Mail size={20} />,
      ListOrdered: <Icons.ListOrdered size={20} />,
      Package: <Icons.Package size={20} />,
      TrendingUp: <Icons.TrendingUp size={20} />,
      BarChart3: <Icons.BarChart3 size={20} />,
      Calendar: <Icons.Calendar size={20} />,
      CheckSquare: <Icons.CheckSquare size={20} />,
      FileText: <Icons.FileText size={20} />,
      Grid: <Icons.Grid size={20} />,
      Users: <Icons.Users size={20} />,
      Settings: <Icons.Settings size={20} />,
      LogOut: <Icons.LogOut size={20} />,
    };
    return icons[iconName];
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto py-6 px-4">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-blue-600">Aduanku</h1>
      </div>

      {/* Menu Sections */}
      {SIDEBAR_MENU.map((section) => (
        <div key={section.section} className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            {section.section}
          </h3>
          <nav className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
