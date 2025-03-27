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
import {
  Camera,
  Video,
  Scissors,
  Clock,
  FileText,
  CheckCircle,
  PlusCircle,
  Edit,
  Trash2,
  Hotel,
  DollarSign,
  Ban,
  LogOut,
  User,
  History,
} from "lucide-react"

export type SuccessDialogType =
  | "photo"
  | "video"
  | "grooming"
  | "boarding-extension"
  | "custom"
  | "add-pet"
  | "edit-pet"
  | "delete-pet"
  | "board-pet"
  | "end-boarding"
  | "add-owner"
  | "edit-owner"
  | "delete-owner"
  | "mark-paid"
  | "mark-pending"
  | "release-boarding"
  | "delete-history"
  | "delete-media"
  | string

interface GlobalSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  type?: SuccessDialogType
  actionLabel?: string
  onAction?: () => void
}

export function GlobalSuccessDialog({
  open,
  onOpenChange,
  title,
  description,
  type = "custom",
  actionLabel,
  onAction,
}: GlobalSuccessDialogProps) {
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
      case "add-pet":
        return <PlusCircle className="h-6 w-6 text-green-500" />
      case "edit-pet":
        return <Edit className="h-6 w-6 text-blue-500" />
      case "delete-pet":
        return <Trash2 className="h-6 w-6 text-red-500" />
      case "board-pet":
        return <Hotel className="h-6 w-6 text-amber-500" />
      case "end-boarding":
        return <LogOut className="h-6 w-6 text-purple-500" />
      case "add-owner":
        return <User className="h-6 w-6 text-green-500" />
      case "edit-owner":
        return <Edit className="h-6 w-6 text-blue-500" />
      case "delete-owner":
        return <Trash2 className="h-6 w-6 text-red-500" />
      case "mark-paid":
        return <DollarSign className="h-6 w-6 text-green-500" />
      case "mark-pending":
        return <Ban className="h-6 w-6 text-amber-500" />
      case "release-boarding":
        return <LogOut className="h-6 w-6 text-blue-500" />
      case "delete-history":
        return <History className="h-6 w-6 text-red-500" />
      case "delete-media":
        return <Trash2 className="h-6 w-6 text-red-500" />
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

