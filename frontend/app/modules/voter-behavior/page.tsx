"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, CheckCircle, ListChecks, ShieldAlert, 
  Terminal, Play, Pause, RotateCcw, 
  ChevronRight, Bookmark, Share2, Info,
  Fingerprint, FileCheck, Eye, Lock, BarChart, Newspaper, MessageSquare
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { markModuleCompleted } from "@/lib/moduleProgress";

export default function VoterBehaviorPage() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      if (progress >= 95) {
        markModuleCompleted("04");
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
          className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)] transition-all duration-300"
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
              <span className="text-indigo-600">Module 04</span>
            </div>
          </div>

          <section className="mb-20">
            <div className="relative rounded-[48px] overflow-hidden aspect-[21/9] mb-12 shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000" 
                alt="Voter Behavior" 
                className="w-full h-full object-cover opacity-80 dark:opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <BarChart className="w-3 h-3" />
                Advanced Research: Krauss Archive
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Voter <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Behavior</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Unlock the psychological and social factors that influence electoral choices. Explore the Krauss publications on media impact, social cleavages, and the strategic cognitive processing of voters.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[32px] border border-slate-100 dark:border-slate-800/50">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600" />
                  Research Intel
                </h4>
                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clearance</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">High Clearance</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authors</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Krauss et al.</span>
                  </div>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-8 space-y-16">
              
              <section className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
                  <BarChart className="w-8 h-8 text-indigo-600" />
                  Executive Summary
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Voter behavior is the study of why citizens vote the way they do. It involves complex psychological priming, social identity markers, and the cognitive processing of media-framed information. This module uses research from the Krauss archives to decode the underlying vectors of electoral choice.
                  </p>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Behavioral Standard Operating Procedure</h3>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="group p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-sm">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                        01
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">The Media Nexus</h4>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Media outlets act as filters for political intelligence. Through 'Agenda Setting', they prioritize specific issues (e.g., economy vs security), effectively telling the public what to think *about*. Krauss research shows this significantly shifts candidate perception.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="group p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all shadow-sm">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black">
                        02
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Social Cleavage Mapping</h4>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Voters are rarely independent actors; they are nodes in social networks. Class, religion, and regional identity create 'cleavages' that political parties mobilize. Understanding these markers helps predict movement across large demographics.
                    </p>
                  </div>

                  {/* Step 3 - Highlight */}
                  <div className="group p-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[40px] text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl">
                          03
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tight">The Strategic Cognitive Shield</h4>
                      </div>
                      <p className="text-white/90 text-lg font-medium leading-relaxed mb-8">
                        Advanced voters utilize 'Strategic Voting' to maximize their utility. This occurs when a voter selects a second-best candidate to prevent a least-preferred outcome.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/10 group-hover:translate-x-2 transition-transform">
                          <Eye className="w-6 h-6 text-indigo-200 shrink-0" />
                          <p className="text-sm font-bold opacity-90">Framing Effect: The way a problem is presented (framed) can lead to different decisions even when the underlying facts are identical.</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/10 group-hover:translate-x-2 transition-transform delay-75">
                          <Lock className="w-6 h-6 text-purple-200 shrink-0" />
                          <p className="text-sm font-bold opacity-90">Cognitive Dissonance: Voters often ignore information that contradicts their existing beliefs to maintain psychological comfort.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pt-16 border-t border-slate-100 dark:border-slate-800">
                <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden group">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Briefing Concluded</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-lg mxauto">
                    You have successfully absorbed the operational protocols. Return to the archives or proceed to the next intelligence track.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/modules" className="px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Archives
                    </Link>
                    <Link href="/modules/local-governance" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center gap-3">
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
