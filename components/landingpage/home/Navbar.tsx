'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const MENUS = [
  { label: 'Beranda', href: '/' },
  { label: 'Laporan', href: '/laporan' },
  { label: 'Cek Status', href: '/#'},
  { label: 'Panduan', href: '/#'},
];

export default function Navbar() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  /* ===============================
     HIDE / SHOW ON SCROLL
     =============================== */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
        setMenuOpen(false);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ===============================
     SECTION COLOR DETECTION
     =============================== */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-navbar]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const value = (entry.target as HTMLElement).dataset.navbar as 'light' | 'dark';
            setTheme(value);
          }
        });
      },
      {
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        backdrop-blur-md transition-all duration-300
        ${hidden ? '-translate-y-full' : 'translate-y-0'}
      `}
      style={{
        backgroundColor: isLight
          ? 'rgba(0,0,0,0.35)'
          : 'rgba(255,255,255,0.75)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded flex items-center justify-center ${
                isLight ? 'bg-white/90' : 'bg-[#023E8A]'
              }`}
            >
              <span
                className={`font-semibold text-sm ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                A
              </span>
            </div>
            <span
              className={`font-semibold text-lg ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              Aduanku
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-10">
            {MENUS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    font-medium transition flex items-center gap-2
                    ${
                      isLight
                        ? 'text-white/80 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }
                  `}
                >
                  {item.label}
                  {active && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLight ? 'bg-white' : 'bg-[#023E8A]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            <div className="space-y-1.5">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`block h-0.5 w-6 ${
                    isLight ? 'bg-white' : 'bg-slate-900'
                  }`}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          backgroundColor: isLight
            ? 'rgba(0,0,0,0.45)'
            : 'rgba(255,255,255,0.95)',
        }}
      >
        <div className="px-6 py-6 space-y-4">
          {MENUS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block font-medium ${
                isLight
                  ? 'text-white/90 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
