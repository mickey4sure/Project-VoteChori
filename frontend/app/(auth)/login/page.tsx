"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { generateCitizenId } from "@/lib/identity";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: userCredential.user.uid,
          email: userCredential.user.email,
          citizenId: generateCitizenId(userCredential.user.uid),
        }),
      });

      router.push(redirectPath);
    } catch (err: any) {
      let message = "Invalid Credentials";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        message = "Incorrect email or password.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Account temporarily locked.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: result.user.uid,
          email: result.user.email,
          citizenId: generateCitizenId(result.user.uid),
        }),
      });
      router.push(redirectPath);
    } catch (err: any) {
      let message = "Google Login Failed";
      if (err.code === "auth/popup-closed-by-user") {
        message = "Login cancelled.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
              {t("auth.login_title")}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t("auth.login_subtitle")}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-500 px-4 py-2 rounded-lg text-sm text-center font-bold">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="text-slate-600 dark:text-slate-300 text-sm font-bold mb-1 block uppercase tracking-widest">{t("auth.email_label")}</label>
                <input
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm font-medium transition-all"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-300 text-sm font-bold mb-1 block uppercase tracking-widest">{t("auth.password_label")}</label>
                <input
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm font-medium transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 uppercase tracking-[0.2em] shadow-lg shadow-blue-500/25"
              >
                {loading ? t("auth.authenticating") : t("auth.signin_btn")}
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-slate-900 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                {t("auth.or_continue")}
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-4 px-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 font-black uppercase tracking-widest text-xs"
          >
            Google
          </button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
            {t("auth.no_account")}{" "}
            <Link href="/signup" className="font-black text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 uppercase tracking-tight">
              {t("nav.signup")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Initializing Auth...</div>}>
      <LoginContent />
    </Suspense>
  );
}