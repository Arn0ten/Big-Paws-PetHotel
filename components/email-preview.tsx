"use client"

import { useState } from "react"
import { getEmailTemplate } from "@/lib/email"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { RequestType } from "@/types"

interface EmailPreviewProps {
  requestType: RequestType
  petName: string
  ownerName: string
  completionDetails: string
  mediaUrl?: string
  extensionDays?: number
  groomingDate?: string
}

export function EmailPreview({
  requestType,
  petName,
  ownerName,
  completionDetails,
  mediaUrl,
  extensionDays,
  groomingDate,
}: EmailPreviewProps) {
  const [open, setOpen] = useState(false)

  // Determine email template based on request type
  let emailTemplate: "request-processed" | "boarding-extended" | "grooming-scheduled" | "media-ready"

  switch (requestType) {
    case "extend-stay":
      emailTemplate = "boarding-extended"
      break
    case "grooming":
      emailTemplate = "grooming-scheduled"
      break
    case "photo":
    case "video":
      emailTemplate = "media-ready"
      break
    default:
      emailTemplate = "request-processed"
  }

  // Get the email HTML content
  const emailHtml = getEmailTemplate(emailTemplate, {
    to: "example@example.com", // Not actually used in preview
    subject: `Request for ${petName} Processed`,
    html: "", // Will be populated by the template
    from: "pet.boarding@example.com",
    petName,
    ownerName,
    requestType,
    completionDetails,
    mediaUrl,
    extensionDays,
    groomingDate,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          Preview Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4 border rounded-md p-4 max-h-[60vh] overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
        </div>
        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          <p>This email will be sent to the pet owner when the request is processed.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

