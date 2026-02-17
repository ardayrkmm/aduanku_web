"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, ArrowUp, Search } from "lucide-react";

type Message = {
  role: "user" | "bot";
  content: string;
};

const NAVBAR_HEIGHT = 80;

export default function StickyChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Terima kasih atas laporan Anda. Mohon sertakan lokasi dan detail kejadian.",
        },
      ]);
    }, 600);
  };

  return (
    <section
      className="w-full flex justify-center px-4"
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      <div
        className="w-full max-w-6xl flex flex-col"
        style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        {/* JUDUL — HANYA SAAT BELUM CHAT */}
        {!hasStartedChat && (
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Ajukan <span className="text-[#023E8A]">Aduanmu</span> Disini
            </h1>
            <p className="mt-4 text-gray-500 text-lg">
              Kami Mengusahakan yang Terbaik Untukmu
            </p>
          </div>
        )}

        {/* CHAT ROOM */}
        {hasStartedChat && (
          <div className="flex-1 overflow-y-auto bg-white border border-white rounded-t-3xl px-10 py-8 space-y-8">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-6 py-4 rounded-2xl max-w-[60%] ${
                    msg.role === "user"
                      ? "bg-[#023E8A] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* CHAT INPUT — STICKY */}
        <div className="bg-white border border-gray-300 rounded-3xl px-6 py-5 mt-auto relative">
          <div className="absolute top-5 left-6 text-gray-400">
            <Search className="w-5 h-5" />
          </div>

          <textarea
            rows={2}
            placeholder="Hai Aduanku, saya ingin..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="w-full resize-none border-none outline-none mt-6 mb-6"
          />

          <div className="flex justify-between items-center">
            <button className="flex items-center gap-2 text-gray-500">
              <Plus className="w-5 h-5" />
              <span className="text-sm">Tambah Gambar</span>
            </button>

            <button
              onClick={sendMessage}
              className="bg-[#023E8A] hover:bg-[#023E8A] transition p-4 rounded-full text-white"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
