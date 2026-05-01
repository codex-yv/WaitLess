'use client';

import { Flag } from "lucide-react";
import { motion } from "framer-motion";
import { QueueCard } from "./QueueCard";
import { ProgressCard } from "./ProgressCard";
import { useTheme } from "@/contexts/ThemeContext";
import clsx from "clsx";

function NumberNode({ n }: { n: number }) {
  const { isDark } = useTheme();

  return (
    <div
      className={clsx(
        "relative z-10 mx-auto w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center text-xs font-medium border",
        isDark
          ? "bg-white/5 text-gray-400 border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]"
          : "bg-white/70 text-gray-500 border-white/60 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
      )}
    >
      {n}
    </div>
  );
}

function Dots() {
  const { isDark } = useTheme();

  return (
    <div className="relative z-10 flex flex-col items-center gap-1 py-1">
      <span
        className={clsx("w-1 h-1 rounded-full", isDark ? "bg-white/20" : "bg-gray-300")}
      />
      <span
        className={clsx("w-1 h-1 rounded-full", isDark ? "bg-white/20" : "bg-gray-300")}
      />
      <span
        className={clsx("w-1 h-1 rounded-full", isDark ? "bg-white/20" : "bg-gray-300")}
      />
    </div>
  );
}

export function Timeline() {
  const { isDark } = useTheme();

  return (
    <div className="relative mt-8">
      {/* Vertical center line */}
      <div
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px]",
          isDark
            ? "bg-gradient-to-b from-white/20 to-white/5"
            : "bg-gradient-to-b from-transparent via-gray-300/70 to-transparent"
        )}
      />

      <div className="relative flex flex-col items-stretch gap-4">
        {/* Now Serving row */}
        <div className="relative grid grid-cols-2 items-center">
          <div />
          <div className="flex items-center pl-8">
            {/* connector */}
            <div
              className={clsx(
                "w-8 h-[2px] -ml-8",
                isDark ? "bg-white/20" : "bg-gray-300/70"
              )}
            />
            <QueueCard label="Now Serving" number={3} variant="serving" />
          </div>
          {/* Concentric green node: outer ring + inner solid */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{
                boxShadow: isDark
                  ? [
                      "0 0 30px rgba(74,222,128,0.8)",
                      "0 0 40px rgba(74,222,128,1)",
                      "0 0 30px rgba(74,222,128,0.8)",
                    ]
                  : [
                      "0 0 14px rgba(34,197,94,0.5)",
                      "0 0 26px rgba(34,197,94,0.75)",
                      "0 0 14px rgba(34,197,94,0.5)",
                    ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className={clsx(
                "w-7 h-7 rounded-full border-2 flex items-center justify-center",
                isDark
                  ? "border-green-400/30 bg-green-400/20 shadow-[0_0_30px_rgba(74,222,128,0.8)]"
                  : "border-green-500/70 bg-green-100"
              )}
            >
              <span
                className={clsx(
                  "rounded-full",
                  isDark ? "w-3.5 h-3.5 bg-green-400" : "w-3.5 h-3.5 bg-green-500"
                )}
              />
            </motion.div>
          </div>
        </div>

        <NumberNode n={4} />
        <NumberNode n={5} />
        <NumberNode n={6} />
        <Dots />

        {/* You row with progress card on left */}
        <div className="relative grid grid-cols-2 items-center mt-1">
          <div className="flex justify-start">
            <ProgressCard />
          </div>
          <div className="flex items-center pl-8">
            <div
              className={clsx(
                "w-8 h-[2px] -ml-8",
                isDark ? "bg-white/20" : "bg-gray-300/70"
              )}
            />
            <QueueCard label="You" number={43} variant="you" />
          </div>
          {/* Concentric indigo node: outer ring + inner solid */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{
                boxShadow: isDark
                  ? [
                      "0 0 30px rgba(99,102,241,0.8)",
                      "0 0 40px rgba(99,102,241,1)",
                      "0 0 30px rgba(99,102,241,0.8)",
                    ]
                  : [
                      "0 0 14px rgba(99,102,241,0.55)",
                      "0 0 28px rgba(99,102,241,0.85)",
                      "0 0 14px rgba(99,102,241,0.55)",
                    ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className={clsx(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center",
                isDark
                  ? "border-indigo-400/30 bg-indigo-400/20 shadow-[0_0_30px_rgba(99,102,241,0.8)]"
                  : "border-indigo-500/70 bg-indigo-100"
              )}
            >
              <span
                className={clsx(
                  "rounded-full",
                  isDark ? "w-4 h-4 bg-indigo-500" : "w-4 h-4 bg-indigo-500"
                )}
              />
            </motion.div>
          </div>
        </div>

        <NumberNode n={44} />
        <NumberNode n={45} />
        <NumberNode n={46} />

        {/* Flag end */}
        <div
          className={clsx(
            "relative z-10 mx-auto w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center border",
            isDark
              ? "bg-white/5 border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]"
              : "bg-white/70 border-white/60 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
          )}
        >
          <Flag
            className={clsx("w-3.5 h-3.5", isDark ? "text-gray-400" : "text-gray-400")}
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  );
}
