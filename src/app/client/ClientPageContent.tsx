"use client";

import { Sparkles } from "lucide-react";
import { Header } from "@/components/client/Header";
import { Timeline } from "@/components/client/Timeline";
import { ActionButtons } from "@/components/client/ActionButtons";
import { Footer } from "@/components/client/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import clsx from "clsx";

export default function ClientPageContent() {
  const { isDark, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <main
      className={clsx(
        "min-h-screen relative",
        isDark
          ? "bg-gradient-to-b from-[#05070d] via-[#060a14] to-[#04060c]"
          : "bg-gradient-to-br from-[#f5f6fa] via-[#eef1f7] to-[#e6e9f2]"
      )}
    >
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      )}
      <div
        className={clsx(
          "max-w-[420px] mx-auto min-h-screen px-5 relative",
          isDark
            ? "shadow-[inset_0_0_120px_rgba(0,0,0,0.3)]"
            : "shadow-[inset_0_0_120px_rgba(0,0,0,0.05)]"
        )}
      >
        <Header />

        <section className="text-center mt-6">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" strokeWidth={2} />
            <h2
              className={clsx(
                "text-xl font-semibold",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              You're in line
            </h2>
          </div>
          <p
            className={clsx(
              "text-sm mt-1",
              isDark ? "text-gray-400" : "text-gray-500"
            )}
          >
            Your turn is approaching
          </p>
        </section>

        <Timeline />

        <ActionButtons />

        <Footer />
      </div>
    </main>
  );
}
