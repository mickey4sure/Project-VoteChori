// frontend/app/calendar/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, 
  MapPin, Contact, Phone, Plus, Trash2, Bell, StickyNote,
  Clock, AlertCircle, X, Sparkles, Share2, Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";

interface UserReminder {
  id: string;
  date: number;
  month: number;
  year: number;
  title: string;
  desc: string;
  type: "note" | "reminder";
}

export default function ElectionCalendarPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState<UserReminder[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newNote, setNewNote] = useState<{ title: string; desc: string; type: "note" | "reminder" }>({ title: "", desc: "", type: "note" });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  // Countdown Logic (Target: Nov 3, 2026 - Hypothetical Election)
  useEffect(() => {
    const target = new Date("2026-11-03T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Firebase Sync Logic
  useEffect(() => {
    if (!user) {
      // Fallback to local storage for guests
      const saved = localStorage.getItem("user_reminders");
      if (saved) setReminders(JSON.parse(saved));
      return;
    }

    // Real-time sync for authenticated users
    const q = query(collection(db, "reminders"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReminders = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserReminder[];
      setReminders(fetchedReminders);
    });

    return () => unsubscribe();
  }, [user]);

  // Secondary save to local storage for quick access/offline fallback
  useEffect(() => {
    if (!user) {
      localStorage.setItem("user_reminders", JSON.stringify(reminders));
    }
  }, [reminders, user]);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const addReminder = async () => {
    if (!selectedDay || !newNote.title) return;
    
    const reminderId = Math.random().toString(36).substr(2, 9);
    const reminder: UserReminder & { userId?: string } = {
      id: reminderId,
      date: selectedDay,
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      title: newNote.title,
      desc: newNote.desc,
      type: newNote.type,
      ...(user && { userId: user.uid })
    };

    if (user) {
      try {
        await setDoc(doc(db, "reminders", reminderId), reminder);
      } catch (error) {
        console.error("Error adding reminder to Firebase:", error);
      }
    } else {
      setReminders([...reminders, reminder]);
    }
    
    setShowAddModal(false);
    setNewNote({ title: "", desc: "", type: "note" });
  };

  const deleteReminder = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "reminders", id));
      } catch (error) {
        console.error("Error deleting reminder from Firebase:", error);
      }
    } else {
      setReminders(reminders.filter(r => r.id !== id));
    }
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const prevMonthPadding = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1);
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const nextMonthPadding = Array.from({ length: 42 - (prevMonthPadding.length + currentMonthDays.length) }, (_, i) => i + 1);

  const monthNames = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => 
      new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language, { month: 'long' }).format(new Date(2026, i, 1))
    );
  }, [language]);
  
  const dayHeaders = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(2026, 0, 4 + i); // Jan 4, 2026 is Sunday
      return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language, { weekday: 'short' }).format(day);
    });
  }, [language]);

  const electoralEvents = [
    { date: 15, month: 4, year: 2026, title: "Candidate Filing Deadline", type: "Official", desc: "Last day to file nomination papers." },
    { date: 28, month: 4, year: 2026, title: "Voter Registration Drive", type: "Drive", desc: "City-wide registration event at Town Hall." }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300">
      <Navbar />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <main className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full relative z-10">
        
        {/* New Premium Hero Section */}
        <section className="mb-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{t("cal.intel")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-6">
              {t("cal.title")?.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t("cal.title")?.split(' ').slice(2).join(' ')}.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              {t("cal.subtitle")}
            </p>
          </div>

          {/* Countdown Display */}
          <div className="bg-slate-900 dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl border border-slate-800 flex flex-col items-center min-w-[300px]">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
               <Clock className="w-3 h-3" /> {t("cal.clock")}
             </p>
             <div className="flex gap-4 mb-2">
               <div className="text-center">
                 <div className="text-4xl font-black text-white">{countdown.days}</div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase">{t("cal.days")}</div>
               </div>
               <div className="text-4xl font-black text-slate-700">:</div>
               <div className="text-center">
                 <div className="text-4xl font-black text-white">{countdown.hours}</div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase">{t("cal.hrs")}</div>
               </div>
               <div className="text-4xl font-black text-slate-700">:</div>
               <div className="text-center">
                 <div className="text-4xl font-black text-white">{countdown.mins}</div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase">{t("cal.mins")}</div>
               </div>
             </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Calendar View */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[40px] overflow-hidden shadow-2xl transition-all">
              
              {/* Calendar Controls */}
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/30">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{monthNames[currentDate.getMonth()]}</h2>
                  <p className="text-sm font-bold text-slate-400">{currentDate.getFullYear()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextMonth} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800">
                {dayHeaders.map(day => (
                  <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{day}</div>
                ))}
              </div>
              
              {/* Grid Cells */}
              <div className="grid grid-cols-7">
                {prevMonthPadding.map((day, i) => (
                  <div key={`prev-${i}`} className="aspect-square p-4 border-r border-b border-slate-100 dark:border-slate-800/50 text-slate-300 dark:text-slate-700 text-xs font-bold bg-slate-50/30 dark:bg-slate-950/20">{day}</div>
                ))}
                
                {currentMonthDays.map(day => {
                  const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
                  const dayEvents = electoralEvents.filter(e => e.date === day && e.month === currentDate.getMonth() && e.year === currentDate.getFullYear());
                  const dayReminders = reminders.filter(r => r.date === day && r.month === currentDate.getMonth() && r.year === currentDate.getFullYear());

                  return (
                    <div 
                      key={day} 
                      onClick={() => {
                        setSelectedDay(day);
                        setShowAddModal(true);
                      }}
                      className={`aspect-square p-4 border-r border-b border-slate-100 dark:border-slate-800/50 relative group cursor-pointer transition-all hover:bg-blue-50 dark:hover:bg-blue-600/5
                        ${isToday ? 'bg-blue-50/50 dark:bg-blue-600/10' : ''}
                      `}
                    >
                      <span className={`text-sm font-black ${isToday ? 'text-blue-600 dark:text-blue-500' : 'text-slate-400 dark:text-slate-500'} group-hover:text-blue-600 transition-colors`}>
                        {day.toString().padStart(2, '0')}
                      </span>

                      {/* Dynamic Indicators */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {dayEvents.map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        ))}
                        {dayReminders.map((r, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${r.type === 'reminder' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {nextMonthPadding.map((day, i) => (
                  <div key={`next-${i}`} className="aspect-square p-4 border-r border-b border-slate-100 dark:border-slate-800/50 text-slate-300 dark:text-slate-700 text-xs font-bold bg-slate-50/30 dark:bg-slate-950/20">{day}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Insights */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* AI Briefing Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform">
                 <Brain className="w-32 h-32" />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-6">
                   <Sparkles className="w-5 h-5 text-blue-200" />
                   <span className="text-xs font-black uppercase tracking-widest text-blue-100">{t("cal.briefing")}</span>
                 </div>
                 <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight">Voter Awareness <br />Peak Period.</h3>
                 <p className="text-sm text-blue-50/80 font-medium leading-relaxed mb-8">
                   Our models detect a 40% increase in registration activity today. Ensure your documents are valid before the 15th deadline.
                 </p>
                 <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                   {t("cal.intel_btn")} <Info className="w-4 h-4" />
                 </button>
               </div>
            </div>

            {/* Personal Schedule Registry */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] p-8 shadow-xl">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t("cal.registry")}</h3>
                 <button 
                   onClick={() => { setSelectedDay(new Date().getDate()); setShowAddModal(true); }}
                   className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl transition-all"
                 >
                   <Plus className="w-5 h-5 text-slate-600 dark:text-white" />
                 </button>
               </div>

               <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                 {reminders.length === 0 ? (
                   <div className="py-12 text-center">
                     <StickyNote className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t("cal.clear_schedule") || "Clear Schedule"}</p>
                   </div>
                 ) : (
                   reminders.map(r => (
                     <div key={r.id} className="p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-3xl group transition-all">
                       <div className="flex items-start justify-between mb-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-500">
                           {monthNames[r.month].substring(0,3)} {r.date}
                         </span>
                         <button onClick={() => deleteReminder(r.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                       <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">{r.title}</h4>
                       <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">{r.desc}</p>
                     </div>
                   ))
                 )}
               </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* Modern Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-white/40 dark:bg-slate-950/60">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-[48px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t("cal.sync_new")}</h3>
              <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setNewNote({...newNote, type: 'note'})}
                  className={`py-4 rounded-2xl border-2 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    newNote.type === 'note' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <StickyNote className="w-4 h-4" /> {t("cal.note")}
                </button>
                <button 
                  onClick={() => setNewNote({...newNote, type: 'reminder'})}
                  className={`py-4 rounded-2xl border-2 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    newNote.type === 'reminder' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <Bell className="w-4 h-4" /> {t("cal.reminder")}
                </button>
              </div>

              <input 
                type="text" 
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-blue-500 transition-colors"
                placeholder={t("cal.title_label") + "..." || "Entry Subject..."}
              />

              <textarea 
                value={newNote.desc}
                onChange={(e) => setNewNote({...newNote, desc: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                placeholder={t("cal.desc_label") + "..." || "Describe your entry details..."}
              />

              <button 
                onClick={addReminder}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                {t("cal.commit")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

// Re-using local Brain icon if not in lucide
function Brain(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.23 3 3 0 1 0 5.998-.125 4 4 0 0 0 2.526-5.77 4 4 0 0 0-.52-8.23Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.52 8.23 3 3 0 1 1-5.998-.125 4 4 0 0 1-2.526-5.77 4 4 0 0 1 .52-8.23Z"/>
      <path d="M9 13a4.5 4.5 0 0 0 3-4"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4"/>
      <path d="M12 13V9"/>
    </svg>
  );
}
