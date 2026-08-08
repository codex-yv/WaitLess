"use client";

import { motion } from "framer-motion";
import { Building2, HeartPulse, Landmark, Scissors } from "lucide-react";
import { useState, useEffect } from "react";
import logo2 from "@/assets/logo2.png";

const cases = [
  {
    id: "banks",
    icon: Building2,
    title: "Banks",
    text: "Minimize lobby congestion by replacing physical queues with virtual waiting. Customers can sit comfortably and be notified when their turn approaches.",
  },
  {
    id: "hospitals",
    icon: HeartPulse,
    title: "Hospitals & Clinics",
    text: "Create calmer, less crowded waiting areas. Patients can track their queue status and arrive when it’s almost time for their appointment.",
  },
  {
    id: "governmentoffices",
    icon: Landmark,
    title: "Government Offices",
    text: "Give visitors the freedom to use their waiting time productively. They can step away, complete other tasks, and return when their turn is near.",
  },
  {
    id: "salonsstudios",
    icon: Scissors,
    title: "Salons & Studios",
    text: "No more sitting around waiting for your turn. Customers can join the queue remotely and leave home when it’s almost time to be served.",
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

          <div className="mt-8 flex justify-center">
            <img
              src={logo2.src || logo2}
              alt="WaitLess Logo"
              className="h-32 md:h-40 mt-30 w-auto object-contain scale-[3.2]"
            />
          </div>

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
              className={`rounded-2xl p-6 md:p-7 flex items-start gap-5 relative overflow-hidden transition-all duration-300 ${theme === "light"
                ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80 hover:-translate-y-1"
                : "glass hover:bg-white/[0.06] transition-colors"
                }`}
            >
              {/* Top edge highlight for light mode */}
              {theme === "light" && (
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-white/80 via-gray-200 to-white/80 pointer-events-none" />
              )}
              <div className={`w-12 h-12 shrink-0 rounded-xl grid place-items-center ${theme === "light"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
