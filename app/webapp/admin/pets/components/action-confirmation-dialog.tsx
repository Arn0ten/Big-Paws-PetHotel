"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export type ConfirmationStatus = "success" | "error" | "warning" | null

interface ActionConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  status: ConfirmationStatus
  autoCloseDelay?: number
}

export function ActionConfirmationDialog({
  isOpen,
  onClose,
  title,
  message,
  status,
  autoCloseDelay = 3000,
}: ActionConfirmationDialogProps) {
  const [timeRemaining, setTimeRemaining] = useState(autoCloseDelay / 1000)

  useEffect(() => {
    if (!isOpen) return

    // Reset timer when dialog opens
    setTimeRemaining(autoCloseDelay / 1000)

    // Auto-close timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, autoCloseDelay, onClose])

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "error":
        return <XCircle className="h-8 w-8 text-red-500" />
      case "warning":
        return <AlertCircle className="h-8 w-8 text-amber-500" />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-500 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900"
      case "error":
        return "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900"
      case "warning":
        return "text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900"
      default:
        return "border-muted bg-background"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {getStatusIcon()}
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className={`p-4 rounded-md border ${getStatusColor()}`}>
          <p className="text-center">{message}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-muted-foreground">Auto-closing in {timeRemaining}s</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

