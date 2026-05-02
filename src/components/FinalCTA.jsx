"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("You're on the waitlist! We'll reach out the moment we open your region.");
      setEmail("");
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" data-testid="final-cta-section" className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-[28px] overflow-hidden p-10 md:p-16 ${
            theme === "light"
              ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl"
              : "border border-white/10"
          }`}
        >
          {/* gradient bg */}
          <div className="absolute inset-0 -z-10">
            <div className={`absolute inset-0 ${
              theme === "light"
                ? "bg-gradient-to-br from-blue-50 via-white to-purple-50"
                : "bg-gradient-to-br from-[#1a1540] via-[#0b0b18] to-[#0a2a2c]"
            }`} />
            <div className={`absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full blur-3xl ${
              theme === "light" ? "bg-blue-400/30" : "bg-blue-500/30"
            }`} />
            <div className={`absolute -bottom-40 -right-10 w-[560px] h-[560px] rounded-full blur-3xl ${
              theme === "light" ? "bg-purple-400/25" : "bg-purple-500/30"
            }`} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-3xl ${
              theme === "light" ? "bg-cyan-400/20" : "bg-teal-400/20"
            }`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                theme === "light"
                  ? "bg-white/70 backdrop-blur-lg border border-white/40 text-gray-600 shadow-lg"
                  : "glass text-zinc-200"
              }`}>
                <Sparkles className={`w-3.5 h-3.5 ${theme === "light" ? "text-teal-600" : "text-teal-300"}`} />
                Private beta — onboarding weekly
              </div>
              <h2 className={`font-satoshi mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] ${
                theme === "light" ? "text-gray-900" : ""
              }`}>
                Ready to eliminate
                <br />
                <span className="gradient-text">the queue?</span>
              </h2>
              <p className={`mt-5 text-lg max-w-lg ${
                theme === "light" ? "text-gray-700" : "text-zinc-300"
              }`}>
                Join the waitlist. Get early access, onboarding help, and
                launch pricing for your first location.
              </p>
            </div>

            <form
              onSubmit={submit}
              data-testid="waitlist-form"
              className={`rounded-2xl p-5 md:p-6 relative overflow-hidden transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl"
                  : "glass-strong"
              }`}
            >
              {/* Top edge highlight for light mode */}
              {theme === "light" && (
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-white/80 via-gray-200 to-white/80 pointer-events-none" />
              )}
              <label className={`text-xs uppercase tracking-[0.2em] ${
                theme === "light" ? "text-gray-500" : "text-zinc-400"
              }`}>
                Work email
              </label>
              <div className={`mt-2 flex items-center gap-2 rounded-xl px-3 focus-within:border-white/30 ${
                theme === "light"
                  ? "bg-gray-100 border border-gray-300"
                  : "bg-black/40 border border-white/10"
              }`}>
                <Mail className={`w-4 h-4 ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`} />
                <input
                  data-testid="waitlist-email-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  suppressHydrationWarning
                  className={`flex-1 bg-transparent py-3 text-sm outline-none ${
                    theme === "light" ? "placeholder:text-gray-400" : "placeholder:text-zinc-500"
                  }`}
                />
              </div>
              <button
                data-testid="waitlist-submit-btn"
                type="submit"
                disabled={loading}
                className="btn-primary mt-4 w-full justify-center"
              >
                {loading ? "Joining…" : "Join the Waitlist"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className={`mt-3 text-[11px] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
                By joining you agree to receive product emails. No spam — ever.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
