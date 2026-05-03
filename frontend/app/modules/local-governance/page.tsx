"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, CheckCircle, ListChecks, ShieldAlert, 
  Terminal, Play, Pause, RotateCcw, 
  ChevronRight, Bookmark, Share2, Info,
  Fingerprint, FileCheck, Eye, Lock, Map, Building, Home
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { markModuleCompleted } from "@/lib/moduleProgress";

export default function LocalGovernancePage() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      if (progress >= 95) {
        markModuleCompleted("05");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="flex-1 relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link href="/" className="hover:text-blue-600 transition-colors">Command Center</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/modules" className="hover:text-blue-600 transition-colors">Archives</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-emerald-600">Module 05</span>
            </div>
          </div>

          <section className="mb-20">
            <div className="relative rounded-[48px] overflow-hidden aspect-[21/9] mb-12 shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img 
                src="https://images.unsplash.com/photo-1577083165350-16c9f88b4a2e?auto=format&fit=crop&q=80&w=2000" 
                alt="Local Governance" 
                className="w-full h-full object-cover opacity-80 dark:opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Home className="w-3 h-3" />
                Decentralized Command
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Local <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Governance</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Democracy starts at the doorstep. Explore the Panchayati Raj system and Urban Local Bodies, the 73rd and 74th Amendments, and how decentralized power affects local policy.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <article className="lg:col-span-12 space-y-16">
              <section className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
                  <Terminal className="w-8 h-8 text-emerald-600" />
                  Executive Summary
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Local self-government is the foundation of the Indian democratic architecture. By decentralizing power to the village (Gram) and city level, the system ensures that governance is direct, accessible, and responsive to immediate local needs.
                  </p>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Governance Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center font-black mb-6">01</div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Panchayati Raj</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">The three-tier system of rural governance: Gram Panchayat, Block Samiti, and Zila Parishad. This ensures rural intelligence and needs are prioritized.</p>
                   </div>
                   <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 flex items-center justify-center font-black mb-6">02</div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Municipalities</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Urban local bodies responsible for infrastructure, sanitation, and health. They serve as the primary operational link for city-dwelling citizens.</p>
                   </div>
                </div>
              </section>

              <section className="pt-16 border-t border-slate-100 dark:border-slate-800">
                <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden group">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Briefing Concluded</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-lg mx-auto">
                    You have successfully absorbed the operational protocols. Return to the archives or proceed to the next intelligence track.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/modules" className="px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Archives
                    </Link>
                    <Link href="/modules/electoral-security" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center gap-3">
                      Next Module
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
