"use client";

import { User } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/contexts/ThemeContext";

interface QueueCardProps {
  label: string;
  number: number;
  variant: "serving" | "you";
}

export function QueueCard({ label, number, variant }: QueueCardProps) {
  const { isDark } = useTheme();
  const isServing = variant === "serving";

  return (
    <div
      className={clsx(
        "backdrop-blur-xl rounded-2xl px-5 py-3 min-w-[150px]",
        isDark
          ? "bg-white/5 border-white/10 shadow-[0_0_25px_rgba(99,102,241,0.15)] border"
          : "bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        isServing &&
          isDark &&
          "border-green-400/30 shadow-[0_0_25px_rgba(74,222,128,0.2)]",
        !isServing &&
          isDark &&
          "border-indigo-400/30 shadow-[0_0_25px_rgba(99,102,241,0.2)]"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            className={clsx(
              "text-sm font-medium",
              isServing
                ? isDark
                  ? "text-green-400"
                  : "text-green-600"
                : isDark
                ? "text-indigo-400"
                : "text-indigo-500"
            )}
          >
            {label}
          </p>
          <p
            className={clsx(
              "text-3xl font-bold leading-tight mt-1",
              isServing
                ? isDark
                  ? "text-green-400"
                  : "text-green-500"
                : isDark
                ? "text-indigo-400"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
            )}
          >
            {number}
          </p>
        </div>
        <User
          className={clsx(
            "w-5 h-5 self-end mb-1",
            isServing
              ? isDark
                ? "text-green-400"
                : "text-green-400"
              : isDark
              ? "text-indigo-400"
              : "text-indigo-400"
          )}
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}
