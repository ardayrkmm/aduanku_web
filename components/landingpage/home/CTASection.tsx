"use client";

export default function CTASection() {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-8">
      <div
        className="
            relative
            my-16
            rounded-[2rem]
            overflow-hidden
            max-w-8xl
            mx-auto
          "
      >
        {/* BACKGROUND SVG */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/svg/cta.svg')" }}
        />

        {/* Overlay (optional) */}
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 py-16 md:py-24">
          <div className="px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* LEFT SIDE */}
              <div>
                <h2
                  className="
      text-white
    font-medium
    text-[32px]
    md:text-[40px]
    lg:text-[48px]
    leading-[1.2]
    mb-4
"
                >
                  Pantau Status
                  <br />
                  Laporan Pengaduanmu
                </h2>

                <p
                  className="
  text-white/90
    font-normal
    text-[16px]
    md:text-[18px]
    lg:text-[20px]
    leading-relaxed
    max-w-2xl
    mb-8

"
                >
                  Kami memastikan setiap laporan warga tidak diabaikan. Cek
                  status laporan Anda dan ikuti setiap tahap prosesnya secara
                  transparan.
                </p>

                <button
                  className="
    flex items-center gap-3
    bg-white text-slate-900
    font-semibold
    px-6 py-3
    rounded-full
    shadow-lg
    hover:scale-105
    transition-all
    duration-300
  "
                >
                  <span>Cek Sekarang</span>

                  <span className="w-8 h-8 flex items-center justify-center bg-[#023E8A] rounded-full">
                    <svg
                      className="w-4 h-4 text-white"
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

              {/* RIGHT SIDE */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white/50">
                    <p>Status Tracking Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
