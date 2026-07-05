"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { scanQR, submitForm, reScanQR } from "@/api/api-functions/clientForm"
import { cn } from "@/lib/utils"
import { Sparkles, Clock, ChevronRight } from "lucide-react"

const parseFormsParams = (params: any): any[] => {
  if (!params) return []
  if (Array.isArray(params)) return params
  if (typeof params === "string") {
    try {
      const formatted = params.replace(/'/g, '"')
      return JSON.parse(formatted)
    } catch (e) {
      console.error("Error parsing forms_params:", e)
      return []
    }
  }
  return []
}

export default function ScannedQRPage() {
  const params = useParams()
  const router = useRouter()
  const formId = params?.formId as string

  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  const [formTemplate, setFormTemplate] = useState<{
    _id: string
    title: string
    opens?: string
    closes?: string
    forms_params: any[]
  } | null>(null)

  const [formValues, setFormValues] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
    const hasDarkClass = document.documentElement.classList.contains("dark")
    setIsDark(hasDarkClass)

    const observer = new MutationObserver(() => {
      const hasDarkClass = document.documentElement.classList.contains("dark")
      setIsDark(hasDarkClass)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mounted || !formId) return

    // 1. Check if token exists in localStorage
    const clientToken = localStorage.getItem("client_access_token")
    if (clientToken) {
      router.push("/client")
      return
    }

    // 2. Fetch Form by ID
    const fetchForm = async () => {
      try {
        const response = await scanQR(formId)
        if (response.status && response.data) {
          const rawForm = Array.isArray(response.data) ? response.data[0] : response.data
          if (!rawForm) {
            setErrorMsg("form not found")
            return
          }
          const parsedParams = parseFormsParams(rawForm.forms_params)
          const updatedTemplate = {
            ...rawForm,
            forms_params: parsedParams
          }
          setFormTemplate(updatedTemplate)
          // Initialize empty states for all inputs
          const initialValues: Record<string, string> = {}
          parsedParams.forEach((item: any) => {
            const field = item.inp || item.cb || item.dm
            if (field?.label) {
              initialValues[field.label] = ""
            }
          })
          setFormValues(initialValues)
        } else {
          setErrorMsg(response.message || "form not found")
        }
      } catch (err) {
        console.error("Error scanning QR:", err)
        setErrorMsg("Failed to retrieve the form details. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchForm()
  }, [mounted, formId, router])

  const handleInputChange = (label: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [label]: value
    }))
  }

  const handleCheckboxToggle = (label: string, option: string) => {
    setFormValues((prev) => {
      const current = prev[label]
      let nextList: string[] = []
      if (Array.isArray(current)) {
        nextList = current
      } else if (typeof current === "string" && current) {
        nextList = [current]
      }
      
      if (nextList.includes(option)) {
        nextList = nextList.filter((val) => val !== option)
      } else {
        nextList = [...nextList, option]
      }
      
      return {
        ...prev,
        [label]: nextList as any
      }
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formId) return

    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      // Structure params_val as list[dict]: [{ [label]: val }, ...]
      const paramsVal = Object.entries(formValues).map(([label, val]) => ({
        [label]: val
      }))

      const response = await submitForm(formId, paramsVal)
      if (response.status) {
        try {
          const statusRes = await reScanQR()
          if (statusRes.status) {
            localStorage.setItem("current_pos", String(statusRes.current_pos))
            localStorage.setItem("your_spot", String(statusRes.your_spot))
            localStorage.setItem("expected_time", String(statusRes.expected_time))
          }
        } catch (rescanErr) {
          console.error("Error during rescan after submit:", rescanErr)
        }
        router.push("/client")
      } else {
        setErrorMsg(response.message || response.error || "Failed to submit form.")
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Submit error:", err)
      setErrorMsg("Failed to submit form. Please check your network and try again.")
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <main className={cn(
      "min-h-screen flex items-center justify-center p-4 transition-colors duration-300",
      isDark
        ? "bg-gradient-to-b from-[#05070d] via-[#060a14] to-[#04060c] text-white"
        : "bg-gradient-to-br from-[#f5f6fa] via-[#eef1f7] to-[#e6e9f2] text-gray-900"
    )}>
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
      )}

      <div className={cn(
        "relative w-full max-w-md p-6 rounded-2xl border transition-all duration-300 shadow-2xl",
        isDark 
          ? "bg-[#0b0f19]/80 border-white/10 backdrop-blur-xl" 
          : "bg-white/80 border-gray-200/80 backdrop-blur-xl"
      )}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>Loading form template...</p>
          </div>
        ) : errorMsg ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">!</div>
            <h3 className="text-lg font-bold">Form Not Found</h3>
            <p className={cn("text-sm max-w-xs mx-auto", isDark ? "text-gray-400" : "text-gray-500")}>
              {errorMsg}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-200 cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        ) : formTemplate ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Form Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Join the Queue</span>
              </div>
              <h1 className="text-2xl font-bold">{formTemplate.title}</h1>
              
              {/* Timing details if available */}
              {(formTemplate.opens || formTemplate.closes) && (
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  {formTemplate.opens && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-green-400" />
                      Opens: {formTemplate.opens}
                    </span>
                  )}
                  {formTemplate.closes && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      Closes: {formTemplate.closes}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {formTemplate.forms_params?.map((item: any, idx: number) => {
                if (item.inp) {
                  const { label, placeholder } = item.inp
                  return (
                    <div key={idx} className="space-y-2">
                      <label className="block text-sm font-medium">{label}</label>
                      <input
                        type="text"
                        required
                        value={formValues[label] || ""}
                        placeholder={placeholder}
                        onChange={(e) => handleInputChange(label, e.target.value)}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-purple-500/25",
                          isDark
                            ? "bg-white/5 border-white/10 focus:border-purple-500 text-white placeholder-gray-500"
                            : "bg-gray-50 border-gray-200 focus:border-purple-500 text-gray-900 placeholder-gray-400"
                        )}
                      />
                    </div>
                  )
                }

                if (item.cb) {
                  const { label, options } = item.cb
                  const choices = Array.isArray(options) ? options : (options ? options.split(",") : [])
                  return (
                    <div key={idx} className="space-y-2">
                      <label className="block text-sm font-medium">{label}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {choices.map((option: string) => {
                          const isSelected = Array.isArray(formValues[label])
                            ? (formValues[label] as any).includes(option)
                            : formValues[label] === option
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleCheckboxToggle(label, option)}
                              className={cn(
                                "px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-center cursor-pointer",
                                isSelected
                                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                                  : isDark
                                    ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                }

                if (item.dm) {
                  const { label, options } = item.dm
                  const selectOptions = Array.isArray(options) ? options : (options ? options.split(",") : [])
                  return (
                    <div key={idx} className="space-y-2">
                      <label className="block text-sm font-medium">{label}</label>
                      <select
                        required
                        value={formValues[label] || ""}
                        onChange={(e) => handleInputChange(label, e.target.value)}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-purple-500/25 cursor-pointer appearance-none",
                          isDark
                            ? "bg-[#0b0f19] border-white/10 focus:border-purple-500 text-white"
                            : "bg-white border-gray-200 focus:border-purple-500 text-gray-900"
                        )}
                      >
                        <option value="" disabled>Select an option</option>
                        {selectOptions.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  )
                }

                return null
              })}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 transition-all duration-200 shadow-[0_4px_20px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 cursor-pointer",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Form...
                </>
              ) : (
                <>
                  Submit & Get Spot
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : null}
      </div>
    </main>
  )
}
