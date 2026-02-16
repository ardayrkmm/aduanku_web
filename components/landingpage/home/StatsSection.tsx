'use client';

export default function StatsSection() {
  const stats = [
    {
      number: '20',
      label: 'Aduan Masuk',
    },
    {
      number: '20',
      label: 'Aduan Diproses',
    },
    {
      number: '20',
      label: 'Aduan Terselesaikan',
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Stats */}
          <div>
            <div className="flex justify-around sm:justify-start sm:space-x-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex items-center space-x-3">
              <button className="flex items-center gap-3 bg-[#023E8A] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
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
            </button>

            </div>
          </div>

          {/* Right side - Description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Transparansi Data Laporan dan Kinerja Penganganan Aduan Masyarakat
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Data berikut memberikan gambaran nyata mengenai laporan masyarakat Kota Tagal, mudah dari jumlah aduan yang masuk, kategori permasalahan terbanyak, hingga tingkat penyelesaian oleh instansi terkait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
