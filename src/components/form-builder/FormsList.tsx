"use client"

import React, { useState, useEffect, useCallback } from "react"
import { FormCard } from "./FormCard"
import { cn } from "@/lib/utils"
import wsManager from "@/api/websocket"
import { deleteForm } from "@/api/api-functions/adminForms"
import { AlertTriangle, Trash2, Loader2, X } from "lucide-react"

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

interface FormsListProps {
  forms: Form[]
  onFormClick?: (form: Form) => void
  onPreview?: (form: Form) => void
  onQR?: (form: Form) => void
  onFormDeleted?: (formId: string) => void
  className?: string
}

export function FormsList({
  forms,
  onFormClick,
  onPreview,
  onQR,
  onFormDeleted,
  className
}: FormsListProps) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  // Track real-time scan count increments from WebSocket
  const [scanIncrements, setScanIncrements] = useState<Record<string, number>>({})

  // Delete modal & API states
  const [formToDelete, setFormToDelete] = useState<Form | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deletedFormIds, setDeletedFormIds] = useState<string[]>([])

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

  // Listen for WebSocket `generate_form` events to increment scan count in real-time
  const handleScanUpdate = useCallback((data: { loc: string; form_id: string }) => {
    if (data.form_id) {
      setScanIncrements((prev) => ({
        ...prev,
        [data.form_id]: (prev[data.form_id] || 0) + 1,
      }))
    }
  }, [])

  useEffect(() => {
    wsManager.on("generate_form", handleScanUpdate)
    return () => {
      wsManager.off("generate_form", handleScanUpdate)
    }
  }, [handleScanUpdate])

  const handleConfirmDelete = async () => {
    if (!formToDelete) return
    setIsDeleting(true)
    setDeleteError(null)

    try {
      const response = await deleteForm(formToDelete._id)
      if (response && response.status === true) {
        setDeletedFormIds((prev) => [...prev, formToDelete._id])
        onFormDeleted?.(formToDelete._id)
        setFormToDelete(null)
      } else {
        setDeleteError(response?.message || "Failed to delete form.")
      }
    } catch (error: any) {
      console.error("Delete form error:", error)
      setDeleteError(error?.message || "An error occurred while deleting the form.")
    } finally {
      setIsDeleting(false)
    }
  }

  if (!mounted) return null

  const visibleForms = forms.filter((f) => !deletedFormIds.includes(f._id))

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className={cn(
          "text-xl font-bold transition-colors duration-300",
          isDark ? "text-white" : "text-gray-900"
        )}>ALL FORMS</h2>
        <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
          <span className={cn(
            "text-sm font-medium",
            isDark ? "text-purple-300" : "text-purple-700"
          )}>{visibleForms.length}</span>
        </span>
      </div>

      {/* Forms List */}
      {visibleForms.length === 0 ? (
        <div className={cn(
          "p-8 rounded-2xl border text-center transition-colors duration-300",
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
        )}>
          <p className={cn(
            "transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>No forms created yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleForms.map((form) => (
            <FormCard
              key={form._id}
              formId={form._id}
              formName={form.title}
              status={form.expired ? "Expired" : (form.started ? "Active" : "Inactive")}
              createdDate={form.date}
              scanCount={form.total_scans + (scanIncrements[form._id] || 0)}
              onClick={() => onFormClick?.(form)}
              onPreview={() => onPreview?.(form)}
              onQR={() => onQR?.(form)}
              onDelete={() => {
                setFormToDelete(form)
                setDeleteError(null)
              }}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal Popup */}
      {formToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={cn(
            "relative w-full max-w-md p-6 rounded-2xl border transition-all duration-300 shadow-2xl animate-in zoom-in-95 duration-200",
            isDark
              ? "bg-[#0b0f19] border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-white border-gray-200 text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          )}>
            {/* Close Button */}
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                setFormToDelete(null)
                setDeleteError(null)
              }}
              className={cn(
                "absolute top-4 right-4 p-1.5 rounded-lg border transition-all duration-200 cursor-pointer disabled:opacity-50",
                isDark
                  ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-400 hover:text-white"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-900"
              )}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Delete Form</h3>
                <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>
                  Form confirmation
                </p>
              </div>
            </div>

            {/* Warning Content */}
            <div className="space-y-3 mb-6">
              <p className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                Are you sure you want to delete <span className="font-semibold text-purple-400">&quot;{formToDelete.title}&quot;</span>?
              </p>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium leading-relaxed">
                ⚠️ All the users who has filled the form will be deleted.
              </div>
              {deleteError && (
                <p className="text-xs text-red-500 font-medium">
                  {deleteError}
                </p>
              )}
            </div>

            {/* Buttons: Cancel & Confirm */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setFormToDelete(null)
                  setDeleteError(null)
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50",
                  isDark
                    ? "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    : "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200"
                )}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

