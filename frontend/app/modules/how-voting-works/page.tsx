"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, CheckCircle, ListChecks, ShieldAlert, 
  Terminal, Play, Pause, RotateCcw, 
  ChevronRight, Bookmark, Share2, Info,
  Fingerprint, FileCheck, Eye, Lock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { markModuleCompleted } from "@/lib/moduleProgress";

export default function HowVotingWorksPage() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      if (progress >= 95) {
        markModuleCompleted("02");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="flex-1 relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          
          {/* Breadcrumbs & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link href="/" className="hover:text-blue-600 transition-colors">Command Center</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/modules" className="hover:text-blue-600 transition-colors">Archives</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600">Module 02</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-blue-600 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-blue-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <section className="mb-20">
            <div className="relative rounded-[48px] overflow-hidden aspect-[21/9] mb-12 shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img 
                src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=2000" 
                alt="Democratic Process" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 dark:opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <ShieldAlert className="w-3 h-3" />
                Operational Protocol
              </div>
              <div className="flex items-center gap-4 mb-8">
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
                  How <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Voting Works</span>
                </h1>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  <CheckCircle className="w-4 h-4" />
                  100% Cleared
                </div>
              </div>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                A definitive technical briefing on the lifecycle of a vote. Master the mechanics of ballot verification, EVM protocols, and VVPAT auditing to safeguard democratic integrity.
              </p>
            </div>
          </section>

          {/* Content Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar Stats */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[32px] border border-slate-100 dark:border-slate-800/50">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Briefing Intel
                </h4>
                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clearance Level</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">L2 Restricted</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time to Complete</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">12 Minutes</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prerequisites</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Federal Foundations</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-blue-600 rounded-[32px] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                <h4 className="text-xs font-black uppercase tracking-widest mb-4 relative z-10">Quick Tip</h4>
                <p className="text-sm font-medium leading-relaxed mb-6 relative z-10 opacity-90">
                  Always verify your status 30 days before deployment. Voter purges are the primary vector for suppression.
                </p>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <Fingerprint className="w-5 h-5" />
                </div>
              </div>
            </aside>

            {/* Main Article */}
            <article className="lg:col-span-8 space-y-16">
              
              <section className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
                  <Terminal className="w-8 h-8 text-blue-600" />
                  Executive Summary
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Voting is the critical vector of democratic execution. Understanding the mechanics of how a single vote transitions from a selection on an Electronic Voting Machine (EVM) to a verified tally ensures the integrity of the process. This module breaks down the systems to help you identify suppression or tampering.
                  </p>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Standard Operating Procedure</h3>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="group p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                        01
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Registration</h4>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Confirm you are active on the voter rolls. Purges happen frequently; verify your status at least 30 days prior to deployment to ensure your vector is clear.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="group p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                        02
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Intel Preparation</h4>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Review candidates and measures ahead of time. Download a sample ballot to familiarize yourself with the interface to reduce time at the terminal and minimize friction.
                    </p>
                  </div>

                  {/* Step 3 - Large Highlight */}
                  <div className="group p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl">
                          03
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tight">The Cast & Verify Protocol</h4>
                      </div>
                      <p className="text-white/90 text-lg font-medium leading-relaxed mb-8">
                        When utilizing EVMs, strict verification is required. After pressing the button for your candidate, immediately observe the VVPAT window.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/10 group-hover:translate-x-2 transition-transform">
                          <FileCheck className="w-6 h-6 text-blue-200 shrink-0" />
                          <p className="text-sm font-bold opacity-90">Verify the printed slip shows the correct serial number, name, and symbol of your chosen candidate.</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/10 group-hover:translate-x-2 transition-transform delay-75">
                          <Eye className="w-6 h-6 text-indigo-200 shrink-0" />
                          <p className="text-sm font-bold opacity-90">Ensure the slip remains visible for exactly 7 seconds before it transitions to the sealed drop box.</p>
                        </div>
                      </div>
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
                    <Link href="/modules/electoral-politics" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center gap-3">
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