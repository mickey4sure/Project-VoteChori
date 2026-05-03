// frontend/app/quiz/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Trophy, Brain, HelpCircle, ArrowRight, 
  RotateCcw, CheckCircle2, XCircle, ChevronLeft, 
  ChevronRight, Sparkles, BookOpen
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_DATA: Question[] = [
  {
    id: 1,
    question: "What is the minimum age to vote in Indian General Elections?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correct: 1,
    explanation: "The voting age in India was reduced from 21 to 18 years by the 61st Amendment Act of 1988."
  },
  {
    id: 2,
    question: "Which of these is NOT a permanent member of the ECI (Election Commission of India)?",
    options: ["Chief Election Commissioner", "Election Commissioner", "Regional Commissioner", "Voter ID Commissioner"],
    correct: 3,
    explanation: "The ECI consists of the CEC and two Election Commissioners. There is no such post as 'Voter ID Commissioner'."
  },
  {
    id: 3,
    question: "What does VVPAT stand for?",
    options: ["Voter Verified Paper Audit Trail", "Visual Voter Proof and Track", "Verified Vote Paper Account Tool", "Virtual Voter Paper Audit Trail"],
    correct: 0,
    explanation: "VVPAT allows voters to verify that their vote was cast correctly by showing a paper slip for 7 seconds."
  }
];

const FLASHCARDS = [
  {
    term: "Model Code of Conduct",
    definition: "A set of guidelines issued by the Election Commission of India for conduct of political parties and candidates during elections."
  },
  {
    term: "Universal Adult Suffrage",
    definition: "The right of all adult citizens to vote regardless of wealth, income, gender, social status, race, or ethnicity."
  },
  {
    term: "Electoral College (US)",
    definition: "A body of electors established by the United States Constitution, which forms every four years for the sole purpose of electing the president and vice president."
  }
];

export default function QuizPage() {
  const [activeTab, setActiveTab] = useState<"quiz" | "flashcards">("quiz");
  
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Flashcard State
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUIZ_DATA[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent -z-10" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />

      <main className="flex-1 max-w-7xl mx-auto px-6 pt-48 pb-24 w-full relative z-10">
        <section className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full mb-8">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Knowledge Arena</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white uppercase leading-[0.85]">
            Trivia <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Challenge.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl">
            Master the art of democracy through interactive challenges and rapid learning tools designed for the modern citizen.
          </p>
        </section>

        {/* Tabs Control */}
        <div className="flex justify-center md:justify-start mb-12">
          <div className="bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-2xl flex gap-2 border border-slate-200/50 dark:border-slate-800/50">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "quiz" 
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xl" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Interactive Quiz
            </button>
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "flashcards" 
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xl" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Flashcards
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-3xl mx-auto md:mx-0">
          {activeTab === "quiz" ? (
            <div className="bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-100 dark:border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {!isFinished ? (
                <>
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                      Phase {currentQuestion + 1} of {QUIZ_DATA.length}
                    </span>
                    <div className="flex gap-1">
                      {QUIZ_DATA.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === currentQuestion ? "w-8 bg-indigo-500" : i < currentQuestion ? "w-4 bg-emerald-500" : "w-4 bg-slate-200 dark:bg-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black mb-10 text-slate-900 dark:text-white leading-tight uppercase tracking-tight">
                    {QUIZ_DATA[currentQuestion].question}
                  </h2>

                  <div className="space-y-4 mb-10">
                    {QUIZ_DATA[currentQuestion].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        className={`w-full p-6 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between group ${
                          selectedOption === null 
                            ? "bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-500 hover:translate-x-2" 
                            : i === QUIZ_DATA[currentQuestion].correct
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600"
                              : selectedOption === i
                                ? "bg-red-500/10 border-red-500 text-red-600"
                                : "bg-white/30 dark:bg-slate-900/30 border-slate-100/30 dark:border-slate-800/30 opacity-50"
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${
                            selectedOption === null ? "bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white" : i === QUIZ_DATA[currentQuestion].correct ? "bg-emerald-500 text-white" : selectedOption === i ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800"
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-slate-800 dark:text-slate-200">{option}</span>
                        </span>
                        {selectedOption !== null && i === QUIZ_DATA[currentQuestion].correct && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        {selectedOption === i && i !== QUIZ_DATA[currentQuestion].correct && <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/50 mb-8">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {QUIZ_DATA[currentQuestion].explanation}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={nextQuestion}
                        className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-500/10"
                      >
                        {currentQuestion === QUIZ_DATA.length - 1 ? "Archive Results" : "Proceed to Next Phase"}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-10 animate-in zoom-in-95 duration-700">
                  <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/40 rotate-12">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Challenge <br/>Complete.</h2>
                  <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 font-medium">
                    Accuracy Rating: <span className="text-indigo-600 font-black">{Math.round((score / QUIZ_DATA.length) * 100)}%</span>
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-5 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" /> Reboot Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="perspective-1000">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full aspect-[4/3] cursor-pointer transition-all duration-1000 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[40px] border-4 border-indigo-100 dark:border-indigo-900/50 shadow-2xl flex flex-col items-center justify-center p-12 text-center">
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                    Protocol {currentCard + 1}
                  </div>
                  <Brain className="w-20 h-20 text-indigo-600 mb-8 opacity-20" />
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
                    {FLASHCARDS[currentCard].term}
                  </h3>
                  <p className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">
                    Interactive Pulse: Tap to Reveal
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-indigo-600 rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-12 text-center text-white">
                  <HelpCircle className="w-20 h-20 text-white/20 mb-8" />
                  <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8 tracking-tight">
                    {FLASHCARDS[currentCard].definition}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
                    Tap to Recede
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-8 mt-12">
                <button
                  disabled={currentCard === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentCard(prev => prev - 1);
                    setIsFlipped(false);
                  }}
                  className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-indigo-500 disabled:opacity-20 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                  {currentCard + 1} / {FLASHCARDS.length}
                </span>
                <button
                  disabled={currentCard === FLASHCARDS.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentCard(prev => prev + 1);
                    setIsFlipped(false);
                  }}
                  className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-indigo-500 disabled:opacity-20 transition-all shadow-lg"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
