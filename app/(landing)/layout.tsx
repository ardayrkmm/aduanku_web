import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aduanku - Platform Laporan Publik",
  description:
    "Platform digital untuk melapor dan melacak masalah layanan publik",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A3B7C] rounded flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg text-gray-900">Aduanku</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#fitur"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#tentang"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tentang
            </a>
            <a
              href="#kontak"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Kontak
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="bg-[#0A3B7C] text-white px-6 py-2 rounded-lg hover:bg-[#082956] transition-colors font-medium"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <MessageCircle
                    className="w-5 h-5 text-[#0A3B7C]"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="font-bold text-lg">Aduanku</span>
              </div>
              <p className="text-gray-400 text-sm">
                Platform digital untuk melapor dan melacak masalah layanan
                publik.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Harga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Keamanan
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Karir
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Syarat Layanan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Aduanku. Semua hak dilindungi.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
