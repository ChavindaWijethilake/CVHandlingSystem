"use client";

import { useState } from "react";
import VoiceComponent from "@/components/VoiceComponent";
import { MessageCircle } from "lucide-react"; 

export default function voiceassist() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[100px] animate-pulse" />

      <h1 className="text-4xl font-bold mb-6">Realtime Voice Agent</h1>
      <VoiceComponent />

      
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-all"
      >
        <MessageCircle size={24} />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-6 w-80 h-96 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-teal-600 text-white p-2">
            <span className="text-lg font-semibold">Chatbot</span>
            <button onClick={() => setIsChatOpen(false)} className="text-white text-lg">
              ✕
            </button>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/PSq__E85SnBfpRj0N_4Ea"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        </div>
      )}
    </main>
  );
}
