"use client";

import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, ListChecks, CheckCircle2, 
  Circle, MapPin, CreditCard, UserCheck, 
  Info, AlertTriangle, Scale, Clock,
  ChevronRight, ArrowRight, ShieldAlert,
  Calendar, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ChecklistPage() {
  const [actionPlan, setActionPlan] = useState([
    { id: 1, text: "Verify Voter Registration Status", completed: true, icon: UserCheck },
    { id: 2, text: "Locate Designated Polling Station", completed: false, icon: MapPin },
    { id: 3, text: "Review Valid Photo ID Requirements", completed: false, icon: CreditCard },
    { id: 4, text: "Download Sample Ballot & Research Candidates", completed: false, icon: ListChecks },
    { id: 5, text: "Establish Transportation & Timing Plan", completed: false, icon: Calendar },
  ]);

  const toggleItem = (id: number) => {
    setActionPlan(actionPlan.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = actionPlan.filter(item => item.completed).length;
  const progress = (completedCount / actionPlan.length) * 100;

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
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Mission Readiness Protocol</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white uppercase leading-[0.85]">
              Voter <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Checklist.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
              Prepare your operational plan for Election Day. Verify every requirement and safeguard your right to vote with total technical confidence.
            </p>
          </div>

          {/* MAIN PARENT TILE */}
          <div className="relative p-1 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-[48px] shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-3xl rounded-[48px]" />
            
            <div className="relative p-8 md:p-16 flex flex-col gap-12">
              
              {/* Parent Tile Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Operational Readiness Hub</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Reference ID: VC-2024-EXEC</p>
                </div>
                
                {/* Readiness Score */}
                <div className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32" cy="32" r="28"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-slate-100 dark:text-slate-800"
                      />
                      <circle
                        cx="32" cy="32" r="28"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={175.9}
                        strokeDashoffset={175.9 * (1 - progress / 100)}
                        className="text-blue-600 transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute text-sm font-black text-slate-900 dark:text-white">{Math.round(progress)}%</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span className={`text-sm font-black uppercase tracking-tight ${progress === 100 ? 'text-emerald-500' : 'text-blue-600'}`}>
                      {progress === 100 ? 'Mission Ready' : 'Operational Syncing'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CHILD TILES GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* TILE 1: ACTION PLAN */}
                <div className="relative p-10 bg-white/80 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[40px] border border-white dark:border-slate-800 shadow-xl group/tile">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <ListChecks className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Personal Action Plan</h3>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Checklist</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {actionPlan.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`w-full p-5 rounded-3xl border transition-all flex items-center gap-4 text-left group/item ${
                          item.completed 
                          ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/50" 
                          : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-blue-500/50"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          item.completed 
                          ? "bg-blue-600 text-white" 
                          : "bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700"
                        }`}>
                          {item.completed ? <CheckCircle2 className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${
                          item.completed ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                        }`}>
                          {item.text}
                        </span>
                        <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                      * Your progress is automatically synced with your local Command Center session.
                    </p>
                  </div>
                </div>

                {/* TILE 2: GENERAL VOTING RULES */}
                <div className="relative p-10 bg-white/80 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[40px] border border-white dark:border-slate-800 shadow-xl group/tile">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl translate-y-12 -translate-x-12" />

                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">General Voting Rules</h3>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Protocol Reference</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        title: "ID Requirements",
                        desc: "Most jurisdictions require a valid, government-issued photo ID. Ensure yours is current.",
                        icon: CreditCard,
                        color: "indigo"
                      },
                      {
                        title: "Voter Conduct",
                        desc: "Electioneering (wearing candidate gear) is strictly prohibited within 100 feet of polling sites.",
                        icon: ShieldAlert,
                        color: "amber"
                      },
                      {
                        title: "Assistance Rights",
                        desc: "Voters with disabilities or language barriers have the legal right to designated assistance.",
                        icon: Info,
                        color: "blue"
                      },
                      {
                        title: "Operational Hours",
                        desc: "If you are in line when polls close, you are legally entitled to cast your ballot.",
                        icon: Clock,
                        color: "emerald"
                      }
                    ].map((rule, i) => (
                      <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                        <div className={`w-12 h-12 rounded-2xl bg-${rule.color}-50 dark:bg-${rule.color}-900/20 text-${rule.color}-600 dark:text-${rule.color}-400 flex items-center justify-center shrink-0`}>
                          <rule.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">{rule.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {rule.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-8 py-5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 group/btn">
                    Read Full Bill of Rights
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

              {/* Status Footer */}
              <div className="p-8 bg-slate-900 text-white rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent pointer-events-none" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1">Final Readiness Check</h3>
                    <p className="text-xs text-slate-400 font-medium">Complete all actions to achieve 100% mission readiness.</p>
                  </div>
                </div>
                <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-[xs] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 relative z-10">
                  Export Protocol PDF
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
