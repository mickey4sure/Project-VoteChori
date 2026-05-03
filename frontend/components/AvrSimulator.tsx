"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Fingerprint, Database, CheckCircle2, 
  Loader2, ScanFace, ShieldCheck, AlertCircle,
  Cpu, Lock, Globe, FileCheck, Download, RefreshCcw
} from "lucide-react";

interface LogEntry {
  text: string;
  status: "pending" | "done" | "error";
  timestamp: string;
}

export default function AvrSimulator() {
  const [aadhaar, setAadhaar] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [step, setStep] = useState(0);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [logs]);

  const addLog = (text: string, logStatus: "pending" | "done" | "error" = "done") => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      ...prev.map(l => ({ ...l, status: l.status === "pending" ? "done" : l.status } as LogEntry)),
      { text, status: logStatus, timestamp }
    ]);
  };

  const handleDownload = () => {
    const content = `
╔════════════════════════════════════════════════════════════╗
║             ELECTION COMMISSION OF CHORI-GUARD             ║
║                 VOTER REGISTRATION RECEIPT                 ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║   EPIC-ID: EX-VC-${aadhaar.slice(-4)}                              ║
║   STATUS: VERIFIED (2026)                                  ║
║   PROTOCOL: AVR-INTELLIGENCE V2.4                          ║
║                                                            ║
║   VERIFICATION CODE: [${Math.random().toString(36).substring(2, 10).toUpperCase()}]             ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║   This is a simulation receipt for educational purposes.   ║
║   Your identity has been cross-referenced with the         ║
║   national electoral database using RSA-4096 encryption.   ║
╚════════════════════════════════════════════════════════════╝
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `VoterID_EX-VC-${aadhaar.slice(-4)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const runSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length < 12) return;

    setStatus("processing");
    setLogs([]);
    setStep(0);

    const stages = [
      { text: "Initializing Secure Handshake with UIDAI Gateway...", delay: 1000 },
      { text: "Performing Asymmetric Key Exchange (RSA-4096)...", delay: 1200 },
      { text: "Fetching Encrypted Demographic Data...", delay: 1500 },
      { text: "Validating Biometric Hash against Central Registry...", delay: 1800 },
      { text: "Cross-referencing Electoral Rolls (National Data Center)...", delay: 1400 },
      { text: "Applying AI-based De-duplication Check...", delay: 1600 },
      { text: "Calculating Constituency Assignment (Geographic)...", delay: 1200 },
      { text: "Finalizing Cryptographic Digital Signature...", delay: 1000 },
    ];

    for (let i = 0; i < stages.length; i++) {
      setStep(i + 1);
      addLog(stages[i].text, "pending");
      await new Promise(resolve => setTimeout(resolve, stages[i].delay));
    }

    addLog("EPIC-ID Generation Successful. Record committed to Blockchain.", "done");
    setStatus("success");
  };

  const reset = () => {
    setStatus("idle");
    setAadhaar("");
    setLogs([]);
    setStep(0);
  };

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
        
        {/* HEADER */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3 group-hover:rotate-0 transition-transform">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl tracking-tight text-slate-900 dark:text-white uppercase">AVR Intelligence</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Automated Voter Registry v2.4</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${status === 'processing' ? 'bg-amber-500 animate-ping' : status === 'success' ? 'bg-emerald-500' : 'bg-slate-300'} `} />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{status}</span>
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col gap-8">
          {status === "idle" && (
            <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Identity Verification</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Enter your mock 12-digit UID to initiate the high-integrity automated enrollment protocol.
                </p>
              </div>

              <form onSubmit={runSimulation} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="aadhaar-input" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Mock Aadhaar Number
                  </label>
                  <div className="relative">
                    <input
                      id="aadhaar-input"
                      type="text"
                      maxLength={12}
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                      placeholder="XXXX XXXX XXXX"
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl px-8 py-5 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 font-mono text-xl tracking-[0.3em] transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    />
                    <Fingerprint className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 dark:text-slate-700" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={aadhaar.length < 12}
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs rounded-3xl transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-30 flex justify-center items-center gap-3 active:scale-95"
                >
                  <ScanFace className="w-5 h-5" /> Execute Protocol
                </button>
              </form>
            </div>
          )}

          {(status === "processing" || status === "success") && (
            <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[400px]">
              
              {/* TERMINAL GLASS */}
              <div className="flex-1 flex flex-col bg-slate-950 rounded-[32px] border border-slate-800 shadow-2xl p-6 font-mono overflow-hidden relative group/terminal">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/50">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Secure Node: 0x4F2...
                  </div>
                </div>

                <div 
                  className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-800"
                  aria-live="polite"
                  aria-atomic="false"
                >
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2">
                      <span className="text-slate-600 shrink-0 text-[10px] mt-1">[{log.timestamp}]</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`${log.status === "pending" ? "text-emerald-400 animate-pulse" : "text-slate-300"} text-xs leading-relaxed`}>
                            {log.text}
                          </span>
                          {log.status === "done" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                          {log.status === "pending" && <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>

                {status === "processing" && (
                  <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className={`h-1 w-6 rounded-full transition-colors duration-500 ${i < step ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                      {Math.round((step / 8) * 100)}% Verified
                    </span>
                  </div>
                )}
              </div>

              {/* CARD PREVIEW (Success State Only) */}
              {status === "success" && (
                <div className="w-full lg:w-[380px] animate-in zoom-in-95 duration-700">
                  <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 shadow-xl flex flex-col h-full">
                    <div className="flex-1">
                      <div className="relative aspect-[1.58/1] w-full bg-blue-600 rounded-2xl p-4 text-white overflow-hidden shadow-2xl mb-6">
                         {/* Card Background Patterns */}
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                         <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -ml-16 -mb-16" />
                         
                         <div className="relative flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                               <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-md flex items-center justify-center">
                                     <ShieldCheck className="w-5 h-5" />
                                  </div>
                                  <span className="text-[8px] font-black uppercase tracking-widest leading-none">Election Commission<br/>of India</span>
                               </div>
                               <div className="w-10 h-10 bg-white/10 rounded-full backdrop-blur-md border border-white/20" />
                            </div>

                            <div className="space-y-1">
                               <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Voter Identification</p>
                               <h5 className="text-xl font-black tracking-tighter">EX-VC-{aadhaar.substring(8)}</h5>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/20 pt-3 mt-2">
                               <div>
                                  <p className="text-[8px] opacity-60 uppercase font-black">Status</p>
                                  <p className="text-[10px] font-bold uppercase tracking-widest">Verified 2026</p>
                               </div>
                               <FileCheck className="w-6 h-6 opacity-40" />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl p-4 flex gap-4">
                           <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                           </div>
                           <div>
                              <h6 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Protocol Success</h6>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Identity successfully matched with national electoral database.</p>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button 
                        onClick={handleDownload}
                        aria-label="Download Voter ID"
                        className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                      <button 
                        onClick={reset}
                        aria-label="Run New Simulation"
                        className="w-14 h-14 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center transition-all active:scale-95"
                      >
                        <RefreshCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER STATS */}
        <div className="px-8 py-4 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> SSL 4096-bit</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="hidden sm:inline">Constituency: New Delhi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            Active Node
          </div>
        </div>
      </div>
    </div>
  );
}