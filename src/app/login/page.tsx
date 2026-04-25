"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Sun, Moon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Hydration-safe mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme sync — reads from <html> class set by Navbar
  useEffect(() => {
    if (!mounted) return;

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    // Check saved preference or system preference on first load
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Auto-focus email field on mount
  useEffect(() => {
    if (mounted && emailRef.current) {
      const timer = setTimeout(() => emailRef.current?.focus(), 800);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      data-testid="login-page"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#07070a]" : "bg-[#f5f6fa]"
      }`}
    >
      {/* ═══════════════════ BACKGROUND LAYER ═══════════════════ */}

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-blue-500/25 blur-[160px] login-blob-1" />
            <div className="absolute -bottom-48 -right-48 w-[800px] h-[800px] rounded-full bg-purple-500/20 blur-[180px] login-blob-2" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[120px] login-blob-3" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-[120px] login-blob-1" />
            <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-purple-400/15 blur-[140px] login-blob-2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[100px] login-blob-3" />
          </>
        )}
      </div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particle glow dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full login-particle login-particle-${i + 1} ${
              isDark ? "bg-blue-400/30" : "bg-blue-400/15"
            }`}
            style={{
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════ BRAND WATERMARK ═══════════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden"
      >
        <span
          className={`font-satoshi font-black tracking-tighter leading-[0.8] whitespace-nowrap
            text-[28vw] md:text-[22vw] lg:text-[19vw]
            bg-clip-text text-transparent translate-y-[18%] ${
              isDark
                ? "bg-[linear-gradient(180deg,rgba(96,165,250,0.22)_0%,rgba(192,132,252,0.14)_45%,rgba(34,211,238,0.05)_80%,transparent_100%)]"
                : "bg-[linear-gradient(180deg,rgba(59,130,246,0.15)_0%,rgba(168,85,247,0.12)_45%,rgba(34,211,238,0.08)_80%,transparent_100%)]"
            }`}
          style={{
            WebkitTextStroke: isDark
              ? "1px rgba(255,255,255,0.04)"
              : "1px rgba(0,0,0,0.02)",
          }}
        >
          WaitLess
        </span>
      </div>

      {/* ═══════════════════ THEME TOGGLE ═══════════════════ */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onClick={toggleTheme}
        data-testid="login-theme-toggle"
        className={`fixed top-6 right-6 z-50 p-2.5 rounded-xl transition-all duration-300 ${
          isDark
            ? "text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
        }`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* ═══════════════════ LOGIN CARD ═══════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Top radial light beam glow (dark mode only) */}
        {isDark && (
          <>
            {/* Radial glow above card — simulates overhead light source */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-[160px] h-[80px] pointer-events-none login-beam"
              style={{
                background: 'radial-gradient(ellipse, rgba(96,165,250,0.35), rgba(168,85,247,0.20) 50%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            {/* Sharp top edge highlight line */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
          </>
        )}

        <div
          data-testid="login-card"
          className={`relative rounded-2xl p-8 md:p-10 login-card-float ${
            isDark
              ? "backdrop-blur-xl border border-white/[0.08]"
              : "bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]"
          }`}
          style={isDark ? {
            background: 'rgba(255,255,255,0.04)',
            outline: '1px solid rgba(255,255,255,0.06)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.25)',    // sharp top highlight — glass edge
              'inset 0 0 20px rgba(255,255,255,0.04)',    // soft inner glow
              '0 30px 80px rgba(0,0,0,0.7)',              // deep depth shadow
              '0 2px 8px rgba(0,0,0,0.4)',                // close shadow for grounding
            ].join(', '),
          } : undefined}
        >
          {/* ── Directional light source (top-center radial glow inside card) ── */}
          {isDark && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              {/* Primary directional light */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.14), rgba(255,255,255,0.06) 40%, transparent 70%)',
                }}
              />
              {/* Glass refraction / surface sheen gradient */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)',
                }}
              />
              {/* Subtle brand-tinted highlight */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-28"
                style={{
                  background: 'radial-gradient(ellipse at center top, rgba(96,165,250,0.08), rgba(168,85,247,0.04) 60%, transparent 100%)',
                }}
              />
            </div>
          )}

          {/* ── Subtle grain / noise texture on card surface ── */}
          {isDark && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          {/* ─── Logo Icon ─── */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              {isDark && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400 blur-lg opacity-40" />
              )}
              <div
                className={`relative w-14 h-14 rounded-2xl grid place-items-center bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400 ${
                  isDark
                    ? "shadow-[0_8px_30px_rgba(157,76,221,0.4)]"
                    : "shadow-[0_6px_24px_rgba(157,76,221,0.3)]"
                }`}
              >
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          {/* ─── Heading ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1
              data-testid="login-heading"
              className={`font-satoshi text-3xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome back
            </h1>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-zinc-400" : "text-gray-500"
              }`}
            >
              Please enter your details to sign in.
            </p>
          </motion.div>

          {/* ─── Email Input ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div
              data-testid="login-email-wrapper"
              className={`relative rounded-xl transition-all duration-300 ${
                emailFocused
                  ? isDark
                    ? "shadow-[0_0_0_2px_rgba(96,165,250,0.3),0_0_20px_rgba(96,165,250,0.1)]"
                    : "shadow-[0_0_0_2px_rgba(59,130,246,0.25),0_0_20px_rgba(59,130,246,0.08)]"
                  : ""
              } ${
                isDark
                  ? "bg-white/[0.04] border border-white/[0.08]"
                  : "bg-white/80 border border-gray-200"
              }`}
            >
              <label
                htmlFor="login-email"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  emailFocused || email
                    ? `top-2 text-[10px] ${isDark ? "text-blue-400" : "text-blue-500"}`
                    : `top-1/2 -translate-y-1/2 text-sm ${isDark ? "text-zinc-500" : "text-gray-400"}`
                }`}
              >
                Email
              </label>
              <input
                ref={emailRef}
                id="login-email"
                data-testid="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full bg-transparent pt-6 pb-3 px-4 text-sm rounded-xl outline-none ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                autoComplete="email"
              />
            </div>
          </motion.div>

          {/* ─── Password Input ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="mt-3"
          >
            <div
              data-testid="login-password-wrapper"
              className={`relative rounded-xl transition-all duration-300 ${
                passwordFocused
                  ? isDark
                    ? "shadow-[0_0_0_2px_rgba(96,165,250,0.3),0_0_20px_rgba(96,165,250,0.1)]"
                    : "shadow-[0_0_0_2px_rgba(59,130,246,0.25),0_0_20px_rgba(59,130,246,0.08)]"
                  : ""
              } ${
                isDark
                  ? "bg-white/[0.04] border border-white/[0.08]"
                  : "bg-white/80 border border-gray-200"
              }`}
            >
              <label
                htmlFor="login-password"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  passwordFocused || password
                    ? `top-2 text-[10px] ${isDark ? "text-blue-400" : "text-blue-500"}`
                    : `top-1/2 -translate-y-1/2 text-sm ${isDark ? "text-zinc-500" : "text-gray-400"}`
                }`}
              >
                Password
              </label>
              <input
                id="login-password"
                data-testid="login-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full bg-transparent pt-6 pb-3 px-4 pr-14 text-sm rounded-xl outline-none ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                autoComplete="current-password"
              />
              <button
                data-testid="login-password-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg grid place-items-center transition-all duration-200 ${
                  isDark
                    ? "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06]"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* ─── Remember Me ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-4 flex items-center gap-2.5"
          >
            <button
              data-testid="login-remember-checkbox"
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 ${
                rememberMe
                  ? "bg-gradient-to-br from-blue-500 to-purple-500 border-transparent"
                  : isDark
                    ? "border-white/20 hover:border-white/40"
                    : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {rememberMe && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2.5 6L5 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </button>
            <span
              className={`text-sm ${
                isDark ? "text-zinc-400" : "text-gray-500"
              }`}
            >
              Remember me
            </span>
          </motion.div>

          {/* ─── Sign In Button ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
            className="mt-6"
          >
            <button
              data-testid="login-submit-btn"
              type="button"
              className="btn-primary w-full justify-center"
            >
              Sign in
            </button>
          </motion.div>

          {/* ─── Divider ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-4 my-6"
          >
            <div
              className={`flex-1 h-px ${
                isDark
                  ? "bg-gradient-to-r from-transparent to-white/10"
                  : "bg-gradient-to-r from-transparent to-gray-200"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                isDark ? "text-zinc-500" : "text-gray-400"
              }`}
            >
              OR
            </span>
            <div
              className={`flex-1 h-px ${
                isDark
                  ? "bg-gradient-to-l from-transparent to-white/10"
                  : "bg-gradient-to-l from-transparent to-gray-200"
              }`}
            />
          </motion.div>

          {/* ─── Social Login Buttons ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="space-y-3"
          >
            {/* Google */}
            <button
              data-testid="login-google-btn"
              onMouseEnter={() => setHoveredBtn("google")}
              onMouseLeave={() => setHoveredBtn(null)}
              className={`group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark
                  ? "bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                  : "bg-white/80 border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              }`}
            >
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
              <ArrowRight
                className={`w-4 h-4 ml-auto transition-all duration-300 ${
                  hoveredBtn === "google"
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-40"
                }`}
              />
            </button>

          </motion.div>

          {/* ─── Footer Text ─── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className={`mt-8 text-center text-sm ${
              isDark ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              data-testid="login-create-account-link"
              className="gradient-text font-medium hover:underline decoration-blue-400/50 underline-offset-2"
            >
              Create Account
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* ═══════════════════ BACK TO HOME ═══════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          data-testid="login-back-home"
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all duration-300 ${
            isDark
              ? "text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-satoshi font-bold tracking-tight">WaitLess</span>
        </Link>
      </motion.div>
    </div>
  );
}
