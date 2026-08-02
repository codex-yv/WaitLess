"use client"

import React, { use } from "react"
import { useParams } from "next/navigation"
import { LiveQueuePage } from "@/components/live-queue/LiveQueuePage"

export default function LiveQueueFormPage({ params }: { params?: Promise<{ formId: string }> | { formId: string } }) {
  const routeParams = useParams()
  let formId = routeParams?.formId as string

  if (!formId && params) {
    if (params instanceof Promise) {
      const resolved = use(params)
      formId = resolved?.formId
    } else {
      formId = params.formId
    }
  }

  return <LiveQueuePage formId={formId} />
}
