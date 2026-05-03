"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCcw, Maximize2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "model";
  text: string;
}

const SUGGESTIONS = [
  "How can I register to vote in India?",
  "What are the key election dates in the US for 2026?",
  "How does Japan ensure secure voting?",
  "Myth vs Reality: Is online voting safe?",
  "What is VVPAT and how does it help?",
  "How can Project Vote-Chori help me?",
  "Difference between a candidate and an elector?",
  "Who won in Varanasi in 2024?",
  "What was the vote share of BJP in 2024?",
  "How many constituencies are in India?",
  "What is the role of a Booth Level Officer?",
  "Can I vote if I am living abroad?",
  "What documents are needed for registration?"
];

export default function ChoriGuardAI() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [randomizedSuggestions, setRandomizedSuggestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I am **ChoriGuard AI**, your dedicated Election Integrity Agent. I have full operational access to all modules, simulators, and live telemetry on this platform. How can I assist your mission today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load from session storage
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("choriguard_chat_session");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    // Initial random suggestions
    setRandomizedSuggestions([...SUGGESTIONS].sort(() => 0.5 - Math.random()).slice(0, 3));
  }, []);

  // Save to session storage
  useEffect(() => {
    if (messages.length > 1) {
      sessionStorage.setItem("choriguard_chat_session", JSON.stringify(messages));
    }
  }, [messages]);

  // Randomize suggestions when chat is opened
  useEffect(() => {
    if (isOpen) {
      setRandomizedSuggestions([...SUGGESTIONS].sort(() => 0.5 - Math.random()).slice(0, 3));
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-chat/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          language: language,
          history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      setMessages(prev => [...prev, { role: "model", text: "" }]);

      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "{}" || data.trim() === "[DONE]") continue;
            const cleanText = data.replace(/\\n/g, "\n");
            accumulatedText += cleanText;
            
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text = accumulatedText;
              return newMessages;
            });
          }
        }
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "model", text: `Error: ${error.message || "Something went wrong"}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9998]">
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        >
          <MessageSquare className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          <span className="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with ChoriGuard AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[400px] max-h-[600px] h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-blue-600 text-white rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none flex items-center gap-2">
                  ChoriGuard AI
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[8px] uppercase tracking-widest font-black">Omni-Access</span>
                </h3>
                <span className="text-xs text-blue-100 font-medium">The Election Integrity Agent</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link 
                href="/ai-assistant" 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Full Screen"
              >
                <Maximize2 className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    m.role === "user" ? "bg-slate-100 dark:bg-slate-800" : "bg-blue-100 dark:bg-blue-900/30"
                  }`}>
                    {m.role === "user" ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20" 
                      : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700/50"
                  }`}>
                    {m.text ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-blue-600 dark:prose-strong:text-blue-400 prose-ul:my-2 prose-li:my-0.5">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center text-slate-400">
                        <RefreshCcw className="w-4 h-4 animate-spin" /> 
                        <span className="font-bold uppercase tracking-widest text-[10px]">Analyzing Intel...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 4 && !isLoading && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {randomizedSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask about elections..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
              ChoriGuard AI can make mistakes. Verify important info.
            </p>
            <p className="text-[9px] text-center text-slate-500 uppercase tracking-widest font-bold mt-1">
              Hackathon Edition 2026 • High-Integrity Verified
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
