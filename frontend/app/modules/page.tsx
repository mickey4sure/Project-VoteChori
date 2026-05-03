"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, PlayCircle, ShieldCheck, 
  Lock, ArrowLeft, CheckCircle, Clock, 
  Database, Gavel, Search, Filter, 
  Sparkles, ChevronRight, GraduationCap,
  History, Star, Info, LayoutList
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCompletedModules } from "@/lib/moduleProgress";

export default function ModulesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load from localStorage on mount
    setCompletedIds(getCompletedModules());

    // Re-sync whenever any module page fires the completion event
    const handleCompletion = () => setCompletedIds(getCompletedModules());
    window.addEventListener("moduleCompleted", handleCompletion);
    return () => window.removeEventListener("moduleCompleted", handleCompletion);
  }, []);

  const categories = ["All", "Basics", "Logistics", "Security", "History"];

  const modules = [
    {
      id: "01",
      title: "Federal Foundations",
      desc: "Comprehensive dive into the Constitution and the three branches of government.",
      category: "Basics",
      icon: Database,
      href: "/modules/federal-foundations"
    },
    {
      id: "02",
      title: "How Voting Works",
      desc: "Understanding your rights, the ballot process, and verifying integrity.",
      category: "Logistics",
      icon: ShieldCheck,
      href: "/modules/how-voting-works"
    },
    {
      id: "03",
      title: "Electoral Politics",
      desc: "Analyzing the constitutional framework and political competition dynamics.",
      category: "Basics",
      icon: Gavel,
      href: "/modules/electoral-politics"
    },
    {
      id: "04",
      title: "Advanced Voter Behavior",
      desc: "Research-driven insights into how media and communication shape voting decisions.",
      category: "Basics",
      icon: Lock,
      href: "/modules/voter-behavior"
    },
    {
      id: "05",
      title: "Local Governance",
      desc: "How city councils and mayors affect your day-to-day life and local policy.",
      category: "Logistics",
      icon: Gavel,
      href: "/modules/local-governance"
    },
    {
      id: "06",
      title: "Electoral Security",
      desc: "Analyzing the protocols that keep the democratic process secure from threats.",
      category: "Security",
      icon: ShieldCheck,
      href: "/modules/electoral-security"
    },
    {
      id: "07",
      title: "Historical Milestones",
      desc: "Key moments in election history that shaped the modern voting landscape.",
      category: "History",
      icon: History,
      href: "/modules/historical-milestones"
    },
    {
      id: "08",
      title: "The Electoral Arena",
      desc: "Advanced strategy and understanding the dynamics of campaign cycles.",
      category: "Basics",
      icon: Star,
      href: "/modules/electoral-arena"
    }
  ];

  // Derive live status and progress from localStorage
  const modulesWithStatus = modules.map((m) => ({
    ...m,
    status: completedIds.has(m.id) ? "completed" : "active",
    progress: completedIds.has(m.id) ? 100 : 0,
  }));

  const filteredModules = modulesWithStatus.filter(m => {
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className="flex-1 relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Hero Header */}
          <header className="mb-16">
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <GraduationCap className="w-3 h-3" />
                  Educational Archives
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-6">
                  Training <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Modules</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Elevate your electoral intelligence through structured briefings. Complete core modules to unlock advanced features and gain higher platform clearance.
                </p>
              </div>

              {/* Global Progress Card */}
              <div className="lg:w-[400px] p-8 bg-white/50 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-slate-800/50 rounded-[32px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Progress</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      {completedIds.size === 0 ? "0%" : `${Math.round((completedIds.size / modules.length) * 100)}%`}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4 relative z-10">
                  <div
                    className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-1000"
                    style={{ width: `${(completedIds.size / modules.length) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest relative z-10">{completedIds.size} of {modules.length} Modules Cleared</p>
              </div>
            </div>
          </header>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-blue-500/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group w-full md:w-[350px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredModules.map((module) => (
              <div 
                key={module.id}
                className={`group relative p-8 rounded-[40px] border transition-all duration-500 ${
                  module.status === 'locked' 
                  ? "bg-slate-50/50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800/50" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                }`}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 ${
                    module.status === 'locked' 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400" 
                    : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  }`}>
                    <module.icon className="w-7 h-7" />
                  </div>
                  
                  {module.status === 'completed' && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle className="w-3 h-3" />
                      Cleared
                    </div>
                  )}
                  {module.status === 'active' && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Active
                    </div>
                  )}
                  {module.status === 'locked' && (
                    <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={module.status === 'locked' ? 'opacity-50' : ''}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Module {module.id}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3 leading-tight">{module.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 line-clamp-2">
                    {module.desc}
                  </p>
                </div>

                {/* Action / Progress */}
                <div className="mt-auto">
                  {module.status !== 'locked' && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Proficiency</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            module.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                          }`}
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {module.status === 'active' ? (
                    <Link 
                      href={module.href || "#"} 
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Resume Training
                    </Link>
                  ) : module.status === 'completed' ? (
                    <Link 
                      href={module.href || "#"} 
                      className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm active:scale-[0.98]"
                    >
                      <History className="w-4 h-4" />
                      Review Briefing
                    </Link>
                  ) : (
                    <button className="w-full py-4 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 cursor-not-allowed border border-slate-100 dark:border-slate-800">
                      <Lock className="w-4 h-4" />
                      Clearance Required
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredModules.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-800">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">No Briefings Found</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}