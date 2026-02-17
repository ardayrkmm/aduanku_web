'use client';

import { useEffect, useRef, useState } from 'react';
import CardNav from './CardNav';


const logo = '/svg/logodark.svg';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [hideOffset, setHideOffset] = useState(0);

  /* ===============================
     HITUNG TINGGI NAVBAR ASLI
     =============================== */
  useEffect(() => {
    if (!navbarRef.current) return;

    const updateHeight = () => {
      const rect = navbarRef.current!.getBoundingClientRect();
      setHideOffset(rect.height + 24); // 24px buffer aman
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  /* ===============================
     HIDE / SHOW ON SCROLL
     =============================== */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);   // scroll ke bawah → hide
      } else {
        setHidden(false);  // scroll ke atas → show
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    {
      label: 'Home',
      bgColor: '#0B1120',
      textColor: '#ffffff',
      links: [
        { label: 'Tentang Kami', href: '/#FeaturesSection', ariaLabel: 'Tentang Kami' },
        { label: 'Statistik', href: '/#StatsSection', ariaLabel: 'Statistik' },
        { label: 'Lainnya', href: '/#GuideSection', ariaLabel: 'Lainnya' },
      ],
    },
    {
      label: 'Pengaduan',
      bgColor: '#0B1120',
      textColor: '#ffffff',
      links: [
        { label: 'Laporan', href: '/laporan', ariaLabel: 'Form Laporan Pengaduan' },
        { label: 'Cek Status', href: '/cekstatus', ariaLabel: 'Cek Status' },
      ],
    },
    {
      label: 'Lainnya',
      bgColor: '#0B1120',
      textColor: '#ffffff',
      links: [
        { label: 'Panduan', href: '/panduan', ariaLabel: 'Panduan Penggunaan' },
        { label: 'Kontak Kami', href: '/kontak', ariaLabel: 'Kontak Kami' },
      ],
    },
  ];

  return (
    <div
      ref={navbarRef}
      className="fixed top-[1.5rem] left-0 w-full z-50 transition-transform duration-300 ease-in-out"
      style={{
        transform: hidden
          ? `translateY(-${hideOffset}px)`
          : 'translateY(0)',
      }}
    >
      <CardNav
        logo={logo}
        logoAlt="Aduanku Logo"
        items={items}
        baseColor="#ffffff"
        menuColor="#000000"
        ease="power3.out"
      />
    </div>
  );
}
