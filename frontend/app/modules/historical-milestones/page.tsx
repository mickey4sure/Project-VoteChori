"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, CheckCircle, ListChecks, ShieldAlert, 
  Terminal, Play, Pause, RotateCcw, 
  ChevronRight, Bookmark, Share2, Info,
  Fingerprint, FileCheck, Eye, Lock, History, Calendar, Star, Cpu
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { markModuleCompleted } from "@/lib/moduleProgress";

export default function HistoricalMilestonesPage() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      if (progress >= 95) {
        markModuleCompleted("07");
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
          className="h-full bg-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300"
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
              <span className="text-amber-600">Module 07</span>
            </div>
          </div>

          <section className="mb-20">
            <div className="relative rounded-[48px] overflow-hidden aspect-[21/9] mb-12 shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img 
                src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=2000" 
                alt="Historical Milestones" 
                className="w-full h-full object-cover opacity-80 dark:opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Calendar className="w-3 h-3" />
                Evolution of Democracy
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Historical <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Milestones</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                From the first ink to the first byte. Trace the evolution of Indian elections through the decades—the landmark first election of 1951-52, the introduction of EVMs, and the digitalization of the democratic payload.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <article className="lg:col-span-12 space-y-16">
              <section className="space-y-12">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">The Timeline Architecture</h3>
                
                <div className="space-y-12 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
                   {/* 1951 */}
                   <div className="relative pl-16 group">
                      <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-amber-500 transition-colors z-10">
                         <Star className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900">
                         <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 block">Foundational Phase</span>
                         <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">1951-52: The First Giant Leap</h4>
                         <p className="text-slate-500 font-medium leading-relaxed">The first general election after independence. Over 173 million voters, many of whom were illiterate, used colored ballot boxes and unique symbols for the first time.</p>
                      </div>
                   </div>

                   {/* 1982 */}
                   <div className="relative pl-16 group">
                      <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-amber-500 transition-colors z-10">
                         <Cpu className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900">
                         <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 block">Technological Shift</span>
                         <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">1982: The Birth of EVMs</h4>
                         <p className="text-slate-500 font-medium leading-relaxed">Electronic Voting Machines were first tested in the Paravur constituency in Kerala, marking the beginning of the end for the paper ballot era.</p>
                      </div>
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
                    <Link href="/modules/electoral-arena" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center gap-3">
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
