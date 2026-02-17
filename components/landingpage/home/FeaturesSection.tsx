'use client';

import Image from 'next/image';

export default function FeaturesSection() {
  const features = [
    {
      title:
        'Platform pengaduan masyarakat berbasis website yang dilengkapi chatbot 24 jam sebagai sarana utama pelaporan aduan.',
      icon: '/svg/24h.svg',
    },
    {
      title:
        'Aduan yang masuk dikelola oleh pemerintah melalui dashboard analitik untuk pemantauan dan penyelesaian data secara terpusat.',
      icon: '/svg/data.svg',
    },
    {
      title:
        'Sistem mendukung otomatisasi dan analisis aduan guna membantu prioritas kebijakan berbasis data.',
      icon: '/svg/stats.svg',
    },
  ];

  return (
    <section
  id="FeaturesSection"
  className="bg-white py-10 md:py-16 px-4 scroll-mt-40"
>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE — MOBILE ATAS */}
          <div className="order-1 md:order-2 mb-10 md:mb-0">
            <div className="relative w-full h-[320px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-xl">
              <Image
                src="/svg/About.svg"
                alt="Feature Illustration"
                fill
                className="object-cover"
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
                text-[26px]
                md:text-[38px]
                lg:text-[42px]
                leading-[1.25]
                mb-8
              "
            >
              Aduanku – Pengaduan Masyarakat Digital untuk Kota Cerdas
            </h2>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#023E8A] rounded-xl flex items-center justify-center shadow-md">
                      <Image
                        src={feature.icon}
                        alt="feature icon"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 text-[16px] md:text-[18px] leading-relaxed">
                    {feature.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
