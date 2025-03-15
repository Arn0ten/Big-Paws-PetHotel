"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface BoardingSuccessDialogProps {
  open: boolean
  onClose: () => void
  petName: string
}

export function BoardingSuccessDialog({ open, onClose, petName }: BoardingSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-center text-lg">
            Your booking for <span className="font-semibold">{petName}</span> has been confirmed.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            A confirmation email has been sent with all the details.
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

