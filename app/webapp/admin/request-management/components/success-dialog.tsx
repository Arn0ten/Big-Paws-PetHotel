"use client"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, Video, Scissors, Clock, FileText, CheckCircle } from "lucide-react"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  type: "photo" | "video" | "grooming" | "boarding-extension" | "custom" | string
}

export function SuccessDialog({ open, onOpenChange, title, description, type }: SuccessDialogProps) {
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
              {type === "photo" && <Camera className="h-6 w-6 text-blue-500" />}
              {type === "video" && <Video className="h-6 w-6 text-purple-500" />}
              {type === "grooming" && <Scissors className="h-6 w-6 text-green-500" />}
              {type === "boarding-extension" && <Clock className="h-6 w-6 text-amber-500" />}
              {type === "custom" && <FileText className="h-6 w-6 text-gray-500" />}
              {!type && <CheckCircle className="h-6 w-6 text-green-500" />}
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

