"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type Language = "en" | "hi" | "bn" | "te" | "mr" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navbar
    "nav.logo": "Project-VoteChori",
    "nav.dashboard": "My Dashboard",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.switch_account": "Switch Account",
    "nav.settings": "Account Settings",
    "nav.support": "Help & Support",
    "nav.signout": "Sign Out",
    "nav.lang_select": "Select Language",
    "nav.profile": "Profile Menu",
    "nav.theme": "Theme Menu",
    "nav.lang_en": "English",
    "nav.lang_hi": "Hindi (हिन्दी)",
    "nav.lang_bn": "Bengali (বাংলা)",
    "nav.lang_te": "Telugu (తెలుగు)",
    "nav.lang_mr": "Marathi (मराठी)",
    "nav.lang_ta": "Tamil (தமிழ்)",

    // Hero
    "hero.status": "System Live & Monitoring",
    "hero.title": "Securing Democracy Through Intelligence.",
    "hero.subtitle":
      "A next-generation electoral monitoring platform. Verify rumors with AI, track live voting phases, and simulate automated registration protocols in real-time.",
    "hero.cta": "Access Command Center",

    // Education Hub
    "edu.title": "Voter Education Hub",
    "edu.subtitle":
      "Empowering you to vote with absolute confidence. Explore key milestones, practice standard procedures, and ensure you are ballot-ready.",
    "edu.timeline_title": "Interactive Timeline",
    "edu.timeline_desc":
      "Follow the multi-stage path candidates take from caucuses to the inauguration.",
    "edu.timeline_cta": "Launch Timeline",
    "edu.booth_title": "Practice Voting",
    "edu.booth_desc":
      "Fill out interactive mock ballots safely including ranked-choice voting tools.",
    "edu.booth_cta": "Enter Booth",
    "edu.checklist_title": "Voter Checklist",
    "edu.checklist_desc":
      "Make sure you have registration, deadlines, and appropriate identification secured.",
    "edu.checklist_cta": "Prepare My Vote",
    "edu.quiz_title": "Knowledge Check",
    "edu.quiz_desc":
      "Put your understanding of swing states and electoral processes to the test!",
    "edu.quiz_cta": "Begin Trivia",

    // Calendar
    "cal.title": "The Election Chronicle",
    "cal.subtitle": "Sync your personal schedule with official national deadlines. Stay ahead of the process with AI-driven intelligence updates.",
    "cal.intel": "Live Electoral Intelligence",
    "cal.clock": "Global Election Clock",
    "cal.days": "Days",
    "cal.hrs": "Hrs",
    "cal.mins": "Mins",
    "cal.registry": "Your Registry",
    "cal.sync_new": "Sync New Entry",
    "cal.commit": "Commit to Schedule",
    "cal.briefing": "AI Daily Briefing",
    "cal.intel_btn": "Get Detailed Intel",
    "cal.note": "Note",
    "cal.reminder": "Reminder",
    "cal.type": "Entry Type",
    "cal.title_label": "Title",
    "cal.date_label": "Date",
    "cal.desc_label": "Description",
    "cal.cancel": "Cancel",
    "cal.clear_schedule": "Clear Schedule",

    // Footer
    "footer.desc":
      "Equip your constituency with the most comprehensive election monitoring platform, supported by AI and human intelligence.",
    "footer.contact": "Contact with us:",
    "footer.business": "For Business Inquiry:",
    "footer.call": "Call:",
    "footer.address": "Corporate Address:",
    "footer.india": "India:",
    "footer.hq": "New Delhi HQ:",
    "footer.rights": "2026 © All rights reserved by Project-VoteChori",

    // Auth
    "auth.login_title": "Welcome Back",
    "auth.login_subtitle": "Securely access the VoteChori Command Center",
    "auth.signup_title": "Create Account",
    "auth.signup_subtitle": "Join the next generation of electoral monitoring",
    "auth.email_label": "Email Address",
    "auth.password_label": "Password",
    "auth.confirm_password_label": "Confirm Password",
    "auth.signin_btn": "Sign In",
    "auth.signup_btn": "Sign Up",
    "auth.authenticating": "Authenticating...",
    "auth.creating_account": "Creating Account...",
    "auth.or_continue": "Or continue with",
    "auth.no_account": "Don't have an account?",
    "auth.have_account": "Already have an account?",
  },
};

// ─── Cookie helpers ──────────────────────────────────────────────────────────

/** Read the current value of a cookie by name. */
function getCookieValue(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : "";
}

/**
 * Write (or delete) the `googtrans` cookie.
 * We deliberately do NOT set a domain so the cookie works on localhost AND
 * production without needing a subdomain prefix.
 */
function writeGoogTransCookie(lang: Language) {
  if (typeof document === "undefined") return;

  const domain = window.location.hostname;
  const isEn = lang === "en";
  const value = isEn ? "" : `/en/${lang}`;
  const date = isEn ? "Thu, 01 Jan 1970 00:00:00 UTC" : "";
  const expires = date ? `; expires=${date}` : "";

  // Set the cookie for both the root path and the domain variants
  document.cookie = `googtrans=${value}; path=/; SameSite=Lax${expires}`;
  
  if (domain !== "localhost") {
    document.cookie = `googtrans=${value}; path=/; domain=.${domain}; SameSite=Lax${expires}`;
    document.cookie = `googtrans=${value}; path=/; domain=${domain}; SameSite=Lax${expires}`;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const pathname = usePathname();

  // On mount: sync React state with whatever language is persisted in localStorage,
  // and ensure the googtrans cookie matches.  If it doesn't, reload once.
  useEffect(() => {
    const saved = (localStorage.getItem("app_lang") as Language) || "en";
    setLanguageState(saved);

    const currentCookie = getCookieValue("googtrans");
    const expectedCookie = saved === "en" ? "" : `/en/${saved}`;

    if (currentCookie !== expectedCookie) {
      writeGoogTransCookie(saved);
      window.location.reload();
    }
  }, []);

  // ── SPA Navigation Fix ───────────────────────────────────────────────────
  // When the pathname changes (user navigated), ensure the translation is
  // re-triggered for the new content if a language is selected.
  useEffect(() => {
    const saved = (localStorage.getItem("app_lang") as Language) || "en";
    if (saved !== "en") {
      // Re-write cookie just in case it was cleared or needs refreshing
      writeGoogTransCookie(saved);
      
      // If the Google Translate script is loaded, we can try to nudge it.
      // Most of the time, Google Translate's MutationObserver handles this,
      // but if not, this ensures the cookie is there for the next cycle.
      if (typeof window !== 'undefined' && (window as any).googleTranslateElementInit) {
        // Optional: you could call the init function again, but it's risky.
        // The most reliable way for "Full Web App" is to let the observer work.
      }
    }
  }, [pathname]);

  /** Called by the Navbar language switcher. */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
    writeGoogTransCookie(lang);
    // Tiny delay before reload to ensure cookies/localStorage are flushed
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  /**
   * `t()` always returns English strings from our map.
   * Google Translate's DOM-level script handles the actual in-browser translation.
   */
  const t = (key: string): string => translations["en"][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
