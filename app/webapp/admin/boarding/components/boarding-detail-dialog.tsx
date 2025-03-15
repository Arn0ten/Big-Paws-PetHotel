"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { BoardingOrder, PaymentStatus } from "../types"
import {
  formatDate,
  formatCurrency,
  isEligibleForRelease,
  calculateDuration,
  formatDuration,
  calculateAdditionalServicesTotal,
  calculateBasePrice,
} from "../utils/helpers"
import { CalendarClock, MapPin, Mail, Phone, PawPrint, LogOut, AlertTriangle, Info } from "lucide-react"
import { ReleaseConfirmationDialog } from "./release-confirmation-dialog"
import { ReceiptDialog } from "./receipt-dialog"
import { ConfirmationDialog } from "./confirmation-dialog"
import { DAYCARE_RATES, CAT_HOTEL_RATES } from "../types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BoardingDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  boardingOrder: BoardingOrder
  onUpdatePaymentStatus: (orderId: string, status: PaymentStatus) => void
  onReleasePet?: (orderId: string) => void
}

export function BoardingDetailDialog({
  open,
  onOpenChange,
  boardingOrder,
  onUpdatePaymentStatus,
  onReleasePet,
}: BoardingDetailDialogProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(boardingOrder.paymentStatus)
  const [releaseConfirmOpen, setReleaseConfirmOpen] = useState(false)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
  const [confirmationDialog, setConfirmationDialog] = useState({ open: false, action: "", status: "" })

  const handleUpdatePaymentStatus = (status: PaymentStatus) => {
    setConfirmationDialog({
      open: true,
      action: "update payment status",
      status: status,
    })
  }

  const confirmUpdatePaymentStatus = (status: PaymentStatus) => {
    setPaymentStatus(status)
    onUpdatePaymentStatus(boardingOrder.id, status)
    setConfirmationDialog({ open: false, action: "", status: "" })
  }

  const handleReleasePet = () => {
    setReleaseConfirmOpen(true)
  }

  const handleConfirmRelease = (orderId: string) => {
    if (onReleasePet) {
      onReleasePet(orderId)
      setReleaseConfirmOpen(false)
    }
  }

  const getBoardingStatusColor = (status: string) => {
    switch (status) {
      case "Boarding":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Done Boarding":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Released":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Not Paid":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const canReleasePet =
    (isEligibleForRelease(boardingOrder) || (boardingOrder.isOverdue && boardingOrder.paymentStatus === "Paid")) &&
    onReleasePet

  const isOverdue = boardingOrder.isOverdue

  const duration = calculateDuration(boardingOrder.startDate, boardingOrder.endDate, boardingOrder.boardingType)
  const formattedDuration = formatDuration(duration, boardingOrder.boardingType)

  const ACCOMMODATION_RATES = {
    Small: 25,
    Medium: 30,
    Large: 40,
    XLarge: 50,
  }

  const VACCINATION_REQUIREMENTS = ["Bordetella", "DHPP (Distemper, Hepatitis, Parvo, Parainfluenza)", "Rabies"]

  // Calculate prices
  const basePrice = calculateBasePrice(boardingOrder)
  const additionalServicesTotal = calculateAdditionalServicesTotal(boardingOrder)
  const totalPrice = boardingOrder.totalPrice

  // Get additional charges from the boardingOrder
  const additionalCharges = boardingOrder.additionalCharges || 0
  const additionalChargesReason = boardingOrder.additionalChargesReason || "Additional services"

  // Ensure only one dialog is open at a time
  const handleOpenReceiptDialog = () => {
    setReleaseConfirmOpen(false)
    setReceiptDialogOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-primary" />
              Boarding Details
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Order Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-medium">Order #{boardingOrder.id}</h3>
                <p className="text-sm text-muted-foreground">Created on {formatDate(boardingOrder.createdAt)}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className={getBoardingStatusColor(boardingOrder.boardingStatus)}>
                  {boardingOrder.boardingStatus}
                </Badge>
                <Badge variant="outline" className={getPaymentStatusColor(paymentStatus)}>
                  {paymentStatus}
                </Badge>
                {isOverdue && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Overdue Pickup
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Pet Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pet Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-auto flex justify-center">
                    <Image
                      src={boardingOrder.pet.imageUrl || "/placeholder.svg?height=80&width=80"}
                      alt={boardingOrder.pet.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="font-medium text-center sm:text-left">{boardingOrder.pet.name}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Type:</span> {boardingOrder.pet.type}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Breed:</span> {boardingOrder.pet.breed}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Size:</span> {boardingOrder.pet.size}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Age:</span> {boardingOrder.pet.age} years
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Owner Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{boardingOrder.owner.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{boardingOrder.owner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{boardingOrder.owner.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="break-words">{boardingOrder.owner.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Boarding Details Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  Boarding Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Service Type */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium">Service Type</span>
                      <p className="text-xs text-muted-foreground">
                        {boardingOrder.boardingType === "Daycare"
                          ? "Hourly care (8:00 AM - 7:00 PM)"
                          : boardingOrder.boardingType === "CatHotel"
                            ? `Cat Hotel - ${boardingOrder.catRoomType} Room`
                            : "24-Hour Accommodation"}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {boardingOrder.boardingType}
                    </Badge>
                  </div>

                  {/* Duration and Timing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Duration</span>
                      <p className="text-sm">{formattedDuration}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Rate</span>
                      <p className="text-sm">
                        {boardingOrder.boardingType === "Daycare"
                          ? `₱${DAYCARE_RATES[boardingOrder.pet.size]}/hour`
                          : boardingOrder.boardingType === "CatHotel"
                            ? `₱${CAT_HOTEL_RATES.Standard[boardingOrder.catAgeCategory || "Adult"]}/day`
                            : `₱${ACCOMMODATION_RATES[boardingOrder.pet.size]}/day`}
                      </p>
                    </div>
                  </div>

                  {/* Timing Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-in:</span>
                      <span>{formatDate(boardingOrder.startDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Check-out:</span>
                      <span>{formatDate(boardingOrder.endDate)}</span>
                    </div>
                    {boardingOrder.releaseTimestamp && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Released:</span>
                        <span>{formatDate(boardingOrder.releaseTimestamp)}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Pricing Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Rate:</span>
                        <span>{formatCurrency(basePrice)}</span>
                      </div>

                      {boardingOrder.additionalServices && boardingOrder.additionalServices.length > 0 && (
                        <>
                          {boardingOrder.additionalServices.map((service, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-muted-foreground flex items-center">
                                {service.name}
                                {service.requestId && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge
                                          variant="outline"
                                          className="ml-2 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                        >
                                          Request
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Added via service request</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                                {service.timestamp && (
                                  <span className="text-xs ml-2 text-muted-foreground">
                                    ({new Date(service.timestamp).toLocaleDateString()})
                                  </span>
                                )}
                              </span>
                              <span>{formatCurrency(service.price)}</span>
                            </div>
                          ))}

                          <div className="flex justify-between text-sm font-medium">
                            <span className="text-muted-foreground">Additional Services Total:</span>
                            <span>{formatCurrency(additionalServicesTotal)}</span>
                          </div>
                        </>
                      )}

                      {/* Display additional charges if present */}
                      {additionalCharges > 0 && (
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-muted-foreground flex items-center">
                            Additional Charges:
                            <span className="text-xs ml-2 text-muted-foreground">({additionalChargesReason})</span>
                          </span>
                          <span>{formatCurrency(additionalCharges)}</span>
                        </div>
                      )}

                      {boardingOrder.discounts?.map((discount, index) => (
                        <div key={index} className="flex justify-between text-sm text-green-600 dark:text-green-400">
                          <span>{discount.name}:</span>
                          <span>-{formatCurrency(discount.amount)}</span>
                        </div>
                      ))}

                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Amount</span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vaccination Requirements Notice */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3 mt-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2" />
                      <div>
                        <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Vaccination Requirements
                        </h5>
                        <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                          <ul className="list-disc pl-5 space-y-1">
                            {VACCINATION_REQUIREMENTS.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
              <Button
                variant={paymentStatus === "Paid" ? "default" : "outline"}
                onClick={() => handleUpdatePaymentStatus("Paid")}
                className="col-span-1"
                size="sm"
              >
                Paid
              </Button>
              <Button
                variant={paymentStatus === "Not Paid" ? "default" : "outline"}
                onClick={() => handleUpdatePaymentStatus("Not Paid")}
                className="col-span-1"
                size="sm"
              >
                Not Paid
              </Button>
              <Button
                variant={paymentStatus === "Pending" ? "default" : "outline"}
                onClick={() => handleUpdatePaymentStatus("Pending")}
                className="col-span-1"
                size="sm"
              >
                Pending
              </Button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {canReleasePet && (
                <Button onClick={handleReleasePet} className="flex-1 sm:flex-none" variant="default">
                  <LogOut className="mr-2 h-4 w-4" />
                  Release Pet
                </Button>
              )}

              {boardingOrder.boardingStatus === "Released" && (
                <Button onClick={handleOpenReceiptDialog} className="flex-1 sm:flex-none" variant="outline">
                  View Receipt
                </Button>
              )}

              <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ReleaseConfirmationDialog
        open={releaseConfirmOpen}
        onOpenChange={setReleaseConfirmOpen}
        boardingOrder={boardingOrder}
        onConfirmRelease={handleConfirmRelease}
      />

      <ReceiptDialog
        open={receiptDialogOpen}
        onOpenChange={setReceiptDialogOpen}
        boardingOrder={{ ...boardingOrder, totalPrice: totalPrice }}
      />

      <ConfirmationDialog
        open={confirmationDialog.open}
        onOpenChange={(open) => setConfirmationDialog({ ...confirmationDialog, open })}
        title={`Confirm Payment Status Update`}
        description={`Are you sure you want to mark this booking as ${confirmationDialog.status}?`}
        onConfirm={() => confirmUpdatePaymentStatus(confirmationDialog.status as PaymentStatus)}
      />

      {boardingOrder.lastModifiedBy && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 mt-4">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 mr-2" />
            <div>
              <h5 className="text-sm font-medium text-amber-800 dark:text-amber-200">Payment Status Updated</h5>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Last modified by {boardingOrder.lastModifiedBy} on {formatDate(boardingOrder.updatedAt)}
              </p>
              {boardingOrder.lastModificationReason && (
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Reason: {boardingOrder.lastModificationReason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

