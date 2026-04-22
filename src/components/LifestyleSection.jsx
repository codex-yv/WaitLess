"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Coffee, Briefcase, Clock, ArrowRight, Bell } from "lucide-react";
import shoppingLight from "@/assets/shopping light.png";
import shoppingDark from "@/assets/shopping.png";
import restaurantLight from "@/assets/restaurant_chat light.jpg";
import restaurantDark from "@/assets/restaurant_chat.jpg";

const cards = [
  {
    icon: ShoppingBag,
    imageLight: shoppingLight.src,
    imageDark: shoppingDark.src,
    title: "Shop without the stress.",
    description:
      "Browse, shop, and explore freely — your place in line is محفوظ (secure) and moving forward.",
    accent: "from-pink-500 to-rose-400",
    notification: "You're next in 5 mins",
  },
  {
    icon: Coffee,
    imageLight: restaurantLight.src,
    imageDark: restaurantDark.src,
    title: "Enjoy your meal, not the wait.",
    description:
      "Relax, dine, and savor the moment — we'll notify you exactly when it's your turn.",
    accent: "from-orange-500 to-amber-400",
    notification: "Table ready in 3 mins",
  },
  {
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
    title: "Keep your day moving.",
    description:
      "Work, travel, or handle tasks — your queue progresses in the background.",
    accent: "from-blue-500 to-cyan-400",
    notification: "Queue #42 in progress",
  },
];

export default function LifestyleSection() {
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
      id="lifestyle-section"
      data-testid="lifestyle-section"
      className={`relative py-28 overflow-hidden ${
        theme === "light" ? "bg-gradient-to-b from-white to-gray-50" : ""
      }`}
    >
      {/* Background blobs for light mode */}
      {theme === "light" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-pink-400/25 blur-[120px] opacity-40" />
          <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-blue-400/25 blur-[140px] opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-400/20 blur-[100px] opacity-30" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase ${
              theme === "light"
                ? "bg-blue-100 text-blue-700"
                : "bg-blue-500/20 text-blue-300"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Why Use WaitLess
          </div>

          <h1
            className={`font-satoshi mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] ${
              theme === "light" ? "text-gray-900" : ""
            }`}
          >
            Stop waiting.{" "}
            <span className="gradient-text">Start living.</span>
          </h1>

          <h2
            className={`font-satoshi text-3xl md:text-4xl font-bold tracking-tight mt-4 ${
              theme === "light" ? "text-gray-800" : "text-zinc-300"
            }`}
          >
            Your time,{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              uninterrupted.
            </span>
          </h2>

          <p
            className={`mt-6 text-lg leading-relaxed ${
              theme === "light" ? "text-gray-700" : "text-zinc-400"
            }`}
          >
            With WaitLess, your queue moves — while you move with your life.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[400px] md:h-[450px]">
                <img
                  src={card.imageLight && card.imageDark ? (theme === "light" ? card.imageLight : card.imageDark) : card.image}
                  alt={card.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    theme === "light" ? "brightness-110" : ""
                  }`}
                />

                {/* Overlay gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    theme === "light"
                      ? "from-white via-white/60 to-transparent"
                      : "from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"
                  }`}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} grid place-items-center shadow-lg mb-4`}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3
                    className={`font-satoshi text-xl font-bold mb-2 ${
                      theme === "light" ? "text-gray-900" : ""
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed ${
                      theme === "light" ? "text-gray-700" : "text-zinc-400"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p
            className={`text-lg mb-6 ${
              theme === "light" ? "text-gray-700" : "text-zinc-400"
            }`}
          >
            Why wait in line, when you can live your life?
          </p>
          <a
            href="#cta"
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
              theme === "light"
                ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:scale-105"
                : "btn-primary"
            }`}
          >
            Reclaim Your Time
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
