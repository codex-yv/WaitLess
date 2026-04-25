"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";

const links = [
  { label: "Product", href: "#lifestyle-section" },
  { label: "Workflow", href: "#features" },
  { label: "Administrators", href: "#admin-section" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Waitlist", href: "#cta" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");
  const lastY = useRef(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme management
  useEffect(() => {
    if (!mounted) return;

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);

    // Apply theme to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (!mounted) return;

    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      // Scroll direction detection
      const delta = y - lastY.current;
      const threshold = 10; // 10px threshold to prevent jitter

      // Hide navbar when scrolling down, show when scrolling up
      // Ignore tiny movements and keep visible at the very top
      if (Math.abs(delta) > threshold && y > 80) {
        setHidden(delta > 0); // scrolling down -> hide (slide left), up -> show (slide in from right)
      } else if (y <= 80) {
        setHidden(false); // Always visible at the top
      }

      lastY.current = y;
    };

    // Use passive: true for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-4 left-1/2 z-50 w-[min(1120px,calc(100%-24px))] rounded-3xl
        transition-all duration-300 ease-in-out
        ${
          // Light mode: Premium glass morphism effect with strong depth
          theme === "light"
            ? scrolled
              ? // Scrolled light mode: Stronger glass with gradient and enhanced shadow
                "backdrop-blur-2xl bg-gradient-to-r from-white/80 via-white/70 to-white/80 border border-white/50 shadow-xl backdrop-saturate-150"
              : // Default light mode: Premium frosted glass with gradient
                "backdrop-blur-xl bg-gradient-to-r from-white/70 via-white/50 to-white/70 border border-white/40 shadow-lg backdrop-saturate-150 hover:from-white/75 hover:via-white/55 hover:to-white/75"
            : // Dark mode: Keep existing styling
            scrolled
              ? "backdrop-blur-xl bg-black/55 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              : "backdrop-blur-md bg-black/20 border border-white/5"
        }
        ${
          hidden
            ? "-translate-x-[120%] opacity-0"
            : "-translate-x-1/2 opacity-100"
        }`}
      style={{ top: "1rem" }}
    >
      <div className="px-5 md:px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          data-testid="brand-logo"
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg grid place-items-center bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400 shadow-[0_6px_24px_rgba(157,76,221,0.45)]">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className={`font-satoshi font-bold text-lg tracking-tight ${
            theme === "light" ? "text-black" : "text-white"
          }`}>
            WaitLess
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`text-sm transition-colors ${
                theme === "light"
                  ? "text-gray-800 hover:text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            className={`text-sm p-2 rounded-lg transition-colors ${
              theme === "light"
                ? "text-gray-800 hover:bg-gray-100"
                : "text-zinc-300 hover:text-white hover:bg-white/10"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="/login"
            data-testid="navbar-sign-in"
            className={`text-sm px-4 py-2 transition-colors ${
              theme === "light"
                ? "text-gray-800 hover:text-black"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Sign in
          </a>
          <a
            href="/signup"
            data-testid="navbar-get-started"
            className="btn-primary text-sm"
          >
            Get Started
          </a>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 ${theme === "light" ? "text-black" : "text-white"}`}
          aria-label="toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className={`md:hidden mt-2 rounded-3xl backdrop-blur-xl overflow-hidden
            ${
              theme === "light"
                ? "border border-white/40 bg-white/70 shadow-lg"
                : "border border-white/10 bg-black/90"
            }`}
        >
          <div className="px-5 py-5 flex flex-col gap-4">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 text-sm transition-colors ${
                theme === "light"
                  ? "text-gray-800 hover:text-black"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  theme === "light"
                    ? "text-gray-800 hover:text-black"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a href="/signup" className="btn-primary text-sm self-start">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
