"use client";

import { Bell, MoreVertical, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import clsx from "clsx";

const neuShadow =
  "shadow-[6px_6px_16px_rgba(0,0,0,0.08),-6px_-6px_16px_rgba(255,255,255,0.8)]";

const darkNeuShadow =
  "shadow-[6px_6px_16px_rgba(0,0,0,0.4),-6px_-6px_16px_rgba(255,255,255,0.05)]";

export function Header() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex items-center justify-between pt-4">
      <button
        className={clsx(
          "relative w-12 h-12 rounded-2xl backdrop-blur-lg flex items-center justify-center transition-transform active:scale-95",
          isDark
            ? "bg-white/5 border border-white/10 text-white"
            : "bg-white/60 text-gray-800",
          isDark ? darkNeuShadow : neuShadow
        )}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" strokeWidth={2} />
        <span
          className={clsx(
            "absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-500 ring-2",
            isDark ? "ring-white/20" : "ring-white/70"
          )}
        />
      </button>

      <h1
        className={clsx(
          "text-2xl font-semibold tracking-tight bg-clip-text text-transparent",
          isDark
            ? "bg-gradient-to-r from-white to-indigo-400"
            : "bg-gradient-to-r from-[#111827] to-[#6366f1]"
        )}
      >
        Wait<span className="font-bold">Less</span>
      </h1>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className={clsx(
            "w-12 h-12 rounded-2xl backdrop-blur-lg flex items-center justify-center transition-transform active:scale-95",
            isDark
              ? "bg-white/5 border border-white/10 text-white"
              : "bg-white/60 text-gray-800",
            isDark ? darkNeuShadow : neuShadow
          )}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5" strokeWidth={2} />
          ) : (
            <Moon className="w-5 h-5" strokeWidth={2} />
          )}
        </button>

        <button
          className={clsx(
            "w-12 h-12 rounded-2xl backdrop-blur-lg flex items-center justify-center transition-transform active:scale-95",
            isDark
              ? "bg-white/5 border border-white/10 text-white"
              : "bg-white/60 text-gray-800",
            isDark ? darkNeuShadow : neuShadow
          )}
          aria-label="Menu"
        >
          <MoreVertical className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
