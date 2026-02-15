"use client";

import { Menu, Search, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-40">
      {/* Left Side - Hamburger & Search */}
      <div className="flex items-center gap-6 flex-1">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={24} className="text-gray-700" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Right Side - User Profile */}
      <div className="flex items-center gap-4 ml-8">
        <div className="flex items-center gap-3 px-4 py-2">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">MR</span>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-900">Moni Roy</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>

          {/* Chevron Down */}
          <ChevronDown size={18} className="text-gray-400 ml-2" />
        </div>
      </div>
    </header>
  );
}
