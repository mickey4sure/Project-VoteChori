"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Send, Bot, User, Sparkles, RefreshCcw, 
  ShieldCheck, Info, MessageSquare, History,
  Maximize2, ExternalLink
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
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
  "Difference between a candidate and an elector?"
];

export default function AIAssistantPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Welcome to the Full-Page ChoriGuard Experience. I am your dedicated Election Integrity Assistant. How can I guide you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
          history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

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
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <main className="flex-1 pt-32 pb-12 px-6 flex flex-col max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-6 col-span-1">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4" /> About ChoriGuard
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-4">
                Powered by Advanced Gemini Models, ChoriGuard is trained to provide accurate, non-partisan information about electoral processes in India, Japan, and the US.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Fact-Checked Data
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <History className="w-4 h-4 text-blue-500" /> Real-time Updates
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-600 rounded-[32px] text-white shadow-xl shadow-blue-500/20">
              <h3 className="font-black uppercase tracking-widest text-xs mb-4">Quick Links</h3>
              <div className="space-y-4">
                <a href="/quiz" className="flex items-center justify-between group hover:translate-x-1 transition-transform">
                  <span className="text-sm font-bold">Take a Quiz</span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </a>
                <a href="/modules" className="flex items-center justify-between group hover:translate-x-1 transition-transform">
                  <span className="text-sm font-bold">Learning Hub</span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 flex flex-col bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[600px]">
            {/* Chat Header */}
            <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">ChoriGuard AI</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-4 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                      m.role === "user" ? "bg-slate-100 dark:bg-slate-800" : "bg-blue-600 text-white"
                    }`}>
                      {m.role === "user" ? <User className="w-6 h-6 text-slate-600" /> : <Bot className="w-6 h-6" />}
                    </div>
                    <div className={`p-5 rounded-[28px] text-base leading-relaxed shadow-sm ${
                      m.role === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : "bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                    }`}>
                      {m.text ? (
                        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-blue-600 dark:prose-strong:text-blue-400 prose-ul:my-2 prose-li:my-0.5">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center text-sm font-bold animate-pulse">
                          <RefreshCcw className="w-4 h-4 animate-spin" /> 
                          Analyzing electoral patterns...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions Box */}
            {!isLoading && messages.length < 4 && (
              <div className="px-8 pb-4">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="text-xs px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400 transition-all font-bold flex items-center gap-2 group"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500 group-hover:text-white" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="relative max-w-4xl mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Type your question here..."
                  className="w-full pl-6 pr-16 py-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl text-base focus:outline-none focus:border-blue-600 transition-all dark:text-white shadow-xl"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-3 bottom-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-blue-500/40"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
