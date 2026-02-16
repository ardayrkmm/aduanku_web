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
    <section className="bg-white py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* RIGHT CONTENT (MOBILE ATAS) */}
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

          {/* LEFT CONTENT (STATS + BUTTON) */}
          <div className="order-2 md:order-1">
            
            {/* STATS */}
            <div className="flex justify-between sm:justify-start sm:space-x-16 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-[32px] md:text-[44px] font-semibold text-slate-900 mb-1">
                    {stat.number}
                  </div>
                  <p className="text-slate-500 text-[14px] md:text-[15px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <button className="flex items-center gap-3 bg-[#023E8A] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300">
              Lapor Sekarang!
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
