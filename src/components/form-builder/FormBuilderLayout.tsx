"use client"

import React, { useState, useEffect } from "react"
import { Plus, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { GlassCard } from "./GlassCard"
import { FieldInput } from "./FieldInput"
import { Dropdown } from "./Dropdown"
import { TimePicker } from "./TimePicker"
import { PreviewCard } from "./PreviewCard"
import { FormsList } from "./FormsList"
import { EmptyState } from "./EmptyState"
import { cn } from "@/lib/utils"
import { createForm, getForms } from "@/api/api-functions/adminForms"
import { FRONTEND_URL } from "@/config/backend"

interface FormField {
  label: string
  placeholder: string
  type?: string
  options?: string
}

interface Form {
  _id: string
  admin_id: string
  forms_params: any[]
  title: string
  opens: string
  closes: string
  date: string
  started: boolean
  total_scans: number
  expired: boolean
}

export function FormBuilderLayout() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("Build a Form")
  const [formTitle, setFormTitle] = useState("")
  const [selectedCounter, setSelectedCounter] = useState("counter-1")
  const [openingTime, setOpeningTime] = useState("09:00")
  const [closingTime, setClosingTime] = useState("18:00")
  const [fieldType, setFieldType] = useState("text")
  const [fieldLabel, setFieldLabel] = useState("")
  const [fieldPlaceholder, setFieldPlaceholder] = useState("")
  const [fieldOptions, setFieldOptions] = useState("")
  const [previewFields, setPreviewFields] = useState<FormField[]>([
    { label: "Full Name", placeholder: "Enter your name", type: "text" }
  ])
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [generatedFormId, setGeneratedFormId] = useState<string | null>(null)
  const [selectedForm, setSelectedForm] = useState<Form | null>(null)
  const [qrModalForm, setQrModalForm] = useState<Form | null>(null)
  const [savedForms, setSavedForms] = useState<Form[]>([])

  const tabs = ["Build a Form", "Show all Forms", "Add New Counter"]

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

  const counterOptions = [
    { value: "counter-1", label: "Counter 1" },
    { value: "counter-2", label: "Counter 2" },
    { value: "counter-3", label: "Counter 3" },
  ]

  const fieldTypeOptions = [
    { value: "text", label: "Text Input" },
    { value: "checkbox", label: "Checkbox" },
    { value: "dropdown", label: "Dropdown Menu" },
  ]

  const handleAddField = () => {
    if (!fieldLabel) {
      setErrorMessage("Label is required.")
      return
    }

    // Check for duplicate label
    const labelExists = previewFields.some(field => 
      field.label.toLowerCase() === fieldLabel.toLowerCase()
    )
    
    if (labelExists) {
      setErrorMessage("A field with this label already exists. Please use a different label.")
      return
    }
    
    // Validate options for checkbox and dropdown
    if ((fieldType === "checkbox" || fieldType === "dropdown") && !fieldOptions) {
      setErrorMessage("Options are required for Checkbox and Dropdown Menu fields.")
      return
    }
    
    // Validate placeholder for text input
    if (fieldType === "text" && !fieldPlaceholder) {
      setErrorMessage("Placeholder is required for Text Input fields.")
      return
    }
    
    setErrorMessage("")
    
    // Determine placeholder based on field type
    let placeholder = fieldPlaceholder
    if (fieldType === "dropdown" && fieldOptions) {
      const options = fieldOptions.split(",").map(opt => opt.trim())
      placeholder = options[0] || "Select an option"
    } else if (fieldType === "checkbox") {
      placeholder = ""
    }
    
    setPreviewFields([...previewFields, { 
      label: fieldLabel, 
      placeholder,
      type: fieldType,
      options: (fieldType === "checkbox" || fieldType === "dropdown") ? fieldOptions : undefined
    }])
    setFieldLabel("")
    setFieldPlaceholder("")
    setFieldOptions("")
    setFieldType("text")
  }

  const handleDeleteField = (index: number) => {
    setPreviewFields(previewFields.filter((_, i) => i !== index))
    setErrorMessage("")
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    setQrCodeUrl(null)
    setGeneratedFormId(null)
    try {
      const formParams = previewFields.map((field) => {
        const type = field.type || "text"
        if (type === "text") {
          return {
            inp: {
              label: field.label,
              placeholder: field.placeholder
            }
          }
        } else if (type === "checkbox") {
          return {
            cb: {
              label: field.label,
              options: field.options ? field.options.split(",").map((opt) => opt.trim()) : []
            }
          }
        } else if (type === "dropdown") {
          return {
            dm: {
              label: field.label,
              options: field.options ? field.options.split(",").map((opt) => opt.trim()) : []
            }
          }
        }
        return {}
      })

      const response = await createForm(
        formParams,
        formTitle || "Untitled Form",
        selectedCounter,
        openingTime,
        closingTime
      )

      const displayMsg = response.message || (response.status ? "Form created successfully" : "Failed to create form")
      setMessage({
        text: displayMsg,
        type: response.status ? "success" : "error"
      })

      setTimeout(() => {
        setMessage((prev) => (prev?.text === displayMsg ? null : prev))
      }, 3000)

      if (response.status && response.form_id) {
        setGeneratedFormId(response.form_id)
        const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          `${FRONTEND_URL}/${response.form_id}`
        )}`
        setQrCodeUrl(qrDataUrl)
      }
    } catch (error: any) {
      console.error("Error creating form:", error)
      const errText = "An error occurred while publishing the form."
      setMessage({
        text: errText,
        type: "error"
      })
      setTimeout(() => {
        setMessage((prev) => (prev?.text === errText ? null : prev))
      }, 3000)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSelectedForm(null)
    setMessage(null)
  }

  useEffect(() => {
    if (activeTab === "Show all Forms") {
      const fetchForms = async () => {
        try {
          const response = await getForms()
          if (response.status) {
            if (response.data === null || response.data === undefined) {
              setMessage({ text: response.message || "No forms available.", type: "error" })
              setTimeout(() => {
                setMessage((prev) => (prev?.text === (response.message || "No forms available.") ? null : prev))
              }, 3000)
              setSavedForms([])
            } else {
              setSavedForms(response.data)
            }
          } else {
            setMessage({ text: response.message || "Failed to retrieve forms.", type: "error" })
            setTimeout(() => {
              setMessage((prev) => (prev?.text === (response.message || "Failed to retrieve forms.") ? null : prev))
            }, 3000)
          }
        } catch (error: any) {
          console.error("Error fetching forms:", error)
          setMessage({ text: "An error occurred while fetching forms.", type: "error" })
          setTimeout(() => {
            setMessage((prev) => (prev?.text === "An error occurred while fetching forms." ? null : prev))
          }, 3000)
        }
      }
      fetchForms()
    }
  }, [activeTab])

  const getRecompiledFields = (formsParams: any[]): FormField[] => {
    return (formsParams || []).map((item) => {
      if (item.inp) {
        return {
          label: item.inp.label,
          placeholder: item.inp.placeholder,
          type: "text"
        }
      } else if (item.cb) {
        return {
          label: item.cb.label,
          placeholder: "",
          type: "checkbox",
          options: Array.isArray(item.cb.options) ? item.cb.options.join(", ") : item.cb.options || ""
        }
      } else if (item.dm) {
        const optionsArray = item.dm.options || []
        const placeholder = Array.isArray(optionsArray) ? (optionsArray[0] || "Select an option") : "Select an option"
        return {
          label: item.dm.label,
          placeholder: placeholder,
          type: "dropdown",
          options: Array.isArray(optionsArray) ? optionsArray.join(", ") : optionsArray || ""
        }
      }
      return { label: "", placeholder: "" }
    })
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation - Top Left */}
      <div className={cn(
        "relative flex items-center gap-2 p-1.5 backdrop-blur-xl border rounded-full w-max transition-colors duration-300",
        isDark
          ? "border-white/10 bg-[#020617]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.5)]"
          : "border-gray-200 bg-white/70 ring-1 ring-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_20px_rgba(0,0,0,0.08)]"
      )}>
        {/* Container specular light */}
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        {/* Subtle gradient tint for light mode */}
        {!isDark && (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(99,102,241,0.05))] rounded-full opacity-100 pointer-events-none" />
        )}
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={cn(
                "relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                isActive 
                  ? "text-white" 
                  : isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "text-gray-600 hover:text-gray-900 bg-transparent"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 rounded-full",
                    isDark
                      ? "shadow-[0_0_20px_rgba(139,92,246,0.5),inset_0_1px_rgba(255,255,255,0.4)]"
                      : "shadow-[0_0_12px_rgba(99,102,241,0.25),inset_0_1px_rgba(255,255,255,0.5)]"
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={cn("relative z-10", isActive && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]")}>{tab}</span>
            </button>
          )
        })}
      </div>

      {/* Error/Success Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-sm font-medium backdrop-blur-sm border ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Main Layout - Conditional based on active tab */}
      {activeTab === "Build a Form" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Form Controls (30-35% width) */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-6">
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-5 h-5 text-purple-400" />
                <h3 className={cn(
                  "text-lg font-semibold transition-colors duration-300",
                  isDark ? "text-white" : "text-gray-900"
                )}>Add Field</h3>
              </div>

              <div className="space-y-2">
                {/* Form Title */}
                <FieldInput
                  label="Form Title"
                  placeholder="e.g. Patient Registration Form"
                  value={formTitle}
                  className = "py-2 text-[15px]"
                  onChange={(e) => setFormTitle(e.target.value)}
                />

                {/* Select Counter */}
                <Dropdown
                  label="Select Counter"
                  options={counterOptions}
                  value={selectedCounter}
                  className = "py-2 text-[15px]"
                  onChange={setSelectedCounter}
                  placeholder="Select a counter"
                />

                {/* Opening & Closing Time */}
                <div className="grid grid-cols-2 gap-4">
                  <TimePicker
                    label="Opening Time"
                    value={openingTime}
                    className = "py-2 text-[15px]"
                    onChange={(e) => setOpeningTime(e.target.value)}
                  />
                  <TimePicker
                    label="Closing Time"
                    value={closingTime}
                    className = "py-2 text-[15px]"
                    onChange={(e) => setClosingTime(e.target.value)}
                  />
                </div>

                {/* Field Type */}
                <Dropdown
                  label="Field Type"
                  options={fieldTypeOptions}
                  value={fieldType}
                  className = "py-2 text-[15px]"
                  onChange={setFieldType}
                  placeholder="Select field type"
                />

                {/* Label Input */}
                <FieldInput
                  label="Label"
                  placeholder="e.g. Full Name"
                  value={fieldLabel}
                  className="py-2 text-[15px]"
                  onChange={(e) => setFieldLabel(e.target.value)}
                />

                {/* Placeholder Text - Only for Text Input */}
                {fieldType === "text" && (
                  <FieldInput
                    label="Placeholder Text"
                    placeholder="e.g. Enter your name"
                    value={fieldPlaceholder}
                    className = "py-2 text-[15px]"
                    onChange={(e) => setFieldPlaceholder(e.target.value)}
                  />
                )}

                {/* Options - Conditional for Checkbox and Dropdown */}
                {(fieldType === "checkbox" || fieldType === "dropdown") && (
                  <FieldInput
                    label="Options"
                    placeholder="e.g. Option 1, Option 2, Option 3"
                    value={fieldOptions}
                    className = "py-2 text-[15px]"
                    onChange={(e) => setFieldOptions(e.target.value)}
                  />
                )}

                {/* Add Field Button */}
                <button
                  onClick={handleAddField}
                  className="w-full px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-200 shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
                >
                  + Add Field
                </button>

                {/* Error Message */}
                {errorMessage && (
                  <div className={cn(
                    "p-3 rounded-xl border transition-colors duration-300",
                    isDark
                      ? "border-red-500/30 bg-red-500/10"
                      : "border-red-200 bg-red-50"
                  )}>
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className={cn(
                "mt-6 p-4 rounded-xl border transition-colors duration-300",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-gray-200 bg-gray-50"
              )}>
                <p className={cn(
                  "text-sm transition-colors duration-300",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  <span className="font-semibold text-purple-300">💡 Tip:</span> Keep forms short for faster entries. Less is more.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Right Panel - Form Preview (65-70% width) */}
          <div className="lg:col-span-8">
            <PreviewCard
              formTitle={formTitle}
              fields={previewFields}
              fieldCount={previewFields.length}
              onDeleteField={handleDeleteField}
              onPublish={handlePublish}
              isPublishing={isPublishing}
              qrCodeUrl={qrCodeUrl}
              formId={generatedFormId}
            />
          </div>
        </div>
      ) : activeTab === "Show all Forms" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Forms List */}
          <div className="lg:col-span-5">
            <FormsList
              forms={savedForms}
              onFormClick={setSelectedForm}
              onPreview={(form) => setSelectedForm(form)}
              onQR={(form) => setQrModalForm(form)}
            />
          </div>

          {/* Right Panel - Empty State or Preview */}
          <div className="lg:col-span-7">
            {selectedForm ? (
              <PreviewCard
                formTitle={selectedForm.title}
                fields={getRecompiledFields(selectedForm.forms_params)}
                fieldCount={getRecompiledFields(selectedForm.forms_params).length}
              />
            ) : (
              <div className={cn(
                "p-8 rounded-2xl border text-center transition-colors duration-300",
                isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
              )}>
                <p className={cn(
                  "transition-colors duration-300",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>No preview available</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={cn(
          "p-8 rounded-2xl border text-center transition-colors duration-300",
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
        )}>
          <p className={cn(
            "transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>Add New Counter functionality coming soon</p>
        </div>
      )}
      {/* QR Modal Popup */}
      {qrModalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={cn(
            "relative w-full max-w-md p-6 rounded-2xl border transition-all duration-300 shadow-2xl animate-in fade-in zoom-in-95 duration-200",
            isDark 
              ? "bg-[#0b0f19] border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
              : "bg-white border-gray-200 text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          )}>
            {/* Close Button */}
            <button
              onClick={() => setQrModalForm(null)}
              className={cn(
                "absolute top-4 right-4 p-1.5 rounded-lg border transition-all duration-200 cursor-pointer",
                isDark 
                  ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-400 hover:text-white" 
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-900"
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="text-xl font-bold mb-1 text-center">{qrModalForm.title}</h3>
              <p className={cn("text-xs mb-6", isDark ? "text-gray-400" : "text-gray-500")}>Scan to join the queue</p>
              
              <div className="p-4 bg-white rounded-xl shadow-inner mb-4">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${FRONTEND_URL}/${qrModalForm._id}`)}`} 
                  alt="Form QR Code" 
                  className="w-48 h-48"
                />
              </div>
              
              <a 
                href={`${FRONTEND_URL}/${qrModalForm._id}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-purple-400 hover:text-purple-300 underline break-all text-center"
              >
                {FRONTEND_URL}/{qrModalForm._id}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
