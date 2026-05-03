"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ChevronDown,
  Monitor,
  LogOut,
  Settings,
  LifeBuoy,
  UserPlus,
  Languages,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English",  native: "English"  },
  { code: "hi", label: "Hindi",    native: "हिन्दी"   },
  { code: "bn", label: "Bengali",  native: "বাংলা"    },
  { code: "te", label: "Telugu",   native: "తెలుగు"   },
  { code: "mr", label: "Marathi",  native: "मराठी"    },
  { code: "ta", label: "Tamil",    native: "தமிழ்"    },
];

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const { language, setLanguage, t }  = useLanguage();
  const { theme, setTheme }           = useTheme();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu,    setShowLangMenu]    = useState(false);
  const [showThemeMenu,   setShowThemeMenu]   = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef    = useRef<HTMLDivElement>(null);
  const themeMenuRef   = useRef<HTMLDivElement>(null);

  // Close all menus when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" aria-label="Project-VoteChori Home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <ShieldAlert className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter dark:text-white uppercase">
            Project-VoteChori
          </span>
        </Link>

        {/* ── Nav Links ── */}
        <div className="flex-1 justify-center hidden lg:flex gap-1">
          {[
            { href: "/",          label: "Home"     },
            { href: "/timeline",  label: "Timeline" },
            { href: "/booth",     label: "Booth"    },
            { href: "/modules",   label: "Modules"  },
            { href: "/quiz",      label: "Trivia"   },
            { href: "/calendar",  label: "Calendar" },
            { href: "/faqs",      label: "FAQs"     },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-2">

          {/* Theme Switcher */}
          <div className="relative" ref={themeMenuRef}>
            <button
              id="theme-switcher-btn"
              aria-haspopup="true"
              aria-expanded={showThemeMenu}
              aria-label={t("nav.theme")}
              onClick={() => {
                setShowThemeMenu((v) => !v);
                setShowLangMenu(false);
                setShowProfileMenu(false);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            >
              {theme === "dark"  ? <Moon  className="w-4 h-4 text-blue-400"   /> :
               theme === "light" ? <Sun   className="w-4 h-4 text-amber-500" /> :
                                   <Monitor className="w-4 h-4 text-slate-500" />}
            </button>

            {showThemeMenu && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                {[
                  { id: "light",  label: "Light",  Icon: Sun,     color: "text-amber-500" },
                  { id: "dark",   label: "Dark",   Icon: Moon,    color: "text-blue-400"  },
                  { id: "system", label: "System", Icon: Monitor, color: "text-slate-500" },
                ].map(({ id, label, Icon, color }) => (
                  <button
                    key={id}
                    onClick={() => { setTheme(id as any); setShowThemeMenu(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      theme === id
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative" ref={langMenuRef}>
            <button
              id="language-switcher-btn"
              aria-haspopup="true"
              aria-expanded={showLangMenu}
              aria-label={t("nav.lang_select")}
              onClick={() => {
                setShowLangMenu((v) => !v);
                setShowProfileMenu(false);
                setShowThemeMenu(false);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-2"
            >
              <Languages className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-[10px] font-bold uppercase dark:text-slate-300 hidden sm:block">
                {activeLang.code}
              </span>
            </button>

            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 px-3 pt-1 pb-2">
                  Select Language
                </p>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    id={`lang-option-${lang.code}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      language === lang.code
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex flex-col items-start leading-tight">
                      <span>{lang.label}</span>
                      <span className="text-[10px] opacity-60">{lang.native}</span>
                    </span>
                    {language === lang.code && (
                      <Check className="w-3.5 h-3.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-blue-100 dark:border-blue-800/50"
          >
            Dashboard
          </Link>

          {/* Auth */}
          {loading ? (
            <div className="w-[120px] h-10 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
          ) : user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                id="profile-menu-btn"
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
                aria-label={t("nav.profile")}
                onClick={() => {
                  setShowProfileMenu((v) => !v);
                  setShowLangMenu(false);
                  setShowThemeMenu(false);
                }}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.displayName?.[0] || user.email?.[0].toUpperCase()
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate max-w-[100px]">
                    {user.displayName || "Explorer"}
                  </span>
                  <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-2 z-50">
                  <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] mb-1">Authenticated Account</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/login?redirect=/"
                    className="px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-blue-500" />
                    {t("nav.switch_account")}
                  </Link>

                  <button className="px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full text-left">
                    <Settings className="w-4 h-4 text-slate-400" />
                    {t("nav.settings")}
                  </button>

                  <button className="px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full text-left">
                    <LifeBuoy className="w-4 h-4 text-slate-400" />
                    {t("nav.support")}
                  </button>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />

                  <button
                    onClick={() => signOut()}
                    className="px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("nav.signout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors uppercase tracking-widest"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all uppercase tracking-widest"
              >
                {t("nav.signup")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
