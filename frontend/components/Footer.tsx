"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Globe, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <ShieldAlert className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter dark:text-white uppercase">{t("nav.logo")}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-8">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t("footer.business")}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">contact@votechori.org</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t("footer.call")}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">+91 1800-ELECTIONS</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-8">{t("footer.address")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t("footer.india")}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{t("footer.hq")}<br />Connaught Place, Delhi 110001</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t("footer.rights")}
          </p>
          <div className="flex gap-8">
            <Link href="/faqs" className="text-xs font-black uppercase text-slate-400 hover:text-blue-600 transition-colors tracking-widest">FAQs</Link>
            <Link href="#" className="text-xs font-black uppercase text-slate-400 hover:text-blue-600 transition-colors tracking-widest">Privacy Policy</Link>
            <Link href="#" className="text-xs font-black uppercase text-slate-400 hover:text-blue-600 transition-colors tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
