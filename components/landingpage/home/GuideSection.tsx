'use client';

export default function GuideSection() {
  return (
    <div className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Langkah Mudah Melaporkan Aduan Anda
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Ikuti panduan berikut untuk melaporkan permasalahan di Kota Tagal secara mudah, cepat, dan terintegrasi dengan sistem layanan publik.
            </p>

            {/* CTA Button */}
            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition inline-flex items-center space-x-2">
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

          {/* Right side - Image placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl overflow-hidden shadow-xl aspect-square flex items-center justify-center">
              <div className="text-center text-gray-400">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Guide Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
