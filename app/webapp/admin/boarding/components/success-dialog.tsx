"use client"

import { GlobalSuccessDialog } from "@/components/ui/global-success-dialog"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
}

export function SuccessDialog({ open, onOpenChange, title, description }: SuccessDialogProps) {
  return <GlobalSuccessDialog open={open} onOpenChange={onOpenChange} title={title} description={description} />
}

