"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/beranda");
  };

  const passwordRequirements = [
    "Gunakan huruf besar dan huruf kecil",
    "Tidak boleh sama dengan username / email",
    "Minimal 8 karakter",
    "Gunakan kombinasi angka dan simbol",
  ];

  return (
    <div className="min-h-screen flex bg-white p-4 md:p-6">
      {/* Left Column - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 lg:pr-8">
        <div className="w-full bg-gradient-to-br from-black via-[#0f172a] to-[#1e3a8a] rounded-3xl p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <MessageCircle
                className="w-5 h-5 text-[#0A3B7C]"
                strokeWidth={2.5}
              />
            </div>
            <span className="text-white font-bold text-lg">Aduanku.</span>
          </div>

          {/* Bottom Content */}
          <div>
            <p className="text-gray-400 text-sm mb-3">Admin Login</p>
            <h2 className="text-white font-bold text-4xl leading-tight">
              Akses dashboard pengelolaan laporan dan data layanan publik.
            </h2>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:pl-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0A3B7C] rounded flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-black font-bold text-lg">Aduanku.</span>
          </div>

          {/* Masuk Tab */}
          <button
            type="button"
            className="w-full bg-[#0A3B7C] text-white rounded-md py-2 text-center font-semibold mb-8 hover:bg-[#082956] transition-colors"
          >
            Masuk
          </button>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Id
              </label>
              <input
                type="email"
                placeholder="Masukan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B7C] focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Katasandi
                </label>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:underline transition-colors"
                >
                  Lupa Kata Sandi
                </a>
              </div>
              <input
                type="password"
                placeholder="Masukan Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B7C] focus:border-transparent"
                required
              />
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              {passwordRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    strokeWidth={3}
                  />
                  <span className="text-xs text-gray-500">{requirement}</span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0A3B7C] text-white rounded-full py-3 font-semibold hover:bg-[#082956] transition-colors flex items-center justify-between px-6"
            >
              <span>Cek Sekarang</span>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-[#0A3B7C]"
                  strokeWidth={3}
                />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
