"use client";

import { motion } from "framer-motion";
import {
  QrCode,
  BellRing,
  MapPin,
  Sparkles,
  Activity,
  Smartphone,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Features() {
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
      id="features"
      data-testid="features-section"
      className="relative py-28"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <p className={`text-xs uppercase tracking-[0.3em] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
            How it works
          </p>
          <h2 className={`font-satoshi mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight ${theme === "light" ? "text-gray-900" : ""}`}>
            Waiting, reimagined <br />
            <span className="gradient-text">end to end.</span>
          </h2>
          <p className={`mt-5 text-lg ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
            Four small steps and one big outcome — your customers never stand
            in line again.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[260px]">
          {/* Scan & Join - spans 2 */}
          <BentoCard className="md:col-span-2 md:row-span-1" testId="feature-scan" theme={theme}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 h-full">
              <div className={`relative w-28 h-28 shrink-0 rounded-2xl grid place-items-center ${theme === "light"
                ? "bg-gradient-to-br from-blue-400/40 to-purple-400/30 border border-gray-300"
                : "bg-gradient-to-br from-blue-500/30 to-purple-500/20 border border-white/10"
                }`}>
                <QrCode className={`w-12 h-12 ${theme === "light" ? "text-gray-900" : "text-white"}`} strokeWidth={1.4} />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-teal-400 animate-pulse" />
              </div>
              <div>
                <h3 className={`font-satoshi text-2xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
                  Scan &amp; join in seconds
                </h3>
                <p className={`mt-2 leading-relaxed ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
                  Point your camera at the QR code, fill a one-screen form,
                  and you're in. No apps, no downloads, no account hoops.
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard testId="feature-realtime" theme={theme}>
            <Activity className={`w-7 h-7 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`} />
            <h3 className={`font-satoshi mt-5 text-xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
              Real-time position
            </h3>
            <p className={`mt-2 text-sm ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
              Watch your place in line update live — with ETA to the minute.
            </p>
            <div className="mt-6 space-y-2">
              {["#3 · You", "#4 · Ibrahim", "#5 · Priya"].map((t, i) => (
                <div
                  key={t}
                  className={`text-xs px-3 py-1.5 rounded-md border ${theme === "light"
                    ? i === 0
                      ? "bg-blue-100 border-blue-200 text-gray-900"
                      : "bg-gray-100 border-gray-200 text-gray-600"
                    : i === 0
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white/[0.02] border-white/5 text-zinc-500"
                    }`}
                >
                  {t}
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard testId="feature-anywhere" theme={theme}>
            <MapPin className={`w-7 h-7 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`} />
            <h3 className={`font-satoshi mt-5 text-xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
              Wait anywhere
            </h3>
            <p className={`mt-2 text-sm ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
              Grab a coffee, take a walk, finish an errand — we'll notify you
              when it's your turn.
            </p>
          </BentoCard>

          <BentoCard className="md:col-span-2" testId="feature-alerts" theme={theme}>
            <div className="flex flex-col md:flex-row items-start gap-6 h-full">
              <div>
                <BellRing className={`w-7 h-7 ${theme === "light" ? "text-teal-600" : "text-teal-300"}`} />
                <h3 className={`font-satoshi mt-5 text-2xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
                  Smart alerts that never miss
                </h3>
                <p className={`mt-2 max-w-md ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
                  Tiered notifications — SMS, WhatsApp, push — nudge you at
                  exactly the right moment so you arrive just-in-time.
                </p>
                <div className={`mt-6 flex items-center gap-2 text-xs ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Our geo-aware smart alert system dynamically notifies <br />
                  users based on their real-time distance from the service location.
                </div>
              </div>
              <div className="flex-1 w-full mt-2 md:mt-0 grid grid-cols-1 gap-2">
                {[
                  { label: "10 min out — Wrap up", color: "from-blue-400 to-blue-600" },
                  { label: "5 min out — Head back", color: "from-purple-400 to-purple-600" },
                  { label: "You're up — Counter 4", color: "from-teal-400 to-teal-600" },
                ].map((a) => (
                  <div
                    key={a.label}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${theme === "light"
                      ? "bg-gray-100 border border-gray-200"
                      : "bg-white/[0.03] border border-white/5"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.color} grid place-items-center`}
                    >
                      <BellRing className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm ${theme === "light" ? "text-gray-700" : "text-zinc-200"}`}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard testId="feature-ops" theme={theme}>
            <Sparkles className={`w-7 h-7 ${theme === "light" ? "text-amber-600" : "text-amber-300"}`} />
            <h3 className={`font-satoshi mt-5 text-xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
              Ops dashboard
            </h3>
            <p className={`mt-2 text-sm ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
              Staff get a clean console to call-next, pause, and reassign —
              with live wait-time analytics.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { v: "133", l: "Completed" },
                { v: "13", l: "Cancelled" },
                { v: "7", l: "Skipped" },
              ].map((s) => (
                <div
                  key={s.l}
                  className={`rounded-lg py-2 ${theme === "light"
                    ? "bg-gray-100 border border-gray-200"
                    : "bg-white/[0.03] border border-white/5"
                    }`}
                >
                  <div className={`font-satoshi font-bold text-lg ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    {s.v}
                  </div>
                  <div className={`text-[10px] uppercase tracking-wider ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard testId="feature-integrations" theme={theme}>
            <Smartphone className={`w-7 h-7 ${theme === "light" ? "text-pink-600" : "text-pink-300"}`} />
            <h3 className={`font-satoshi mt-5 text-xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>
              Zero-friction entry
            </h3>
            <p className={`mt-2 text-sm ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
              Web-first PWA works on every phone. No app store. No storage.
              No friction.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ className = "", children, testId, theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-testid={testId}
      className={`rounded-2xl p-6 md:p-7 group relative overflow-hidden transition-all duration-300 ${theme === "light"
        ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80 hover:-translate-y-1"
        : "glass hover:-translate-y-1 hover:bg-white/[0.06]"
        } ${className}`}
    >
      {/* Top edge highlight for light mode - simulates light hitting glass */}
      {theme === "light" && (
        <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-white/80 via-gray-200 to-white/80 pointer-events-none" />
      )}

      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${theme === "light" ? "bg-purple-400/10" : ""
        }`}>
        <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl ${theme === "light" ? "bg-purple-400/20" : "bg-purple-500/20"
          }`} />
      </div>
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
