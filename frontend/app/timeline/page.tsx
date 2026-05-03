"use client";

import React, { useState } from "react";
import { 
  Sparkles, Calendar, Clock, ChevronRight, 
  ChevronLeft, CheckCircle2, Flag, Users, 
  Vote, Gavel, Award, LayoutList, PlayCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TimelineStep {
  id: number;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  color: string;
}

const TIMELINE_DATA: TimelineStep[] = [
  {
    id: 1,
    period: "January – June",
    title: "Caucuses and Primaries",
    subtitle: "Nominating Phase",
    description: "States hold primary elections or caucuses to select political party nominees for the general election. This is the first critical filter in the democratic process.",
    highlights: [
      "Primaries use secret ballots to choose a candidate.",
      "Caucuses are local gatherings where voters openly decide who to support.",
      "Delegates are awarded based on these results to represent candidates at the National Convention."
    ],
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    period: "July – August",
    title: "National Conventions",
    subtitle: "Formal Nomination",
    description: "Political parties hold national conventions to formally select their final presidential and vice-presidential nominees and unify the party base.",
    highlights: [
      "Official nomination of the President and Vice President candidates.",
      "The party's official platform and policy goals are established.",
      "National media attention builds momentum for the general election."
    ],
    icon: <Award className="w-6 h-6" />,
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: 3,
    period: "September – October",
    title: "General Election Campaigning",
    subtitle: "The Final Sprint",
    description: "Nominees engage in nationwide campaigning, televised debates, and strategic outreach to convince undecided voters across various states.",
    highlights: [
      "Televised Presidential and Vice-Presidential debates occur.",
      "Intensive focus on 'Swing States' that could decide the outcome.",
      "Voter registration drives reach their peak across all demographics."
    ],
    icon: <Flag className="w-6 h-6" />,
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 4,
    period: "Early November",
    title: "Election Day",
    subtitle: "The Decision",
    description: "The culmination of the election cycle where millions of citizens cast their ballots in person or verify their mail-in votes.",
    highlights: [
      "Voters across the country cast ballots on the Tuesday after the first Monday in November.",
      "Results are tallied and certified at the local and state levels.",
      "News outlets provide real-time projections based on exit polls."
    ],
    icon: <Vote className="w-6 h-6" />,
    color: "from-pink-600 to-rose-600"
  },
  {
    id: 5,
    period: "Mid-December",
    title: "The Electoral College Vote",
    subtitle: "Constitutional Mandate",
    description: "Electors meet in their states to cast the official votes for President and Vice President based on their state's popular vote results.",
    highlights: [
      "Electors cast separate ballots for President and Vice President.",
      "The votes are recorded on certificates and sent to the President of the Senate.",
      "This step formally bridges the popular will with the federal structure."
    ],
    icon: <Gavel className="w-6 h-6" />,
    color: "from-rose-600 to-orange-600"
  },
  {
    id: 6,
    period: "January 20",
    title: "Inauguration Day",
    subtitle: "Transition of Power",
    description: "The President-elect takes the oath of office at the U.S. Capitol, marking the peaceful transfer of power and the start of a new administration.",
    highlights: [
      "The Chief Justice administers the Oath of Office at noon.",
      "The President delivers an inaugural address outlining their vision.",
      "The official ceremony is followed by a parade and national celebrations."
    ],
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-orange-600 to-yellow-500"
  }
];

export default function TimelinePage() {
  const [viewMode, setViewMode] = useState<"step" | "full">("step");
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < TIMELINE_DATA.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent -z-10" />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />

      <main className="flex-1 max-w-7xl mx-auto px-6 pt-48 pb-24 w-full relative z-10">
        <section className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-8">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Election Year Journey</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white uppercase leading-[0.85]">
            Mission <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Milestones.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
            Navigate the high-stakes timeline of a presidential election cycle. From the first primary to the final inauguration, track the pulse of democracy.
          </p>
        </section>

        {/* Main Parent Tile */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[40px] shadow-2xl overflow-hidden min-h-[700px] flex flex-col">
          {/* Header Bar inside Tile */}
          <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">The Election Year Timeline</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Journey through the key milestones of a presidential election cycle.</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl flex gap-1 border border-slate-200/50 dark:border-slate-700/50">
              <button
                onClick={() => setViewMode("step")}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === "step" 
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-lg" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Step-by-Step
              </button>
              <button
                onClick={() => setViewMode("full")}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === "full" 
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-lg" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Full Timeline
              </button>
            </div>
          </div>

          {/* Interactive Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {viewMode === "step" ? (
              <>
                {/* Sidebar Process Tiles */}
                <div className="lg:w-80 border-r border-slate-100 dark:border-slate-800 p-6 space-y-4 bg-slate-50/30 dark:bg-slate-950/20">
                  {TIMELINE_DATA.map((step, idx) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-4 group ${
                        currentStep === idx 
                          ? "bg-white dark:bg-slate-800 ring-2 ring-blue-600 shadow-xl" 
                          : "hover:bg-white/50 dark:hover:bg-slate-800/50 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        currentStep === idx ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 dark:bg-slate-900 text-slate-400"
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-0.5 ${
                          currentStep === idx ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
                        }`}>
                          {step.period}
                        </p>
                        <p className={`font-bold text-sm truncate ${
                          currentStep === idx ? "text-slate-900 dark:text-white" : "text-slate-500"
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Main Detail Area */}
                <div className="flex-1 p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`w-20 h-20 rounded-[28px] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/20`}>
                        {TIMELINE_DATA[currentStep].icon}
                      </div>
                      <div>
                        <div className="inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 rounded-full mb-2 border border-blue-100 dark:border-blue-800">
                          {TIMELINE_DATA[currentStep].subtitle}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                          {TIMELINE_DATA[currentStep].title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-12">
                      {TIMELINE_DATA[currentStep].description}
                    </p>

                    {/* Highlights Box */}
                    <div className="bg-slate-50/50 dark:bg-slate-900/30 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Key Highlights</p>
                      <div className="space-y-6">
                        {TIMELINE_DATA[currentStep].highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-5">
                            <div className="w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">
                              {i + 1}
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                      <button
                        disabled={currentStep === 0}
                        onClick={prevStep}
                        className="px-8 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-20"
                      >
                        ← Previous
                      </button>
                      <button
                        disabled={currentStep === TIMELINE_DATA.length - 1}
                        onClick={nextStep}
                        className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20"
                      >
                        Next Phase →
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 p-8 md:p-16">
                <div className="space-y-24 relative">
                  {/* Data Circuit Stream */}
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-100/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                    {/* Multi-stop Timeline Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-indigo-600 via-purple-600 via-pink-600 via-rose-600 to-orange-600 opacity-30" />
                    
                    {/* Animated Data Packets (Circuit Bits) */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-[flow_4s_infinite_linear]" />
                    <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-transparent via-indigo-400 to-transparent animate-[flow_7s_infinite_linear] delay-1000" />
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-[flow_5s_infinite_linear] delay-2000" />
                  </div>

                  {TIMELINE_DATA.map((step, idx) => (
                    <div 
                      key={step.id} 
                      className={`flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 relative ${
                        idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Marker with Glow */}
                      <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-[6px] border-blue-600 z-20 shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                      
                      <div className="flex-1 w-full pl-12 md:pl-0">
                        <div className={`group bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-slate-800/50 rounded-[40px] p-10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ${
                          idx % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}>
                          <div className={`inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 rounded-full mb-4 border border-blue-100 dark:border-blue-800`}>
                            {step.period}
                          </div>
                          <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 group-hover:text-blue-600 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
