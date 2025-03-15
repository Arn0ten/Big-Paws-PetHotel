"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: "delete" | "edit" | "board" | "endBoarding"
  title: string
  description: string
  isLoading?: boolean
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  description,
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={type === "delete" ? "text-destructive" : "text-primary"}>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {title}
            </div>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {type === "delete" && (
          <div className="flex items-center gap-2 p-4 bg-destructive/10 rounded-md">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm text-destructive">This action cannot be undone.</p>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={
              type === "delete"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : type === "delete" ? (
              "Delete"
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function SuccessDialog({ isOpen, onClose, title, description, actionLabel, onAction }: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <motion.div
          className="flex items-center justify-center flex-col text-center py-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">{title}</h3>
          <p className="text-green-600 dark:text-green-400 mb-6">{description}</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
              Close
            </Button>
            {actionLabel && onAction && (
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onAction}>
                {actionLabel}
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

