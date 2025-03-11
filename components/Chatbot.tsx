"use client"; // ✅ This makes it a client component

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chatbot Popup */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-[500px] h-[700px] bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Chat with Us</h2>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-red-500 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chatbot Iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/PSq__E85SnBfpRj0N_4Ea"
            width="100%"
            height="100%"
            className="flex-1 border-none"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Chatbot;
