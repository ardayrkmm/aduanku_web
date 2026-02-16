'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar hilang saat scroll down, muncul saat scroll up
      if (currentScrollY > lastScrollY) {
        // Scroll down - navbar hilang
        setIsVisible(false);
      } else {
        // Scroll up - navbar muncul
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#0B1120] via-[#0B1120] to-transparent transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center h-20">
          
          {/* Logo - kiri */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">A</span>
            </div>
            <span className="text-white font-bold text-lg">Aduanku.</span>
          </div>

          {/* Menu - tengah */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-10">
            <Link href="#" className="text-gray-300 hover:text-white transition">
              Beranda
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">
              Laporan
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">
              Cek Status
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">
              Panduan
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
