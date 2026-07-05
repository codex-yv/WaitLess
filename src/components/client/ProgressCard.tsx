"use client";

import { useState, useEffect } from "react"
import { Hourglass } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import clsx from "clsx"

export function ProgressCard() {
  const { isDark } = useTheme();
  const [waitTime, setWaitTime] = useState(28)

  useEffect(() => {
    const updateValues = () => {
      const time = localStorage.getItem("expected_time")
      if (time) setWaitTime(parseInt(time))
    }

    updateValues()
    window.addEventListener("storage", updateValues)
    window.addEventListener("queueUpdate", updateValues)
    return () => {
      window.removeEventListener("storage", updateValues)
      window.removeEventListener("queueUpdate", updateValues)
    }
  }, [])

  const size = 110;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Dynamically calculate progress circle based on spots, falling back to 0.62
  const [progress, setProgress] = useState(0.62)

  useEffect(() => {
    const updateProgress = () => {
      const servingStr = localStorage.getItem("current_pos")
      const spotStr = localStorage.getItem("your_spot")
      if (servingStr && spotStr) {
        const serving = parseInt(servingStr)
        const spot = parseInt(spotStr)
        if (spot > 0) {
          setProgress(Math.min(1, serving / spot))
          return
        }
      }
      setProgress(0.62)
    }

    updateProgress()
    window.addEventListener("storage", updateProgress)
    window.addEventListener("queueUpdate", updateProgress)
    return () => {
      window.removeEventListener("storage", updateProgress)
      window.removeEventListener("queueUpdate", updateProgress)
    }
  }, [])

  const offset = circumference * (1 - progress);

  return (
    <div
      className={clsx(
        "backdrop-blur-xl rounded-2xl p-5 w-[170px]",
        isDark
          ? "bg-white/5 border-white/10 shadow-[0_0_25px_rgba(99,102,241,0.1)] border"
          : "bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      )}
    >
      <p
        className={clsx(
          "text-center text-xs font-medium",
          isDark ? "text-gray-400" : "text-gray-500"
        )}
      >
        Estimated wait time
      </p>

      <div className="relative mx-auto mt-3" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#ringGrad)"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          {/* End dot */}
          <circle
            cx={size / 2 + radius * Math.cos(2 * Math.PI * progress - Math.PI / 2) * 0 + radius}
            cy={size / 2}
            r={4}
            fill="#6366f1"
            transform={`rotate(${progress * 360} ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Hourglass
            className={clsx("w-7 h-7", isDark ? "text-indigo-400" : "text-indigo-500")}
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className="mt-3 text-center">
        <p
          className={clsx(
            "text-3xl font-bold inline",
            isDark
              ? "text-indigo-400"
              : "bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
          )}
        >
          {waitTime}
        </p>
        <span
          className={clsx(
            "text-sm font-medium ml-1",
            isDark ? "text-indigo-400" : "text-indigo-400"
          )}
        >
          min
        </span>
        <p
          className={clsx(
            "text-xs mt-0.5",
            isDark ? "text-gray-400" : "text-gray-500"
          )}
        >
          remaining
        </p>
      </div>
    </div>
  );
}
