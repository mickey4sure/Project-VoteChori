// frontend/app/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldAlert, Globe, ChevronDown, Sun, 
  Moon, Monitor, Mail, Phone, Sparkles,
  Calendar, CheckSquare, ShieldCheck, Award, ArrowRight,
  LayoutList
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChoriGuardAI from "@/components/ChoriGuardAI";
import AvrSimulator from "@/components/AvrSimulator";
import { useLanguage } from "@/context/LanguageContext";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      {/* Dynamic Background Elements - Consistent with Calendar */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent -z-10" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

      <main className="flex-1">
        {/* HERO SECTION - Standardized with Calendar Hero */}
        <section className="relative pt-48 pb-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                {t("hero.status")}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white leading-[0.85] max-w-5xl mx-auto uppercase">
              {t("hero.title")}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/dashboard"
                className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/25 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Sparkles className="w-5 h-5" />
                Get Started
              </Link>
              
              <Link 
                href="/modules"
                className="px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-[24px] font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <LayoutList className="w-5 h-5 text-blue-600" />
                Modules
              </Link>
            </div>
          </div>
        </section>

        {/* AVR SIMULATOR PREVIEW - HACKATHON WINNER INTEGRATION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-[120px] -z-10" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center gap-16">
              <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                    Featured Technology
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-[0.9]">
                  Simulate Your <span className="text-emerald-600">Registration.</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                  Experience the automated voter registration flow using our award-winning AVR Simulator. Verify your mock identity and see how high-integrity systems handle your data securely.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    "End-to-end encryption",
                    "Automated cross-referencing",
                    "Real-time telemetry"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <CheckSquare className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <AvrSimulator />
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION HUB PREVIEW */}
        <section className="py-32 bg-slate-50/50 dark:bg-slate-900/30 backdrop-blur-3xl border-y border-slate-100 dark:border-slate-800/50">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white uppercase leading-none">
                Voter Education Hub
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                Comprehensive training tools designed to empower every citizen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { 
                  icon: Calendar, 
                  color: "blue",
                  title: "Timeline",
                  desc: "Track every milestone from caucuses to inauguration.",
                  cta: "Launch Timeline",
                  href: "/timeline"
                },
                { 
                  icon: CheckSquare, 
                  color: "indigo",
                  title: "Booth",
                  desc: "Experience a simulated high-integrity voting session.",
                  cta: "Enter Booth",
                  href: "/booth"
                },
                { 
                  icon: LayoutList, 
                  color: "purple",
                  title: "Modules",
                  desc: "Access deep-dive training archives and resources.",
                  cta: "Start Learning",
                  href: "/modules"
                },
                { 
                  icon: ShieldCheck, 
                  color: "emerald",
                  title: "Checklist",
                  desc: "Ensure you are mission-ready for the next election.",
                  cta: "Verify Readiness",
                  href: "/checklist"
                },
                { 
                  icon: Award, 
                  color: "amber",
                  title: "Trivia",
                  desc: "Test your knowledge in the electoral arena.",
                  cta: "Start Quiz",
                  href: "/quiz"
                }
              ].map((feature, i) => (
                <Link 
                  key={i} 
                  href={feature.href}
                  className="group p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 block relative overflow-hidden"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-50 dark:bg-${feature.color}-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:rotate-6`}>
                    <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white uppercase tracking-tight leading-tight">{feature.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                    {feature.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 group/btn">
                    {feature.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}