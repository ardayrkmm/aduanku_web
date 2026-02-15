import React from "react";

interface ChatLogProps {
  complaintId: string;
}

// Mock chat data for now
const MOCK_CHAT = [
  {
    sender: "Admin",
    message: "Terima kasih atas aduannya. Kami akan proses segera.",
    sentAt: new Date().toISOString(),
  },
  {
    sender: "Pelapor",
    message: "Terima kasih, admin.",
    sentAt: new Date(Date.now() + 60000).toISOString(),
  },
];

export default function ChatLog({ complaintId }: ChatLogProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-semibold mb-4">Chat Log</div>
      <div className="space-y-4">
        {MOCK_CHAT.map((chat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs text-gray-500">{chat.sender} <span className="ml-2 text-[10px]">{new Date(chat.sentAt).toLocaleString()}</span></span>
            <span className="bg-gray-100 rounded px-3 py-2 mt-1 text-sm text-gray-800 w-fit max-w-xs">{chat.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
