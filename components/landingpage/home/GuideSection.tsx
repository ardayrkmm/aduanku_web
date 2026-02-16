'use client';

import NextImage from 'next/image';

export default function GuideSection() {
  return (
    <section className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* IMAGE (MOBILE ATAS, DESKTOP KANAN) */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end mb-4 md:mb-0">
            <div className="relative w-full max-w-xl md:translate-x-4 rounded-[2rem] overflow-hidden shadow-xl">
              <NextImage
                src="/svg/guide.svg"
                alt="Panduan Pelaporan"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="order-2 md:order-1">
            <h2
              className="
                text-slate-900
                font-medium
                text-[28px]
                md:text-[40px]
                lg:text-[42px]
                leading-[1.25]
                mb-6
              "
            >
              Langkah Mudah Melaporkan
              <br />
              Aduan Anda
            </h2>

            <p
              className="
                text-slate-600
                text-[16px]
                md:text-[18px]
                leading-relaxed
                max-w-xl
                mb-10
              "
            >
              Ikuti panduan berikut untuk melaporkan permasalahan di Kota Tegal
              secara mudah, cepat, dan terintegrasi dengan sistem layanan publik.
            </p>

            {/* CTA BUTTON */}
            <button className="flex items-center gap-3 bg-[#023E8A] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300">
              Cek Sekarang!
              <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
