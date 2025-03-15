"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import type { Request } from "@/types"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: Request | null
}

export function SuccessDialog({ open, onOpenChange, request }: SuccessDialogProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false)
      }, 5000) // Auto-close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [open, onOpenChange])

  if (!request) return null

  // Determine success message based on request type
  let successTitle = "Request Completed"
  let successMessage = `The request for ${request.petName} has been processed successfully.`

  switch (request.type) {
    case "photo":
      successTitle = "Photo Request Completed"
      successMessage = `Photos for ${request.petName} have been uploaded and the owner has been notified.`
      break
    case "video":
      successTitle = "Video Request Completed"
      successMessage = `Videos for ${request.petName} have been uploaded and the owner has been notified.`
      break
    case "extend-stay":
      successTitle = "Stay Extended"
      successMessage = `${request.petName}'s boarding stay has been extended and the owner has been notified.`
      break
    case "grooming":
      successTitle = "Grooming Scheduled"
      successMessage = `Grooming for ${request.petName} has been scheduled and the owner has been notified.`
      break
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center text-center mb-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center text-xl">{successTitle}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-muted-foreground">{successMessage}</p>

          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-2">Next Steps:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>An email confirmation has been sent to the pet owner</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The request has been moved to the "Completed" tab</span>
              </li>
              {request.type === "photo" || request.type === "video" ? (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The owner can view their media via the link in the email</span>
                </li>
              ) : null}
              {request.type === "grooming" ? (
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The grooming session has been added to the calendar</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

