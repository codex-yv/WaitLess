"use client";

import { motion } from "framer-motion";
import { Building2, HeartPulse, Landmark, Scissors } from "lucide-react";
import { useState, useEffect } from "react";

const cases = [
  {
    id: "banks",
    icon: Building2,
    title: "Banks",
    text: "Eliminate lobby congestion. Customers join from the parking lot, the café, or from home.",
    stat: "-48%",
    statLabel: "avg. branch wait",
  },
  {
    id: "hospitals",
    icon: HeartPulse,
    title: "Hospitals & Clinics",
    text: "Reduce crowded waiting rooms. Patients arrive just in time for their turn — safer and calmer.",
    stat: "+3.2x",
    statLabel: "rooms throughput",
  },
  {
    id: "governmentoffices",
    icon: Landmark,
    title: "Government Offices",
    text: "Modernize counter services with a friction-free digital token system that works on any phone.",
    stat: "62%",
    statLabel: "fewer walk-outs",
  },
  {
    id: "salonsstudios",
    icon: Scissors,
    title: "Salons & Studios",
    text: "Walk-in magic without the chaos. Clients get a live ETA and you stay fully booked.",
    stat: "4.9",
    statLabel: "customer CSAT",
  },
];

export default function UseCases() {
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
      id="use-cases"
      data-testid="use-cases-section"
      className="relative py-28 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14">
        <div className="lg:sticky lg:top-28 self-start">
          <p className={`text-xs uppercase tracking-[0.3em] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
            Built for every waiting room
          </p>
          <h2 className={`font-satoshi mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight ${theme === "light" ? "text-gray-900" : ""}`}>
            Wherever people queue,
            <br />
            <span className="gradient-text">WaitLess belongs.</span>
          </h2>
          <p className={`mt-5 text-lg ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
            From front-desk chaos to calm, choreographed flow — the same
            platform adapts to your world in minutes.
          </p>
          <a
            href="#cta"
            data-testid="usecase-cta"
            className="btn-ghost mt-7 inline-flex"
          >
            Bring WaitLess to your business
          </a>
        </div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-testid={`usecase-${c.id}`}
              className={`rounded-2xl p-6 md:p-7 flex items-start gap-5 relative overflow-hidden transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80 hover:-translate-y-1"
                  : "glass hover:bg-white/[0.06] transition-colors"
              }`}
            >
              {/* Top edge highlight for light mode */}
              {theme === "light" && (
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-white/80 via-gray-200 to-white/80 pointer-events-none" />
              )}
              <div className={`w-12 h-12 shrink-0 rounded-xl grid place-items-center ${
                theme === "light"
                  ? "bg-gradient-to-br from-blue-400/40 to-purple-400/30 border border-gray-300"
                  : "bg-gradient-to-br from-blue-500/25 via-purple-500/25 to-teal-400/25 border border-white/10"
              }`}>
                <c.icon className={`w-5 h-5 ${theme === "light" ? "text-gray-900" : "text-white"}`} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h3 className={`font-satoshi text-xl font-semibold ${theme === "light" ? "text-gray-900" : ""}`}>{c.title}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${theme === "light" ? "text-gray-600" : "text-zinc-400"}`}>
                  {c.text}
                </p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <div className={`font-satoshi font-bold text-2xl gradient-text ${theme === "light" ? "text-gray-900" : ""}`}>
                  {c.stat}
                </div>
                <div className={`text-[10px] uppercase tracking-wider ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
                  {c.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
