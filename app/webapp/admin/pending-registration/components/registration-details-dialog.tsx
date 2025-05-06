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
import { User, MapPin, Calendar } from "lucide-react"
import { formatDate } from "@/app/webapp/admin/request-management/utils/ui-helpers"
import type { PendingRegistration } from "../types"

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6"
import { IoMail } from "react-icons/io5"
import { FaPhone } from "react-icons/fa6"

interface RegistrationDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration: PendingRegistration
  onApprove: () => void
  onReject: () => void
}

export function RegistrationDetailsDialog({
  open,
  onOpenChange,
  registration,
  onApprove,
  onReject,
}: RegistrationDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Registration Details</DialogTitle>
          <DialogDescription>Review the registration information before making a decision.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 bg-muted/40 p-3 rounded-md">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="font-medium">{registration.fullName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 bg-muted/40 p-3 rounded-md">
                  <IoMail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{registration.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-muted/40 p-3 rounded-md">
                  <FaPhone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{registration.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 bg-muted/40 p-3 rounded-md">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Address</p>
                  <p>
                    {registration.fullAddress ||
                      `${registration.address}, ${registration.city}, ${registration.province}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 bg-muted/40 p-3 rounded-md">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                  <p>{formatDate(registration.registrationDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-red-600 bg-red-600 hover:bg-red-700 text-white hover:text-white"
              onClick={() => {
                onOpenChange(false)
                setTimeout(onReject, 100)
              }}
            >
              <FaThumbsDown className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                onOpenChange(false)
                setTimeout(onApprove, 100)
              }}
            >
              <FaThumbsUp className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
