"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ArrowUpRight,
  MessageCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Call login API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Login failed
        setError(data.message || "Email atau password salah");
        return;
      }

      // Login successful - redirect to dashboard
      router.push("/admin/beranda");
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    "Gunakan huruf besar dan huruf kecil",
    "Tidak boleh sama dengan username / email",
    "Minimal 8 karakter",
    "Gunakan kombinasi angka dan simbol",
  ];

  // Password requirements removed - this is login, not signup

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
            disabled
            className="w-full bg-[#0A3B7C] text-white rounded-md py-2 text-center font-semibold mb-8 opac ity-50 cursor-not-allowed"
          >
            Masuk
          </button>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[80%] mx-auto bg-[#0A3B7C] text-white rounded-full py-3 font-semibold hover:bg-[#082956] transition-colors flex items-center justify-between px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Sedang masuk..." : "Masuk"}</span>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                {loading ? (
                  <Loader className="w-3.5 h-3.5 text-[#0A3B7C] animate-spin" />
                ) : (
                  <ArrowUpRight
                    className="w-3.5 h-3.5 text-[#0A3B7C]"
                    strokeWidth={3}
                  />
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
