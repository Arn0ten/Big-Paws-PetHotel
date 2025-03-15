"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface RequestDialogProps {
  request: any
  isOpen: boolean
  onClose: () => void
  onStatusChange: (id: string, status: string, additionalServices?: string[], extendedDays?: number) => void
}

export function RequestDialog({ request, isOpen, onClose, onStatusChange }: RequestDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState(request?.status || "")
  const [additionalServices, setAdditionalServices] = useState<string[]>([])
  const [extendedDays, setExtendedDays] = useState(0)
  const [additionalCost, setAdditionalCost] = useState(0)
  const [showPaymentUpdatedDialog, setShowPaymentUpdatedDialog] = useState(false)

  // Reset state when request changes
  useEffect(() => {
    if (request) {
      setSelectedStatus(request.status)
      setAdditionalServices([])
      setExtendedDays(0)
      setAdditionalCost(0)
    }
  }, [request])

  // Calculate additional cost when services or extended days change
  useEffect(() => {
    let cost = 0
    // Add cost for additional services
    additionalServices.forEach((service) => {
      switch (service) {
        case "grooming":
          cost += 30
          break
        case "training":
          cost += 45
          break
        case "special-diet":
          cost += 20
          break
        default:
          break
      }
    })

    // Add cost for extended days (assuming $25 per day)
    cost += extendedDays * 25

    setAdditionalCost(cost)
  }, [additionalServices, extendedDays])

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
  }

  const handleServiceToggle = (service: string) => {
    setAdditionalServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const handleExtendedDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = Number.parseInt(e.target.value) || 0
    setExtendedDays(Math.max(0, days))
  }

  const handleSubmit = () => {
    onStatusChange(request.id, selectedStatus, additionalServices, extendedDays)

    // Show payment updated dialog if there are additional costs and status is completed
    if (additionalCost > 0 && selectedStatus === "completed") {
      setShowPaymentUpdatedDialog(true)
    } else {
      toast({
        title: "Request Updated",
        description: `The request status has been updated to ${selectedStatus}.`,
      })
      onClose()
    }
  }

  const handlePaymentDialogClose = () => {
    setShowPaymentUpdatedDialog(false)
    toast({
      title: "Request Updated",
      description: `The request status has been updated to ${selectedStatus}.`,
    })
    onClose()
  }

  if (!request) return null

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      "in-progress": "bg-amber-100 text-amber-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }

    return (
      <Badge className={`${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <>
      <Dialog open={isOpen && !showPaymentUpdatedDialog} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Request Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Request ID</span>
              <span className="text-base">#{request.id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">Current Status</span>
              {getStatusBadge(request.status)}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">Pet Owner</span>
              <span className="text-base">{request.petOwner}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">Pet Name</span>
              <span className="text-base">{request.petName}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">Service</span>
              <span className="text-base">{request.service}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">Dates</span>
              <span className="text-base">
                {formatDate(request.startDate)} - {formatDate(request.endDate)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">Total Amount</span>
              <span className="text-base font-semibold">${request.totalAmount.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4">
              <span className="text-sm font-bold text-gray-700">Update Status</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["new", "in-progress", "completed", "rejected"].map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    onClick={() => handleStatusChange(status)}
                    className="justify-start"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {selectedStatus === "completed" && (
              <div className="border-t pt-4">
                <span className="text-sm font-bold text-gray-700 mb-2 block">Additional Services</span>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="grooming"
                      checked={additionalServices.includes("grooming")}
                      onCheckedChange={() => handleServiceToggle("grooming")}
                    />
                    <Label htmlFor="grooming">Grooming ($30)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="training"
                      checked={additionalServices.includes("training")}
                      onCheckedChange={() => handleServiceToggle("training")}
                    />
                    <Label htmlFor="training">Training Session ($45)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="special-diet"
                      checked={additionalServices.includes("special-diet")}
                      onCheckedChange={() => handleServiceToggle("special-diet")}
                    />
                    <Label htmlFor="special-diet">Special Diet ($20)</Label>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="extended-days" className="text-sm font-bold text-gray-700">
                    Extended Stay (Days)
                  </Label>
                  <input
                    id="extended-days"
                    type="number"
                    min="0"
                    value={extendedDays}
                    onChange={handleExtendedDaysChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                  <p className="text-xs text-gray-500 mt-1">$25 per additional day</p>
                </div>

                {additionalCost > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                    <span className="text-sm font-bold text-gray-700">Additional Cost</span>
                    <span className="text-base font-semibold block">${additionalCost.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">
                      This will be added to the original amount of ${request.totalAmount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Update Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Updated Dialog - shown sequentially after the main dialog */}
      <Dialog open={showPaymentUpdatedDialog} onOpenChange={handlePaymentDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Boarding Payment Updated</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <p>The payment for this boarding request has been updated with the following additional charges:</p>

            {additionalServices.length > 0 && (
              <div>
                <span className="text-sm font-bold text-gray-700 block">Additional Services:</span>
                <ul className="list-disc pl-5 mt-1">
                  {additionalServices.includes("grooming") && <li>Grooming: $30.00</li>}
                  {additionalServices.includes("training") && <li>Training Session: $45.00</li>}
                  {additionalServices.includes("special-diet") && <li>Special Diet: $20.00</li>}
                </ul>
              </div>
            )}

            {extendedDays > 0 && (
              <div>
                <span className="text-sm font-bold text-gray-700 block">Extended Stay:</span>
                <p>
                  {extendedDays} additional day(s) at $25.00 per day: ${(extendedDays * 25).toFixed(2)}
                </p>
              </div>
            )}

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-sm font-bold text-gray-700">Original Amount:</span>
                <span>${request.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold text-gray-700">Additional Charges:</span>
                <span>${additionalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-sm font-bold text-gray-700">New Total:</span>
                <span>${(request.totalAmount + additionalCost).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handlePaymentDialogClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

