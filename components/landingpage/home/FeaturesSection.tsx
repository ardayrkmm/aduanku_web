'use client';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Platform pengaduan masyarakat berbasis website',
      description:
        'yang dilengkapi chatbot 24 jam sebagai sarana utama pelaporan aduan.',
      icon: '📱',
    },
    {
      title: 'Aduan yang masuk dikelola oleh pemerintah',
      description:
        'melalui dashboard analitik untuk pemantauan dan penyelesaian data secara terpusat.',
      icon: '📊',
    },
    {
      title: 'Sistem mendukung otomatisasi dan analisis aduan',
      description:
        'guna membantu prioritas kebijakan berbasis data.',
      icon: '📈',
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text & Features */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Aduanku – Pengaduan Masyarakat
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Digital untuk Kota Cerdas
            </p>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  {/* Icon Box */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">{feature.icon}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-slate-900 font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="w-full bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl overflow-hidden shadow-xl aspect-square flex items-center justify-center">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Feature Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
