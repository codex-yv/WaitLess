"use client";

import { LogOut, ArrowLeftRight, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import clsx from "clsx";

interface ActionButtonsProps {
  onLeaveQueue?: () => void;
  isLeaving?: boolean;
}

export function ActionButtons({ onLeaveQueue, isLeaving }: ActionButtonsProps) {
  const { isDark } = useTheme();

  return (
    <div className="mt-8 flex flex-col gap-3">
      <button
        onClick={onLeaveQueue}
        disabled={isLeaving}
        className={clsx(
          "w-full py-4 rounded-2xl text-white font-medium flex items-center justify-center gap-2 transition-transform active:scale-95 duration-300 disabled:opacity-50 cursor-pointer",
          isDark
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_10px_40px_rgba(99,102,241,0.6)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)]"
            : "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
        )}
      >
        {isLeaving ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <LogOut className="w-5 h-5" strokeWidth={2} />
        )}
        <span>{isLeaving ? "Leaving..." : "Leave Queue"}</span>
      </button>

      <button
        className={clsx(
          "w-full py-4 rounded-2xl border font-medium flex items-center justify-center gap-2 transition-transform active:scale-95 duration-300 backdrop-blur-lg",
          isDark
            ? "border-indigo-400/40 text-indigo-400 bg-white/5"
            : "border-indigo-300 text-indigo-500 bg-white/60"
        )}
      >
        <ArrowLeftRight className="w-5 h-5" strokeWidth={2} />
        <span>Swap Position</span>
      </button>
    </div>
  );
}
