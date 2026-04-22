"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const quotes = [
  {
    quote:
      "Our branch lobby used to feel like an airport on a Monday. With WaitLess, it feels like a premium lounge.",
    name: "Ayesha Khan",
    role: "Branch Lead, Northwind Bank",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    quote:
      "Patients are less anxious, staff are less stressed, and we've cut no-shows by a third. I'd never go back.",
    name: "Dr. Marcus Hale",
    role: "Chief of Medicine, MedCare",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote:
      "Setup took us one afternoon. The dashboard is cleaner than most tools I pay ten times more for.",
    name: "Rohan Mehta",
    role: "Owner, Luxe Salon",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    quote:
      "We replaced a ten-year-old token printer with a QR sticker. Customers laughed — then they loved it.",
    name: "Lina Oduya",
    role: "Ops Manager, CityGov",
    avatar: "https://i.pravatar.cc/80?img=49",
  },
  {
    quote:
      "The smart alerts are uncanny. I walked back in with 90 seconds to spare and got cheered on.",
    name: "Kenji Tanaka",
    role: "Customer, Swift Clinics",
    avatar: "https://i.pravatar.cc/80?img=68",
  },
  {
    quote:
      "Our walk-out rate dropped 62% in the first month. The ROI is embarrassingly good.",
    name: "Priya Ramesh",
    role: "CX Director, PaxBank",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
];

export default function Testimonials() {
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
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-28 border-t border-white/5 overflow-hidden"
    >
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        theme === "light" ? "bg-blue-400/10" : "bg-purple-500/10"
      }`} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <p className={`text-xs uppercase tracking-[0.3em] ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
            Loved at the front desk
          </p>
          <h2 className={`font-satoshi mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight ${theme === "light" ? "text-gray-900" : ""}`}>
            The people who used to run the queue,
            <br />
            <span className="gradient-text">now run their days.</span>
          </h2>
        </div>

        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              data-testid={`testimonial-${i}`}
              className={`rounded-2xl p-6 mb-5 break-inside-avoid relative overflow-hidden transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80 hover:-translate-y-1"
                  : "glass"
              }`}
            >
              {/* Top edge highlight for light mode */}
              {theme === "light" && (
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-white/80 via-gray-200 to-white/80 pointer-events-none" />
              )}
              <Quote className={`w-5 h-5 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`} />
              <p className={`mt-3 leading-relaxed ${theme === "light" ? "text-gray-700" : "text-zinc-200"}`}>{q.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={q.avatar}
                  alt={q.name}
                  className={`w-9 h-9 rounded-full object-cover border ${theme === "light" ? "border-gray-300" : "border-white/10"}`}
                />
                <div>
                  <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : ""}`}>{q.name}</p>
                  <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>{q.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
