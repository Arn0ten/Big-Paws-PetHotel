"use client"

/**
 * BACKEND INTEGRATION NOTES:
 *
 * This component displays detailed information about a boarding order and allows admins to:
 * 1. Update payment status
 * 2. Release pets
 * 3. View receipts for completed boardings
 *
 * Integration points:
 * - onUpdatePaymentStatus: Should call your API to update payment status
 * - onReleasePet: Should call your API to mark a pet as released
 * - Pricing calculations should match your backend business logic
 *
 * Data requirements:
 * - BoardingOrder object with complete pet, owner, and boarding details
 * - Payment history tracking
 * - Timestamps for all status changes
 */

import { useState } from "react"
import { IoLocationSharp } from "react-icons/io5"
import Image from "next/image"
import { IoIosListBox } from "react-icons/io"
import { BiSolidUserCheck } from "react-icons/bi"
import { FaPhone } from "react-icons/fa6"
import { TbMailFilled } from "react-icons/tb"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
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
  calculateAdditionalServicesTotal,
  calculateBasePrice,
} from "../utils/helpers"
import { FaTags } from "react-icons/fa6"
import { FaHourglassHalf } from "react-icons/fa"
import { GoHomeFill } from "react-icons/go"
import { FaCircleCheck } from "react-icons/fa6"
import { LogOut, AlertTriangle, Info } from "lucide-react"
import { ReleaseConfirmationDialog } from "./release-confirmation-dialog"
import { ReceiptDialog } from "./receipt-dialog"
import { ConfirmationDialog } from "./confirmation-dialog"
import { DAYCARE_RATES, CAT_HOTEL_RATES } from "../types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getIconBgColorClass } from "../../request-management/utils/ui-helpers"
import { IoReceipt } from "react-icons/io5"
import {BoardingDTO} from "@/types/boarding";
interface BoardingDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  boardingOrder: BoardingDTO
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
  const [paymentStatus, setPaymentStatus] = useState<string>(boardingOrder.paymentStatus)
  const [releaseConfirmOpen, setReleaseConfirmOpen] = useState(false)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    action: "",
    status: "",
  })

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

  const handleViewReceipt = () => {
    onOpenChange(false) // Close the boarding details dialog
    setReceiptDialogOpen(true) // Open the receipt dialog
  }

  const handleReceiptDialogClose = (open: boolean) => {
    setReceiptDialogOpen(open)
    if (!open) {
      onOpenChange(true) // Reopen the boarding details dialog when receipt is closed
    }
  }

  const getBoardingStatusColor = (status: string) => {
    switch (status) {
      case "BOARDING":
        return "bg-blue-600 hover:bg-blue-600 text-white min-w-[120px] flex justify-center"
      case "DONE_BOARDING":
        return "bg-green-600 hover:bg-green-600 text-white min-w-[120px] flex justify-center"
      case "RELEASED":
        return "bg-purple-600 hover:bg-purple-600 text-white min-w-[120px] flex justify-center"
      default:
        return "bg-gray-600 hover:bg-gray-600 text-white min-w-[120px] flex justify-center"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-600 hover:bg-green-600 text-white min-w-[120px] flex justify-center"
      case "PENDING":
        return "bg-yellow-600 hover:bg-yellow-600 text-white min-w-[120px] flex justify-center"
      default:
        return "bg-gray-600 hover:bg-gray-600 text-white min-w-[120px] flex justify-center"
    }
  }

  const getPetTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "dog":
        return "bg-blue-600 hover:bg-blue-600 text-white min-w-[80px] flex justify-center"
      case "cat":
        return "bg-purple-600 hover:bg-purple-600 text-white min-w-[80px] flex justify-center"
      default:
        return "bg-gray-600 hover:bg-gray-600 text-white min-w-[80px] flex justify-center"
    }
  }

  const canReleasePet =
    (isEligibleForRelease(boardingOrder) || (boardingOrder.overdue && boardingOrder.paymentStatus === "PAID")) &&
    onReleasePet

  const isOverdue = boardingOrder.overdue

  // Calculate duration in both days and hours
  const durationInHours = calculateDuration(boardingOrder.boardingStart, boardingOrder.boardingEnd, "DAYCARE")
  const durationInDays = calculateDuration(boardingOrder.boardingStart, boardingOrder.boardingEnd, "LONG_STAY")

  // Format the duration based on boarding type
  const formattedDuration =
    boardingOrder.boardingType === "DAYCARE"
      ? `${durationInHours} hour${durationInHours !== 1 ? "s" : ""}`
      : `${durationInDays} day${durationInDays !== 1 ? "s" : ""}`

  // Combined duration display
  const combinedDuration = `${durationInDays} day${durationInDays !== 1 ? "s" : ""} / ${durationInHours} hour${durationInHours !== 1 ? "s" : ""}`

  const ACCOMMODATION_RATES = {
    Small: 25,
    Medium: 30,
    Large: 40,
    XLarge: 50,
  }

  // Calculate prices
  const basePrice = calculateBasePrice(boardingOrder)
  const additionalServicesTotal = calculateAdditionalServicesTotal(boardingOrder)
  const totalPrice = boardingOrder.total

  // Get additional charges from the boardingOrder
  const additionalCharges = boardingOrder.requestBreakdown || 0
  const additionalChargesReason = boardingOrder.requestBreakdown || "Additional services"

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          {/* <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              Boarding Details
            </DialogTitle>
          </DialogHeader> */}

          <div className="grid gap-4 py-2">
            {/* Order Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-muted/30 p-3 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">Order #{boardingOrder.id}</h3>
                <p className="text-sm text-muted-foreground">Created on {formatDate(boardingOrder.createdAt)}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className={getBoardingStatusColor(boardingOrder.boardingStatus)}>
                  {boardingOrder.boardingStatus}
                </Badge>
                <Badge variant="secondary" className={getPaymentStatusColor(paymentStatus)}>
                  {paymentStatus}
                </Badge>
                {isOverdue && (
                  <Badge
                    variant="secondary"
                    className="bg-red-600 hover:bg-red-600 text-white min-w-[120px] flex justify-center"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" /> Overdue
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pet Information */}
              <Card>
                <CardHeader className="pb-2"></CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src={boardingOrder.photoUrl || "/placeholder.svg?height=80&width=80" || "/placeholder.svg"}
                        alt={boardingOrder.petName}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-2">{boardingOrder.petName}</h4>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">TYPE:</span>
                          <Badge variant="secondary" className={getPetTypeColor(boardingOrder.petType)}>
                            {boardingOrder.petType}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">BREED:</span>
                          <span className="text-sm text-right">{boardingOrder.petBreed}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">SIZE:</span>
                          <span className="text-sm">{boardingOrder.petSize}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">AGE:</span>
                          <span className="text-sm">{boardingOrder.age} years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">PET OWNER</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BiSolidUserCheck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-semibold text-base">{boardingOrder.ownerName}</span>
                    </div>
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <TbMailFilled className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{boardingOrder.ownerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FaPhone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>{boardingOrder.ownerPhoneNumber}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <IoLocationSharp className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="break-words">{boardingOrder.ownerAddress}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Boarding Details Section */}
            <Card>
              {/* <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  BOARDING DETAILS
                </CardTitle>
              </CardHeader> */}
              <CardContent>
                <div className="space-y-4">
                  {/* Service Type and Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-3 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FaTags className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">SERVICE TYPE</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {boardingOrder.boardingType === "DAYCARE"
                            ? "Hourly care (8:00 AM - 7:00 PM)"
                            : boardingOrder.boardingType === "CatHotel"
                              ? `Cat Hotel Room`
                              : "24-Hour Accommodation"}
                        </span>
                        <Badge
                          variant="outline"
                          className={getIconBgColorClass(boardingOrder.boardingType.toLowerCase())}
                        >
                          {boardingOrder.boardingType}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FaHourglassHalf className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">DURATION</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Total stay length</span>
                        <span className="text-sm font-medium">{combinedDuration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timing Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-3 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <GoHomeFill className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">CHECK-IN / CHECK-OUT</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-medium">Check-in:</span>
                          <span>{formatDate(boardingOrder.boardingStart)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-medium">Check-out:</span>
                          <span>{formatDate(boardingOrder.boardingEnd)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {boardingOrder.releasedAt ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <FaCircleCheck className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold">RELEASED</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Released on:</span>
                            <span>{formatDate(boardingOrder.releasedAt)}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <FaTags className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold">RATE</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Base Rate:</span>
                            <span>
                              {boardingOrder.boardingType === "DAYCARE"
                                ? `₱${boardingOrder.rate * 24}/hour`
                                : boardingOrder.boardingType === "CatHotel"
                                  ? `₱${boardingOrder.rate}/hour`
                                  : `₱${boardingOrder.rate * 24}/day`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground font-medium">PET SIZE:</span>
                            <span>{boardingOrder.petSize}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border rounded-lg p-3 mt-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <IoIosListBox className="h-4 w-4 text-primary" />
                      PRICING BREAKDOWN
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">BOARDING PRICE:</span>
                        <span>{formatCurrency(basePrice)}</span>
                      </div>

                      {boardingOrder.requestBreakdown && boardingOrder.requestBreakdown.length > 0 && (
                        <>
                          <Separator className="my-2" />
                          <h5 className="text-sm font-medium mb-2">Additional Services</h5>
                          {boardingOrder.requestBreakdown.map((service, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-muted-foreground flex items-center">
                                {service.requestName}
                                {service.id && (
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
                                {service.createdAt && (
                                  <span className="text-xs ml-2 text-muted-foreground">
                                    ({new Date(service.createdAt).toLocaleDateString()})
                                  </span>
                                )}
                              </span>
                              <span>{formatCurrency(service.total)}</span>
                            </div>
                          ))}

                          {/* <div className="flex justify-between text-sm font-medium">
                              <span className="text-muted-foreground">
                                Additional Services Total:
                              </span>
                              <span>
                                {formatCurrency(additionalServicesTotal)}
                              </span>
                            </div> */}
                        </>
                      )}

                      {/* Display additional charges if present */}
                      {boardingOrder.requestBreakdown.length > 0 && (
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-muted-foreground flex items-center">
                            Additional Charges:
                            <span className="text-xs ml-2 text-muted-foreground">()</span>
                          </span>
                          <span>{formatCurrency(totalPrice)}</span>
                        </div>
                      )}

                      <Separator className="my-2" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Amount</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section (if available) */}
            {boardingOrder.notes && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    NOTES
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{boardingOrder.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <div className="flex gap-2 w-full sm:w-auto">
              {canReleasePet && (
                <Button onClick={handleReleasePet} className="flex-1 sm:flex-none" variant="default">
                  <LogOut className="mr-2 h-4 w-4" />
                  Release Pet
                </Button>
              )}

              {boardingOrder.boardingStatus === "Released" && (
                <Button onClick={handleViewReceipt} className="flex-1 sm:flex-none" variant="outline">
                  <IoReceipt className="mr-2 h-4 w-4" />
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
        onOpenChange={handleReceiptDialogClose}
        boardingOrder={{ ...boardingOrder, total: totalPrice }}
        showBackButton={true}
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
