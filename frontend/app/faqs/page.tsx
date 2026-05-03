"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronDown, HelpCircle, Search, Sparkles, 
  MessageSquare, Globe, ShieldCheck, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  isCommon: boolean;
}

export default function FAQPage() {
  const { t } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const fallbackFaqs: FAQ[] = [
      { id: 101, question: "What is an EVM?", answer: "An Electronic Voting Machine (EVM) is a device used to record votes electronically, replacing the traditional paper ballot system.", category: "Voting Tech", isCommon: true },
      { id: 102, question: "How does VVPAT work?", answer: "Voter Verifiable Paper Audit Trail (VVPAT) prints a slip showing the serial number, name, and symbol of the candidate you voted for. It is visible through a glass window for 7 seconds.", category: "Voting Tech", isCommon: true },
      { id: 103, question: "Can EVMs be hacked?", answer: "No. Indian EVMs are standalone, non-networked machines that do not connect to the internet, Bluetooth, or Wi-Fi, making them highly resistant to remote hacking.", category: "Security", isCommon: true },
      { id: 104, question: "Who can vote in Indian elections?", answer: "Any Indian citizen aged 18 or above, whose name is enrolled in the electoral roll, has the right to vote.", category: "Voter Rights", isCommon: true },
      { id: 105, question: "Do I need an EPIC card to vote?", answer: "While the Electoral Photo Identity Card (EPIC) is preferred, you can use other approved photo identity documents (like Aadhaar, Passport, Driving License) if your name is on the voter list.", category: "Voter Rights", isCommon: true },
      { id: 106, question: "What is the NOTA option?", answer: "None of the Above (NOTA) allows voters to officially register a vote of rejection for all candidates contesting in the election.", category: "Voter Rights", isCommon: true },
      { id: 107, question: "How does the AI Fact-Checker work?", answer: "ChoriGuard AI cross-references incoming claims with verified databases and official Election Commission guidelines to instantly classify statements as Verified, Fake, or Context Needed.", category: "Security", isCommon: true },
      { id: 108, question: "What happens if an EVM breaks down?", answer: "If an EVM malfunctions during the poll, it is immediately replaced with a reserve EVM by the Presiding Officer in the presence of polling agents.", category: "Voting Tech", isCommon: false }
    ];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/faqs`);
      if (!response.ok) throw new Error('API unreachable');
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setFaqs(shuffled);
      } else {
        setFaqs(fallbackFaqs.sort(() => 0.5 - Math.random()));
      }
    } catch (error) {
      console.error("Failed to fetch FAQs, using fallback intelligence:", error);
      setFaqs(fallbackFaqs.sort(() => 0.5 - Math.random()));
    } finally {
      setLoading(false);
    }
  };

  const dynamicCategories = Array.from(new Set((faqs || []).map(f => f.category)));
  const categories = ["All", ...new Set([...dynamicCategories, "Community Asked"])];

  const filteredFaqs = (faqs || []).filter(f => {
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedFaqs = searchQuery || activeCategory !== "All" ? filteredFaqs : filteredFaqs.slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
              <HelpCircle className="w-4 h-4" />
              Intelligence Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase">
              Frequently Asked <span className="text-blue-600">Intelligence</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Real-time answers to the most critical electoral questions, powered by ChoriGuard AI and verified by the Command Center.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search intel archives..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-slate-100 dark:bg-slate-900 animate-pulse rounded-2xl" />
              ))
            ) : displayedFaqs.length > 0 ? (
              displayedFaqs.map((faq) => (
                <div 
                  key={faq.id}
                  className={`group bg-white dark:bg-slate-900 border transition-all duration-300 rounded-3xl overflow-hidden ${
                    activeId === faq.id 
                      ? "border-blue-500 ring-4 ring-blue-500/5 shadow-xl shadow-blue-500/10" 
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl transition-colors ${
                        activeId === faq.id ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}>
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${activeId === faq.id ? 'rotate-180 text-blue-500' : ''}`} />
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out ${
                    activeId === faq.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <div className="px-8 pb-8 pt-2">
                      <div className="h-px bg-slate-100 dark:bg-slate-800 mb-6" />
                      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-blue-600 dark:prose-strong:text-blue-400 prose-ul:my-2 prose-li:my-0.5">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {faq.answer}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-widest border border-slate-200 dark:border-slate-700">
                          {faq.category}
                        </span>
                        {faq.isCommon && (
                          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" /> Trending Intel
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tight">No archives found in here</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Try a different intelligence query or ask ChoriGuard AI.</p>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-center text-white shadow-2xl shadow-blue-600/30">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight">Still have questions?</h2>
            <p className="text-blue-100 mb-8 font-medium max-w-lg mx-auto opacity-90">
              Our ChoriGuard AI is active 24/7 in the bottom right corner of your Command Center.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                <ShieldCheck className="w-4 h-4" /> Verified Data
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                <Zap className="w-4 h-4" /> Instant Response
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
