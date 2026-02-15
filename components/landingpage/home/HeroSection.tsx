'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center text-center px-6 overflow-hidden bg-gradient-to-b from-[#0B1120] via-[#0F1E3A] to-[#0B1120] pt-20 md:pt-24">

      
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 opacity-20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-800 opacity-20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Satu Aduanmu
          <br />
          Merubah Sudut Kota
        </h1>

        {/* Subheading */}
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10">
          Sampaikan aspirasi, keluhan, dan laporan Anda secara cepat, transparan, dan
          terintegrasi langsung dengan pemerintah Kota Tegal.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <button className="flex items-center gap-3 bg-white text-slate-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
            Lapor Sekarang!
            <span className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Phone Section */}
      <div className="mt-10 w-100 aspect-square relative">
        <Image
          src="/svg/phone.svg"
          alt="Phone Preview"
          fill
          className="object-cover"
        />

        {/* Slice Square Effect (Bottom White Shape) */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-white rounded-t-[120px]"></div>
      </div>
    </section>
  );
}
