'use client';

export default function CTASection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-slate-800 py-16 md:py-24 px-4 rounded-3xl my-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pantau Status Laporan Pengaduanmu
            </h2>
            <p className="text-blue-100 text-base leading-relaxed mb-8">
              Kami memberikan setiap warga hak untuk mengetahui update status laporan Anda dan ikuti setiap tahap prosesnya secara transparan.
            </p>

            {/* CTA Button */}
            <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition inline-flex items-center space-x-2">
              <span>Cek Sekarang</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Right side placeholder - can be replaced with image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-center text-white/50">
                <svg
                  className="w-24 h-24 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m6.364 1.636l-.707-.707M21 12h-1m1.364 6.364l-.707-.707M12 21v1m-6.364-1.636l.707-.707M3 12h1M3.636 5.636l.707-.707"
                  />
                </svg>
                <p>Status Tracking Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
