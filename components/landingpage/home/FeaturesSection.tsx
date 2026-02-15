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
    <div className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
              Aduanku – Pengaduan Masyarakat Digital untuk Kota Cerdas
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-[#023E8A] rounded-lg flex items-center justify-center shadow-md">
                      <Image
                        src={feature.icon}
                        alt="feature icon"
                        width={26}
                        height={26}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-slate-900 font-semibold leading-relaxed">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side Image */}
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/svg/about.svg"
              alt="Feature Illustration"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
