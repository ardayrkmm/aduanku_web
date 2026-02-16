import React from 'react';

interface ChatLogProps {
  complaintId: string;
}

interface ChatMessage {
  sender: 'user' | 'admin';
  message: string;
  sentAt: Date;
}

// Mock chat data for now
const MOCK_CHAT: ChatMessage[] = [
  {
    sender: 'user',
    message: 'Saya ingin melaporkan adanya jalan berlubang di depan rumah saya. Lubang cukup dalam dan membahayakan pengendara motor.',
    sentAt: new Date('2024-01-15T08:30:00'),
  },
  {
    sender: 'admin',
    message: 'Terima kasih atas laporannya. Kami telah menerima aduan Anda dan akan segera melakukan verifikasi.',
    sentAt: new Date('2024-01-15T09:15:00'),
  },
  {
    sender: 'admin',
    message: 'Tim kami telah melakukan survey lapangan dan akan segera memperbaiki jalan tersebut.',
    sentAt: new Date('2024-01-16T14:20:00'),
  },
  {
    sender: 'user',
    message: 'Terima kasih atas respon cepatnya. Saya akan menunggu perbaikannya.',
    sentAt: new Date('2024-01-16T16:45:00'),
  },
];

function formatTime(date: Date): string {
  return new Date(date).toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ChatLog({ complaintId }: ChatLogProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Chat Log</h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {MOCK_CHAT.map((chat, index) => {
          const isUser = chat.sender === 'user';
          
          return (
            <div
              key={index}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
                {/* Message bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{chat.message}</p>
                </div>
                
                {/* Timestamp */}
                <div
                  className={`flex items-center mt-1 text-xs text-gray-500 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{formatTime(chat.sentAt)}</span>
                  <span className="ml-1 font-medium">
                    {isUser ? 'You' : 'Admin'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Input placeholder (non-functional for now) */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            disabled
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
