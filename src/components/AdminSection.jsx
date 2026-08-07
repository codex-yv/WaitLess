"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  MessageSquare,
  Layout,
  Settings,
  ArrowRight,
  Zap,
  Play,
  Pause,
  Phone,
  FileText,
  CreditCard,
  Layers,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Dashboard",
    description:
      "Monitor your entire operation at a glance. Track total clients, completed and cancelled appointments, performance rates, and live activity streams in real time.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: Users,
    title: "Live Queue Control Panel",
    description:
      "Take instant action with smart controls. Call next, Cancel appointments, and Skip appointments effortlessly.",
    accent: "from-purple-500 to-pink-400",
  },
  {
    icon: Layout,
    title: "Smart Form Builder",
    description:
      "Create fully customizable forms. Preview before publishing and collect exactly the data you need.",
    accent: "from-teal-500 to-emerald-400",
  },
  {
    icon: Layers,
    title: "Multi-Counter Optimization",
    description:
      "Run multiple service counters seamlessly. Distribute load, reduce wait times, and keep operations flowing smoothly.",
    accent: "from-orange-500 to-red-400",
  },
];

export default function AdminSection() {
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
      id="admin-section"
      data-testid="admin-section"
      className={`relative py-28 overflow-hidden ${theme === "light" ? "bg-gradient-to-b from-white to-gray-50" : ""
        }`}
    >
      {/* Background blobs for light mode */}
      {theme === "light" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-400/25 blur-[120px] opacity-40" />
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-blue-400/25 blur-[140px] opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[100px] opacity-30" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase ${theme === "light"
                ? "bg-purple-100 text-purple-700"
                : "bg-purple-500/20 text-purple-300"
                }`}
            >
              <Zap className="w-3.5 h-3.5" />
              For Businesses & Administrators
            </div>

            <h1
              className={`font-satoshi mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] ${theme === "light" ? "text-gray-900" : ""
                }`}
            >
              Take full control of your{" "}
              <span className="gradient-text">queue ecosystem.</span>
            </h1>

            <h2
              className={`font-satoshi text-3xl md:text-4xl font-bold tracking-tight mt-4 ${theme === "light" ? "text-gray-800" : "text-zinc-300"
                }`}
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                modern admins.
              </span>
            </h2>

            <p
              className={`mt-6 text-lg leading-relaxed max-w-lg ${theme === "light" ? "text-gray-700" : "text-zinc-400"
                }`}
            >
              Manage queues, optimize operations, and deliver seamless
              experiences <ArrowRight className="inline-block w-4 h-4 mx-1 align-middle" /> all from a single powerful dashboard.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#cta"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${theme === "light"
                  ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:scale-105"
                  : "btn-primary"
                  }`}
              >
                Start Managing Smarter
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quote */}
            <div
              className={`mt-12 p-6 rounded-2xl border ${theme === "light"
                ? "bg-white/70 backdrop-blur-lg border-white/40 shadow-lg"
                : "glass"
                }`}
            >
              <p
                className={`text-sm italic ${theme === "light" ? "text-gray-600" : "text-zinc-400"
                  }`}
              >
                "Built for those who don't just manage queues — they eliminate
                them."
              </p>
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${theme === "light"
                  ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl"
                  : "glass hover:shadow-xl"
                  }`}
              >
                {/* Top edge highlight */}
                {theme === "light" && (
                  <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-white/80 via-gray-200 to-white/80 pointer-events-none" />
                )}

                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} grid place-items-center shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3
                    className={`font-satoshi mt-4 text-xl font-bold ${theme === "light" ? "text-gray-900" : ""
                      }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-relaxed ${theme === "light" ? "text-gray-600" : "text-zinc-400"
                      }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
