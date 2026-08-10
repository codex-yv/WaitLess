"use client";

import { useState, useEffect } from "react";
import logo3 from "@/assets/logo3.png";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const socialLinks = [
  {
    name: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/codex-yv",
  },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/youraj-verma-929383317/",
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    href: "https://x.com/youraj_856",
  },
];

const groups = [
  {
    title: "Product",
    links: ["Features", "Use Cases", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
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
              {socialLinks.map((item, i) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  data-testid={`footer-social-${i}`}
                  className={`w-9 h-9 rounded-lg grid place-items-center transition-colors ${theme === "light"
                    ? "bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/80"
                    : "glass hover:bg-white/10"
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-zinc-300"}`} />
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
