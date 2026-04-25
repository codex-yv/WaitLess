"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Sun, Moon, Bell, MapPin, Clock, Loader2, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// @ts-ignore
import signupLight from "@/assets/signup-light.png";
// @ts-ignore
import signupDark from "@/assets/signup-dark.png";

const orgTypes = ["Hospital", "Saloon", "Bank", "Government Centers", "Others"];

export default function SignupPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  // Onboarding State
  const [step, setStep] = useState(0);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    occupation: "",
    orgType: "",
    orgName: "",
    orgAddress: "",
    agreed: false
  });

  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set mounted state and theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme-preference");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme-preference", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleGoogleClick = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      setFormData(prev => ({ ...prev, email: "user@waitless.com" }));
      setStep(1);
    }, 1200);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  // Shared Floating Input Component
  const FloatingInput = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className={`relative px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-lg border outline-none group focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] ${
      isDark 
        ? "bg-white/5 border-white/10 focus-within:border-blue-400/50 hover:bg-white/[0.07]" 
        : "bg-white/60 border-white/40 focus-within:border-blue-400 hover:bg-white/80"
    }`}>
      <label className={`block text-[11px] font-medium tracking-wide mb-1 transition-colors ${
        isDark ? "text-blue-400" : "text-blue-600"
      }`}>
        {label}
      </label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm outline-none font-medium placeholder:font-normal transition-colors ${
          isDark ? "text-white placeholder:text-zinc-600" : "text-gray-900 placeholder:text-gray-400"
        }`} 
      />
    </div>
  );

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-gray-900"
    }`}>
      {/* ─── Back Button & Theme Toggle (Top Nav) ─── */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <button 
          onClick={() => step > 0 ? setStep(step - 1) : window.location.href = '/'}
          className={`flex items-center gap-2 group transition-all duration-300 ${
            isDark ? "text-zinc-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <div className={`p-2 rounded-full transition-colors ${
            isDark ? "bg-white/[0.05] group-hover:bg-white/[0.1]" : "bg-gray-200/50 group-hover:bg-gray-200"
          }`}>
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm tracking-wide">{step > 0 ? "Back" : "WaitLess"}</span>
        </button>
        
        <button
          onClick={toggleTheme}
          className={`text-sm p-2 rounded-full transition-all duration-300 ${
            isDark 
              ? "bg-white/[0.05] text-zinc-300 hover:text-white hover:bg-white/[0.1]" 
              : "bg-white text-gray-500 hover:text-gray-900 shadow-sm border border-gray-200/50"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ─── Background Ambient Glows & Particles ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0a,#030712)]" />
            <motion.div animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
            <motion.div animate={{ x: [30, -30, 30], y: [10, -10, 10] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[60%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#f0f4f8] to-[#f8fafc]" />
            <div className="absolute -top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-300/30 blur-[100px]" />
            <div className="absolute top-[30%] -right-[10%] w-[300px] h-[300px] rounded-full bg-purple-300/20 blur-[100px]" />
          </>
        )}
      </div>

      {/* ─── Large Faded Brand Text ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className={`font-satoshi font-black tracking-tighter leading-[0.8] whitespace-nowrap text-[28vw] md:text-[22vw] lg:text-[19vw] bg-clip-text text-transparent translate-y-[18%] ${
            isDark ? "bg-[linear-gradient(180deg,rgba(96,165,250,0.22)_0%,rgba(192,132,252,0.14)_45%,rgba(34,211,238,0.05)_80%,transparent_100%)]" 
                   : "bg-[linear-gradient(180deg,rgba(59,130,246,0.15)_0%,rgba(168,85,247,0.12)_45%,rgba(34,211,238,0.08)_80%,transparent_100%)]"
          }`}
          style={{ WebkitTextStroke: isDark ? "1px rgba(255,255,255,0.04)" : "1px rgba(0,0,0,0.02)" }}
        >
          WaitLess
        </span>
      </div>

      {/* ─── Main Sign-up Card ─── */}
      <motion.div
        layout
        className="relative z-10 w-full max-w-[440px] mx-4 my-20"
      >
        {isDark && (
          <>
            <motion.div layout className="absolute -top-10 left-1/2 -translate-x-1/2 w-[160px] h-[80px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.35), rgba(168,85,247,0.20) 50%, transparent 70%)', filter: 'blur(30px)' }} />
            <motion.div layout className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
          </>
        )}

        <motion.div
          layout
          className={`relative rounded-2xl md:rounded-[2rem] p-5 md:p-8 overflow-hidden login-card-float ${
            isDark ? "backdrop-blur-2xl border border-white/[0.08]" 
                   : "bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)]"
          }`}
          style={isDark ? {
             background: 'rgba(255,255,255,0.04)',
             outline: '1px solid rgba(255,255,255,0.06)',
             boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 20px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)'
          } : undefined}
        >
          {isDark && (
            <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.14), rgba(255,255,255,0.06) 40%, transparent 70%)' }} />
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)' }} />
            </div>
          )}

          {/* Progress Bar for Step 1 & 2 */}
          <AnimatePresence>
            {step > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 relative z-10"
              >
                <div className="flex justify-between text-[11px] font-semibold tracking-widest uppercase mb-3">
                  <span className={isDark ? "text-white" : "text-gray-900"}>Step {step} of 2</span>
                  <span className={isDark ? "text-zinc-500" : "text-gray-400"}>
                    {step === 1 ? "Personal Info" : "Organization"}
                  </span>
                </div>
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                  <motion.div 
                    initial={{ width: step === 1 ? "0%" : "50%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            
            {/* ─── STEP 0: Landing / Connect ─── */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="text-center mb-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                      isDark ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 shadow-[0_0_25px_rgba(59,130,246,0.5)]" 
                             : "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 shadow-[0_8px_16px_rgba(59,130,246,0.15)]"
                    }`}
                  >
                    <Zap className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                  </motion.div>
                  <h1 className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Join <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">WaitLess</span>
                  </h1>
                  <p className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}>Skip the wait. Save time for what matters.</p>
                </div>

                <div className="relative w-full aspect-[4/3] bg-transparent opacity-95 mb-3 rounded-lg overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-tr transition-opacity duration-700 ${isDark ? "from-blue-500/5 to-purple-500/5 opacity-40" : "from-blue-50/50 to-purple-50/50 opacity-30"}`} />
                  <div className="absolute inset-0 flex items-center justify-center p-2 shadow-none">
                    <AnimatePresence mode="wait">
                      <motion.div key={theme} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full h-full relative">
                        <Image src={isDark ? signupDark : signupLight} alt="WaitLess Preview" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain" priority />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-stretch justify-between gap-2 mb-4">
                  {[
                    { icon: Clock, text: "Wait Updates" },
                    { icon: Bell, text: "Smart Alerts" },
                    { icon: MapPin, text: "Live Tracking" }
                  ].map((feature, i) => (
                    <div key={i} className={`flex-1 flex flex-col items-center justify-center gap-1.5 px-1 py-2.5 rounded-xl text-[10px] leading-tight text-center font-medium border ${isDark ? "bg-white/5 border-white/10 text-zinc-300" : "bg-white/60 border-gray-200 text-gray-700"}`}>
                      <feature.icon className={`w-3.5 h-3.5 mb-0.5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                      <span className="line-clamp-1 break-all px-1">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleGoogleClick}
                    disabled={isGoogleLoading}
                    className={`group relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                      isDark ? "bg-white text-zinc-900 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                             : "bg-gray-900 text-white hover:scale-[1.02] shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:bg-black"
                    }`}
                  >
                    {!isGoogleLoading && (
                      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                        <div className={`relative h-full w-8 ${isDark ? "bg-white/40" : "bg-white/20"}`} />
                      </div>
                    )}
                    
                    {isGoogleLoading ? (
                      <Loader2 className={`w-5 h-5 animate-spin ${isDark ? "text-zinc-900" : "text-white"}`} />
                    ) : (
                      <>
                        <div className={`p-1 rounded-full bg-white flex items-center justify-center ${!isDark && "shadow-sm"}`}>
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        <span>Sign Up with Google</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 1: Personal Info ─── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="mb-6">
                  <h2 className={`text-2xl font-semibold tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Tell us about you
                  </h2>
                  <p className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                    Let's personalize your WaitLess experience.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <FloatingInput 
                    label="Email Address" 
                    type="email"
                    value={formData.email} 
                    onChange={(e: any) => setFormData({...formData, email: e.target.value})} 
                  />
                  <FloatingInput 
                    label="Full Name" 
                    placeholder="E.g. Alex Smith"
                    value={formData.fullName} 
                    onChange={(e: any) => setFormData({...formData, fullName: e.target.value})} 
                  />
                  <FloatingInput 
                    label="Occupation / Role" 
                    placeholder="E.g. Manager, Customer Support"
                    value={formData.occupation} 
                    onChange={(e: any) => setFormData({...formData, occupation: e.target.value})} 
                  />
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => setStep(2)}
                    className={`w-full py-3.5 rounded-xl font-medium text-white shadow-lg transition-all hover:scale-[1.02] bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)]`}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Organization Info ─── */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="mb-6">
                  <h2 className={`text-2xl font-semibold tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Where do you operate?
                  </h2>
                  <p className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                    Almost there! Set up your organization.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  
                  {/* Custom Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <div 
                      onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                      className={`relative w-full px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-lg border ${
                        orgDropdownOpen 
                          ? (isDark ? "bg-white/10 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "bg-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]") 
                          : (isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.07]" : "bg-white/60 border-white/40 hover:bg-white/80")
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-medium tracking-wide mb-0.5 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                            Organization Type
                          </span>
                          <span className={`text-sm font-medium ${formData.orgType ? (isDark ? "text-white" : "text-gray-900") : (isDark ? "text-zinc-600" : "text-gray-400")}`}>
                            {formData.orgType || "Select a category"}
                          </span>
                        </div>
                        <motion.div animate={{ rotate: orgDropdownOpen ? 180 : 0 }}>
                          <ChevronDown className={`w-5 h-5 ${isDark ? "text-zinc-400" : "text-gray-500"}`} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {orgDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-[calc(100%+8px)] left-0 w-full rounded-xl border overflow-hidden z-50 backdrop-blur-3xl ${
                            isDark ? "bg-[#0f172a]/90 border-white/10 shadow-2xl" : "bg-white/90 border-gray-200 shadow-xl"
                          }`}
                        >
                          {orgTypes.map((type) => (
                            <div
                              key={type}
                              onClick={() => { setFormData({...formData, orgType: type}); setOrgDropdownOpen(false); }}
                              className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                                isDark 
                                  ? "hover:bg-white/10 text-white" 
                                  : "hover:bg-blue-50 text-gray-900"
                              } ${formData.orgType === type ? (isDark ? "bg-blue-500/10" : "bg-blue-50") : ""}`}
                            >
                              {type}
                              {formData.orgType === type && <Check className="w-4 h-4 text-blue-500" />}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <FloatingInput 
                    label="Organization Name" 
                    placeholder="E.g. Central City Hospital"
                    value={formData.orgName} 
                    onChange={(e: any) => setFormData({...formData, orgName: e.target.value})} 
                  />
                  
                  <FloatingInput 
                    label="Address / Location" 
                    placeholder="E.g. 123 Main St, New York"
                    value={formData.orgAddress} 
                    onChange={(e: any) => setFormData({...formData, orgAddress: e.target.value})} 
                  />
                </div>

                <div className="mt-auto">
                  <div className="flex items-start gap-3 mb-5">
                    <button
                      onClick={() => setFormData({...formData, agreed: !formData.agreed})}
                      className={`shrink-0 w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all ${
                        formData.agreed
                          ? "bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                          : (isDark ? "border-white/20 hover:border-white/40" : "border-gray-300 hover:border-gray-400 bg-white/50")
                      }`}
                    >
                      {formData.agreed && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                      I agree to the <Link href="#" className={`underline transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Terms of Service</Link> & <Link href="#" className={`underline transition-colors ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}>Privacy Policy</Link>.
                    </p>
                  </div>

                  <button
                    disabled={!formData.agreed || !formData.orgName || !formData.orgType}
                    className={`w-full py-3.5 rounded-xl font-medium text-white shadow-lg transition-all ${
                      formData.agreed && formData.orgName && formData.orgType
                        ? "hover:scale-[1.02] bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)] cursor-pointer"
                        : "bg-gray-400/50 cursor-not-allowed opacity-70"
                    }`}
                  >
                    Finish Setup
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
