"use client"

// Create a simple toast hook for notifications

import { useState } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastOptions {
  title: string
  description: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastOptions {
  id: string
  visible: boolean
}

// This is a simplified version of the toast hook
// In a real application, you would use a more robust toast library
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      visible: true,
      duration: 3000,
      variant: "default",
      ...options,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, newToast.duration)

    return id
  }

  return { toast, toasts }
}

