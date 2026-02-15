import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold text-[#0A3B7C]">
                🚀 Platform Laporan Digital Terdepan
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Laporkan Masalah Publik dengan Mudah
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Aduanku adalah platform digital yang memudahkan masyarakat untuk
              melaporkan dan melacak masalah layanan publik secara real-time.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Lapor dalam hitungan detik
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Lacak status laporan real-time
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Transparansi penuh dalam penanganan
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="bg-[#0A3B7C] text-white px-8 py-3 rounded-lg hover:bg-[#082956] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#demo"
                className="border-2 border-[#0A3B7C] text-[#0A3B7C] px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Lihat Demo
              </a>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <p className="text-gray-600">
                Platform Responsif untuk Mobile & Desktop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600">
              Semua yang Anda butuhkan untuk mengelola laporan publik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Analytics Mendalam",
                description:
                  "Dashboard analytics real-time untuk memantau tren laporan dan prioritas penanganan.",
              },
              {
                icon: "🗺️",
                title: "Pemetaan Masalah",
                description:
                  "Visualisasi heatmap untuk melihat konsentrasi masalah di berbagai wilayah.",
              },
              {
                icon: "⚡",
                title: "Respons Cepat",
                description:
                  "Sistem notifikasi real-time untuk penanganan masalah yang lebih cepat dan efisien.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#0A3B7C] to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Siap Bergabung?</h2>
          <p className="text-lg mb-8 opacity-90">
            Mulai gunakan Aduanku hari ini dan tingkatkan transparansi layanan
            publik Anda.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-[#0A3B7C] px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            Daftar Gratis Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
