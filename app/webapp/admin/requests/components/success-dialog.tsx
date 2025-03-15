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
import { CheckCircle, Camera, Video, Scissors, Clock, FileText } from "lucide-react"
import { motion } from "framer-motion"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  type?: string
}

export function SuccessDialog({ open, onOpenChange, title, description, type = "default" }: SuccessDialogProps) {
  // Get icon based on request type
  const getIcon = () => {
    switch (type) {
      case "photo":
        return <Camera className="h-6 w-6 text-blue-500" />
      case "video":
        return <Video className="h-6 w-6 text-purple-500" />
      case "grooming":
        return <Scissors className="h-6 w-6 text-green-500" />
      case "boarding-extension":
        return <Clock className="h-6 w-6 text-amber-500" />
      case "custom":
        return <FileText className="h-6 w-6 text-gray-500" />
      default:
        return <CheckCircle className="h-6 w-6 text-green-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.1,
              }}
            >
              {getIcon()}
            </motion.div>
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

