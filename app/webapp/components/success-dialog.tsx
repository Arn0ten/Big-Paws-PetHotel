"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SuccessDialogProps {
  title: string
  message: string
  isOpen: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

/**
 * SuccessDialog Component
 *
 * This component provides visual feedback for successful actions.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The dialog title
 * @param {string} props.message - The dialog message
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onClose - Function to close the dialog
 * @param {boolean} props.autoClose - Whether to automatically close the dialog
 * @param {number} props.autoCloseTime - Time in ms before auto-closing
 * @returns {JSX.Element} The success dialog component
 */
export default function SuccessDialog({
  title,
  message,
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}: SuccessDialogProps) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)

    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Allow exit animation to complete
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoClose, autoCloseTime, onClose])

  if (!isOpen && !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-md rounded-lg border border-border p-6 shadow-lg",
              "bg-background dark:bg-background",
            )}
          >
            <div className="absolute right-4 top-4">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>

              <h2 className="mb-2 text-xl font-semibold text-foreground dark:text-foreground">{title}</h2>

              <p className="mb-6 text-muted-foreground dark:text-muted-foreground/90">{message}</p>

              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white"
                onClick={onClose}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

