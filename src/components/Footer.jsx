"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Mail, Rss } from "lucide-react";
import logo3 from "@/assets/logo3.png";

const groups = [
  {
    title: "Product",
    links: ["Features", "Use Cases", "Pricing", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Press"],
  },
  {
    title: "Resources",
    links: ["Docs", "API", "Status", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

export default function Footer() {
  const [year, setYear] = useState(2026);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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
    <footer data-testid="footer" className="relative pt-24 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <img
              src={logo3.src || logo3}
              alt="WaitLess"
              className="h-15 w-auto object-contain rounded-xl"
            />
            <p className={`mt-4 text-sm max-w-xs leading-relaxed ${theme === "light" ? "text-gray-600" : "text-zinc-400"
              }`}>
              Smart digital queues for modern businesses. Skip the line, own
              your time.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[ExternalLink, Mail, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`footer-social-${i}`}
                  className={`w-9 h-9 rounded-lg grid place-items-center transition-colors ${theme === "light"
                    ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80"
                    : "glass hover:bg-white/10"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-zinc-300"}`} />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <p className={`text-xs uppercase tracking-[0.2em] ${theme === "light" ? "text-gray-500" : "text-zinc-500"
                }`}>
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className={`text-sm transition-colors ${theme === "light"
                        ? "text-gray-600 hover:text-gray-900"
                        : "text-zinc-300 hover:text-white"
                        }`}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <div className={`font-satoshi text-[16vw] md:text-[14vw] leading-none font-bold tracking-tighter bg-clip-text text-transparent select-none pointer-events-none ${theme === "light"
            ? "bg-gradient-to-b from-gray-400/10 via-gray-300/5 to-transparent"
            : "bg-gradient-to-b from-white/10 via-white/5 to-transparent"
            }`}>
            WaitLess
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
            <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
              © {year} WaitLess Inc. All rights reserved.
            </p>
            <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-zinc-500"}`}>
              Crafted for people who have better things to do than wait.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
