'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
}

const COLLAPSED_HEIGHT = 60;          // tinggi navbar saat tertutup
const EXPANDED_HEIGHT_DESKTOP = 220;  // tinggi navbar desktop (fixed & aman)

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor = '#000',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* =========================================================
     HEIGHT CALCULATION
     =========================================================
     👉 INI BAGIAN TERPENTING
     👉 DI SINI KAMU MENGATUR TINGGI NAVBAR SAAT MODE MOBILE
  */
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return EXPANDED_HEIGHT_DESKTOP;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (!contentEl) return EXPANDED_HEIGHT_DESKTOP;

      // simpan style lama
      const prev = {
        visibility: contentEl.style.visibility,
        position: contentEl.style.position,
        height: contentEl.style.height,
      };

      // paksa tampil untuk ukur tinggi ASLI konten
      contentEl.style.visibility = 'visible';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      /* =====================================================
         🔧 ATUR UKURAN NAVBAR MODE MOBILE DI SINI
         -----------------------------------------------------
         - Jika card masih terasa sempit ➜ naikkan angkanya
         - Jika terlalu panjang ➜ kecilkan angkanya
         ===================================================== */
      const MOBILE_EXTRA_SPACE = 60; // ⬅️ UBAH ANGKA INI SESUAI KEBUTUHAN

      const height =
        COLLAPSED_HEIGHT +
        contentEl.scrollHeight +
        MOBILE_EXTRA_SPACE;

      // kembalikan style
      contentEl.style.visibility = prev.visibility;
      contentEl.style.position = prev.position;
      contentEl.style.height = prev.height;

      return height;
    }

    // desktop
    return EXPANDED_HEIGHT_DESKTOP;
  };

  /* ===============================
     GSAP TIMELINE
     =============================== */
  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, {
      height: COLLAPSED_HEIGHT,
      overflow: 'hidden',
    });

    gsap.set(cardsRef.current, {
      y: 32,
      opacity: 0,
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease,
        stagger: 0.06,
      },
      '-=0.15'
    );

    return tl;
  };

  const rebuildTimeline = () => {
  tlRef.current?.kill();
  const newTl = createTimeline();
  tlRef.current = newTl;
};

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  /* ===============================
     TOGGLE MENU
     =============================== */
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
  setIsHamburgerOpen(true);
  setIsExpanded(true);

  // ⬇️ HITUNG ULANG HEIGHT SAAT MENU DIBUKA (MOBILE FIX)
  rebuildTimeline();

  tlRef.current?.play(0);
}
 else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
   <div
  className={`relative left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] ${className}`}
>

      <nav
        ref={navRef}
        className="relative h-[60px] rounded-xl shadow-md overflow-hidden"
        style={{ backgroundColor: baseColor }}
      >
        {/* ================= TOP BAR ================= */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-10">
          {/* HAMBURGER */}
          <div
            className="flex flex-col justify-center gap-[6px] cursor-pointer"
            onClick={toggleMenu}
            style={{ color: menuColor }}
          >
            <span
              className={`block h-[2px] w-[28px] bg-current transition ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-[28px] bg-current transition ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </div>

          {/* LOGO */}
          <img src={logo} alt={logoAlt} className="h-[26px]" />

          {/* CTA DESKTOP */}
          <button
            type="button"
            className="
              hidden md:inline-flex
              items-center justify-center
              h-9 px-3 text-sm
              font-medium rounded-lg
            "
            style={{ backgroundColor: '#023E8A', color: '#fff' }}
          >
            Lapor Sekarang
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className={`
            card-nav-content
            absolute left-0 right-0 top-[60px]
            p-2
            flex flex-col md:flex-row
            gap-2
            ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}
          `}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="flex flex-col rounded-lg p-4 flex-1 min-h-[72px]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="text-lg font-medium mb-2">
                {item.label}
              </div>

              <div className="mt-auto flex flex-col gap-1">
                {item.links.map((lnk) => (
                  <a
  key={lnk.label}
  href={lnk.href}
  aria-label={lnk.ariaLabel}
  className="flex items-center gap-1 text-sm hover:opacity-80"
  onClick={() => {
    setIsHamburgerOpen(false);

    if (tlRef.current) {
      tlRef.current.eventCallback('onReverseComplete', () => {
        setIsExpanded(false);
      });
      tlRef.current.reverse();
    }
  }}
>
                    <GoArrowUpRight className="shrink-0" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
