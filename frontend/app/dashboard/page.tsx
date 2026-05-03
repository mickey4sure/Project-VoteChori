// frontend/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, ShieldCheck, MapPin, CheckSquare, 
  Calendar, BookOpen, BrainCircuit, Activity,
  ChevronRight, Zap, Trophy, History, User
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/components/AuthProvider";
import { generateCitizenId } from "@/lib/identity";
import { getCompletedModules } from "@/lib/moduleProgress";
import AvrSimulator from "@/components/AvrSimulator";

const TOTAL_MODULES = 8;

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompletedIds(getCompletedModules());
    const sync = () => setCompletedIds(getCompletedModules());
    window.addEventListener("moduleCompleted", sync);
    return () => window.removeEventListener("moduleCompleted", sync);
  }, []);

  const QUICK_ACTIONS = [
    {
      title: "ChoriGuard AI",
      description: "Ask questions & verify intel",
      icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
      link: "/ai-assistant",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hover: "hover:border-blue-500 hover:shadow-blue-500/20"
    },
    {
      title: "Booth Locator",
      description: "Find polling stations",
      icon: <MapPin className="w-8 h-8 text-emerald-500" />,
      link: "/booth",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hover: "hover:border-emerald-500 hover:shadow-emerald-500/20"
    },
    {
      title: "Training Modules",
      description: "Electoral process education",
      icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
      link: "/modules",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      hover: "hover:border-indigo-500 hover:shadow-indigo-500/20"
    },
    {
      title: "Knowledge Arena",
      description: "Test your civic skills",
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      link: "/quiz",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      hover: "hover:border-amber-500 hover:shadow-amber-500/20"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Background Orbs — site-wide standard */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] left-[-10%] w-[35%] h-[35%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 pt-40 pb-24 w-full relative z-10">
        
        {/* Global Intelligence Ticker */}
        <div className="mb-8 overflow-hidden bg-slate-900/5 dark:bg-white/5 border-y border-slate-200 dark:border-white/10 backdrop-blur-md py-1.5 -mx-6 px-6">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            {[
              "SYSTEM STATUS: OPTIMAL",
              "ENCRYPTION: AES-256 ACTIVE",
              "NODE CONNECTED: NEW DELHI",
              "INTEGRITY CHECK: 100% VERIFIED",
              "GLOBAL NODES: 4,821 ACTIVE",
              "BLOCKCHAIN SYNC: COMPLETED"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Header Section */}
        <section className="mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Tactical Overview</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none mb-4">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">VoteChori.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">
              Welcome back, Citizen. Your electoral readiness is currently being monitored by ChoriGuard AI.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:flex gap-4">
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-sm flex flex-col gap-4 min-w-[180px] hover:border-emerald-500/50 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Integrity</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {user ? 'Verified' : 'Pending'}
                </p>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-sm flex flex-col gap-4 min-w-[180px] hover:border-amber-500/50 transition-colors group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Knowledge</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{Math.round((completedIds.size / TOTAL_MODULES) * 100)}%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUICK_ACTIONS.map((action, i) => (
                <Link href={action.link} key={i}>
                  <div className={`p-6 bg-white dark:bg-slate-900 rounded-[32px] border-2 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-xl ${action.border} ${action.hover}`}>
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.bg}`}>
                        {action.icon}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{action.title}</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* AVR SIMULATOR - HACKATHON WINNER INTEGRATION */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
               <div className="mb-6 flex items-center justify-between px-2">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                     <Zap className="w-4 h-4" />
                   </div>
                   <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Identity Simulation</h3>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Protocol Node</span>
               </div>
               <AvrSimulator />
            </div>

            {/* Live Map Preview */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=20.5937,78.9629&zoom=5&size=800x400&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:water|color:0x1a1a24&style=feature:landscape|color:0x2a2a35')] bg-cover bg-center opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-full mb-4">
                    <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Live Telemetry</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Nearest Polling Station</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Location services required to pinpoint your exact voting booth.</p>
                </div>
                <Link href="/booth">
                  <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-emerald-500/20 whitespace-nowrap">
                    Launch Map
                  </button>
                </Link>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Citizen Credential Card */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-950/20 border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <User className="w-6 h-6" />
                  </div>
                  <div className={`px-3 py-1 ${user ? 'bg-blue-600/30 border-blue-500/50 text-blue-300' : 'bg-slate-700/50 border-slate-600/50 text-slate-400'} border rounded-full`}>
                    <span className="text-[10px] font-black uppercase tracking-widest">{user ? 'Verified Voter' : 'Guest Citizen'}</span>
                  </div>
                </div>

                <div className="space-y-1 mb-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Credential Holder</p>
                  <h4 className="text-2xl font-black uppercase tracking-tight">
                    Citizen #{user?.uid ? generateCitizenId(user.uid) : '000000'}
                  </h4>
                  <p className="text-xs font-medium text-slate-400">Node: South Delhi Hub</p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Issue Date</p>
                    <p className="text-xs font-bold">MAY 2026</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg p-1 opacity-80">
                    {/* Simulated QR Code */}
                    <div className="w-full h-full bg-slate-900 rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className={`rounded-xs ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Widget */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Readiness</h3>
                </div>
                <Link href="/checklist" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">View All</Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { task: "Verify Voter ID Status", done: true },
                  { task: "Find Nearest Polling Booth", done: false },
                  { task: "Complete EVM Training", done: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                      {item.done && <CheckSquare className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm font-bold ${item.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="font-black uppercase tracking-tight">Upcoming</h3>
                  </div>
                  <Link href="/calendar" className="text-[10px] font-black uppercase tracking-widest text-blue-100 hover:text-white">Full Agenda</Link>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 backdrop-blur-md">
                      <span className="text-[10px] font-black uppercase text-blue-200">May</span>
                      <span className="text-lg font-black leading-none">19</span>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Phase 5 Polling</p>
                      <p className="text-xs font-medium text-blue-200 flex items-center gap-1">
                        <History className="w-3 h-3" /> 49 Constituencies
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 backdrop-blur-md">
                      <span className="text-[10px] font-black uppercase text-blue-200">May</span>
                      <span className="text-lg font-black leading-none">25</span>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Phase 6 Polling</p>
                      <p className="text-xs font-medium text-blue-200 flex items-center gap-1">
                        <History className="w-3 h-3" /> 58 Constituencies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
