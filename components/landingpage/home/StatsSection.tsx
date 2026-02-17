'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useInView } from 'framer-motion';

type StatItemProps = {
  value: number;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const count = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.floor(latest).toString();
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, count]);

  return (
    <div className="text-center sm:text-left">
      <div
        ref={ref}
        className="text-[32px] md:text-[44px] font-semibold text-slate-900 mb-1"
      >
        0
      </div>
      <p className="text-slate-500 text-[14px] md:text-[15px]">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: 20, label: 'Aduan Masuk' },
    { value: 20, label: 'Aduan Diproses' },
    { value: 20, label: 'Aduan Terselesaikan' },
  ];

  return (
    <section
      id="StatsSection"
      className="bg-white py-10 md:py-16 px-4 scroll-mt-40"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* RIGHT CONTENT */}
          <div className="order-1 md:order-2">
            <h2
              className="
                text-slate-900
                font-medium
                text-[26px]
                md:text-[38px]
                lg:text-[42px]
                leading-[1.25]
                mb-6
              "
            >
              Transparansi Data Laporan dan Kinerja
              <br />
              Penanganan Aduan Masyarakat
            </h2>

            <p
              className="
                text-slate-600
                text-[16px]
                md:text-[18px]
                leading-relaxed
                max-w-xl
                mb-1 md:mb-10
              "
            >
              Data berikut memberikan gambaran nyata mengenai laporan masyarakat
              Kota Tegal, mulai dari jumlah aduan yang masuk, kategori
              permasalahan terbanyak, hingga tingkat penyelesaian oleh instansi
              terkait.
            </p>
          </div>

          {/* LEFT CONTENT */}
          <div className="order-2 md:order-1">

            {/* STATS */}
            <div className="flex justify-between sm:justify-start sm:space-x-16 mb-10">
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 bg-[#023E8A] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              Lapor Sekarang!
              <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>

          </div>
        </div>
      </div>
    </section>
  );
}
