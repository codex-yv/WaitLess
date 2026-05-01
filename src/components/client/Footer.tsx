"use client";

import { ShieldCheck } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import clsx from "clsx";

export function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className="mt-6 pb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "w-10 h-10 rounded-xl backdrop-blur flex items-center justify-center",
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-indigo-50/80"
          )}
        >
          <ShieldCheck
            className={clsx(
              "w-5 h-5",
              isDark ? "text-indigo-400" : "text-indigo-400"
            )}
            strokeWidth={1.75}
          />
        </div>
        <div
          className={clsx(
            "text-xs leading-snug",
            isDark ? "text-gray-400" : "text-gray-500"
          )}
        >
          <p>We respect your time.</p>
          <p>Live updates keep you informed.</p>
        </div>
      </div>
      <div
        className={clsx(
          "flex items-center gap-2 text-sm font-medium",
          isDark ? "text-green-400" : "text-green-500"
        )}
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
        </span>
        Live
      </div>
    </footer>
  );
}
