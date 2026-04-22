"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Rocket, BellRing, Timer, QrCode, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-testid="hero-section"
      className={`relative pt-32 pb-24 md:pt-36 md:pb-32 ${
        theme === "light" ? "bg-gradient-to-b from-white to-gray-50" : "aurora-bg"
      }`}
    >
      {/* Soft color blobs for vibrant light mode background */}
      {theme === "light" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-400/30 blur-[120px] opacity-40 animate-pulse-slow" />
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-purple-400/25 blur-[140px] opacity-40 animate-pulse-slow-delay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[100px] opacity-30" />
        </div>
      )}

      {/* Subtle noise texture overlay */}
      {theme === "light" && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      )}

      <div className={`absolute inset-0 ${theme === "light" ? "" : "grid-noise opacity-60"}`} />

      {/* Huge brand watermark */}
      <div
        data-testid="hero-brand-watermark"
        aria-hidden="true"
        className={`pointer-events-none select-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden ${
          theme === "light" ? "opacity-30" : ""
        }`}
      >
        <span
          className={`font-satoshi font-black tracking-tighter leading-[0.8] whitespace-nowrap
            text-[28vw] md:text-[22vw] lg:text-[19vw]
            bg-clip-text text-transparent translate-y-[18%] ${
              theme === "light"
                ? "bg-[linear-gradient(180deg,rgba(59,130,246,0.15)_0%,rgba(168,85,247,0.12)_45%,rgba(34,211,238,0.08)_80%,transparent_100%)]"
                : "bg-[linear-gradient(180deg,rgba(96,165,250,0.22)_0%,rgba(192,132,252,0.14)_45%,rgba(34,211,238,0.05)_80%,transparent_100%)]"
            }`}
          style={{ WebkitTextStroke: theme === "light" ? "1px rgba(0,0,0,0.02)" : "1px rgba(255,255,255,0.04)" }}
        >
          WaitLess
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            data-testid="hero-badge"
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs ${
              theme === "light"
                ? "bg-white/70 backdrop-blur-xl border border-white/40 text-gray-600 shadow-lg"
                : "glass text-zinc-300"
            }`}
          >
            <Rocket className={`w-3.5 h-3.5 ${theme === "light" ? "text-teal-600" : "text-teal-300"}`} />
            <span>No More Waiting Lines</span>
            <span className={theme === "light" ? "text-gray-400" : "text-zinc-500"}>•</span>
            <span className={theme === "light" ? "text-gray-500" : "text-zinc-400"}>v1.0 Launching Soon</span>
          </div>

          <h1
            data-testid="hero-headline"
            className={`font-satoshi mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] ${
              theme === "light" ? "text-gray-900" : ""
            }`}
          >
            Skip the Line.{" "}
            <span data-testid="hero-gradient-text" className="gradient-text">
              Own Your Time.
            </span>
          </h1>

          <p
            data-testid="hero-subheading"
            className={`mt-6 text-lg md:text-xl leading-relaxed max-w-xl ${
              theme === "light" ? "text-gray-700" : "text-zinc-400"
            }`}
          >
            Join queues digitally by scanning a QR code and get real-time
            updates while you do what matters.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#cta" data-testid="hero-get-started-btn" className={`btn-primary ${
              theme === "light" ? "shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" : ""
            }`}>
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              data-testid="hero-watch-demo-btn" 
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/80 backdrop-blur-md border border-white/40 shadow-md hover:bg-white hover:shadow-lg hover:scale-[1.02] text-gray-900"
                  : "btn-ghost"
              }`}
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Watch Demo
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <div className="flex -space-x-3">
              {[
                "https://i.pravatar.cc/48?img=12",
                "https://i.pravatar.cc/48?img=32",
                "https://i.pravatar.cc/48?img=45",
                "https://i.pravatar.cc/48?img=68",
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="user"
                  className={`w-9 h-9 rounded-full border-2 object-cover ${
                    theme === "light" ? "border-white" : "border-[#0a0a0f]"
                  }`}
                />
              ))}
            </div>
            <div>
              <div className={`flex items-center gap-1.5 text-sm ${
                theme === "light" ? "text-amber-500" : "text-amber-300"
              }`}>
                {"★★★★★"}
                <span className={`ml-2 ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>4.9 / 5</span>
              </div>
              <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
                Loved by 12,000+ early access customers
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <HeroVisual theme={theme} />
      </div>
    </section>
  );
}

function HeroVisual({ theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
      className="relative h-[520px] md:h-[580px]"
      data-testid="hero-visual"
    >
      {/* center phone mock */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative w-[280px] md:w-[300px] h-[480px] rounded-[38px] p-3 ${
          theme === "light"
            ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl"
            : "glass-strong shadow-[0_40px_90px_rgba(0,0,0,0.6)]"
        }`}>
          <div className={`absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full z-10 ${
            theme === "light"
              ? "bg-gray-900 border border-gray-300"
              : "bg-black/80 border border-white/10"
          }`} />
          <div className={`w-full h-full rounded-[28px] border overflow-hidden relative ${
            theme === "light"
              ? "bg-gradient-to-b from-gray-50 to-white border-gray-200"
              : "bg-gradient-to-b from-[#0b0b14] to-[#060608] border-white/10"
          }`}>
            {/* status */}
            <div className={`px-5 pt-6 flex items-center justify-between text-[10px] font-mono ${
              theme === "light" ? "text-gray-600" : "text-zinc-400"
            }`}>
              <span>9:41</span>
              <span className="tracking-wider">WAITLESS</span>
              <span>100%</span>
            </div>

            {/* queue card */}
            <div className={`mx-4 mt-6 rounded-2xl p-4 ${
              theme === "light"
                ? "bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-teal-100/50 border border-gray-200"
                : "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-teal-400/20 border border-white/10"
            }`}>
              <p className={`text-[10px] uppercase tracking-[0.2em] ${
                theme === "light" ? "text-gray-500" : "text-zinc-400"
              }`}>
                You're in queue
              </p>
              <div className="flex items-end gap-2 mt-2">
                <span className={`font-satoshi text-5xl font-bold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}>#3</span>
                <span className={`text-xs mb-2 ${
                  theme === "light" ? "text-gray-500" : "text-zinc-400"
                }`}>of 12 ahead</span>
              </div>
              <div className={`mt-3 h-1.5 w-full rounded-full overflow-hidden ${
                theme === "light" ? "bg-gray-200" : "bg-white/10"
              }`}>
                <div className="h-full w-[70%] bg-gradient-to-r from-blue-400 via-purple-400 to-teal-300 rounded-full" />
              </div>
              <p className={`mt-3 text-xs flex items-center gap-1.5 ${
                theme === "light" ? "text-gray-600" : "text-zinc-300"
              }`}>
                <Timer className="w-3 h-3" />
                Est. wait ~ 5 mins
              </p>
            </div>

            {/* list */}
            <div className="px-4 mt-4 space-y-2">
              {[
                { label: "Check-in complete", ok: true },
                { label: "Live queue position active", ok: true },
                { label: "Smart alert armed", ok: true },
              ].map((r) => (
                <div
                  key={r.label}
                  className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${
                    theme === "light"
                      ? "text-gray-700 bg-gray-100 border border-gray-200"
                      : "text-zinc-300 bg-white/[0.03] border border-white/5"
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${theme === "light" ? "text-teal-600" : "text-teal-300"}`} />
                  {r.label}
                </div>
              ))}
            </div>

            {/* glow */}
            <div className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
              theme === "light" ? "bg-blue-400/20" : "bg-purple-500/30"
            }`} />
          </div>
        </div>
      </div>

      {/* floating card: QR */}
      <motion.div
        className={`absolute top-4 -left-2 md:left-[-20px] rounded-2xl p-3 w-[160px] float-soft ${
          theme === "light"
            ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300"
            : "glass"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={`flex items-center gap-2 text-xs ${
          theme === "light" ? "text-gray-600" : "text-zinc-300"
        }`}>
          <QrCode className={`w-4 h-4 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`} />
          Scan to join
        </div>
        <div className="mt-2 aspect-square bg-white rounded-md p-1.5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(#0a0a0f 35%, transparent 36%), linear-gradient(#0a0a0f 25%, transparent 25% 50%, #0a0a0f 50% 75%, transparent 75%), linear-gradient(90deg, #0a0a0f 25%, transparent 25% 50%, #0a0a0f 50% 75%, transparent 75%)",
              backgroundSize: "8px 8px, 12px 12px, 12px 12px",
            }}
          />
        </div>
        <p className={`mt-2 text-[10px] font-mono ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>#WAITLESS-Q23</p>
      </motion.div>

      {/* floating card: notification */}
      <motion.div
        className={`absolute top-14 right-0 md:right-[-10px] rounded-2xl p-3 w-[210px] float-soft-delay ${
          theme === "light"
            ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300"
            : "glass"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-teal-400/40 pulse-ring" />
            <div className="relative w-8 h-8 grid place-items-center rounded-full bg-gradient-to-br from-teal-400 to-blue-500">
              <BellRing className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <p className={`text-xs font-medium ${theme === "light" ? "text-gray-900" : ""}`}>You're up next</p>
            <p className={`text-[10px] ${theme === "light" ? "text-gray-500" : "text-zinc-400"}`}>Counter 4 • 2 min away</p>
          </div>
        </div>
      </motion.div>

      {/* floating card: eta */}
      <motion.div
        className={`absolute bottom-6 -left-2 md:left-2 rounded-2xl p-3 w-[200px] float-soft-slow ${
          theme === "light"
            ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300"
            : "glass"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <p className={`text-[10px] uppercase tracking-[0.2em] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
          Live ETA
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={`font-satoshi text-3xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>05:23</span>
          <span className={`text-xs ${theme === "light" ? "text-gray-500" : "text-zinc-400"}`}>min</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-sm ${
                i < 7
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : theme === "light" ? "bg-gray-200" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* floating card: people served */}
      <motion.div
        className={`absolute bottom-8 right-0 md:right-[-10px] rounded-2xl p-3 w-[180px] float-soft ${
          theme === "light"
            ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300"
            : "glass"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <p className={`text-[10px] uppercase tracking-[0.2em] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
          Time saved today
        </p>
        <div className={`mt-1 font-satoshi text-2xl font-bold ${theme === "light" ? "text-gray-900" : ""}`}>2h 41m</div>
        <p className={`text-[10px] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>vs. standing in line</p>
      </motion.div>
    </motion.div>
  );
}
