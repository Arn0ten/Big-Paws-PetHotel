"use client"

import { useState } from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaTrashCan } from "react-icons/fa6"
import { IoReceipt } from "react-icons/io5"
import { FaCheckCircle } from "react-icons/fa"
import { MdOutlineMoreHoriz } from "react-icons/md"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Loader2, PoundSterlingIcon as PhilippinePesoIcon } from "lucide-react"
import type { BoardingOrder, PaymentStatus } from "../types"
import { GoCheckCircleFill } from "react-icons/go"
import { FaRegHourglassHalf } from "react-icons/fa6"
import { formatDate, calculateDuration, isEligibleForRelease, isEligibleForForceRelease } from "../utils/helpers"
import { BoardingDetailDialog } from "./boarding-detail-dialog"
import { ReceiptDialog } from "./receipt-dialog"
import { ConfirmationDialog } from "./confirmation-dialog"
import { IoAlertCircle } from "react-icons/io5"
import { FaShieldDog, FaShieldCat } from "react-icons/fa6"
import { FaSignOutAlt } from "react-icons/fa"
import { MdPendingActions } from "react-icons/md"
interface BoardingTableProps {
  boardingOrders: BoardingOrder[]
  onUpdatePaymentStatus: (orderId: string, status: PaymentStatus) => void
  onReleasePet?: (orderId: string) => void
  onForceRelease?: (orderId: string) => void
  onDeleteRecord?: (orderId: string) => void
  isReadOnly?: boolean
  tabName: string
  isProcessing?: boolean
}

export function BoardingTable({
  boardingOrders,
  onUpdatePaymentStatus,
  onReleasePet,
  onForceRelease,
  onDeleteRecord,
  isReadOnly = false,
  tabName = "",
  isProcessing = false,
}: {
  boardingOrders: BoardingOrder[]
  onUpdatePaymentStatus: (orderId: string, status: PaymentStatus) => void
  onReleasePet?: (orderId: string) => void
  onForceRelease?: (orderId: string) => void
  onDeleteRecord?: (orderId: string) => void
  isReadOnly?: boolean
  tabName?: string
  isProcessing?: boolean
}) {
  const [selectedOrder, setSelectedOrder] = useState<BoardingOrder | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  const handleViewDetails = (order: BoardingOrder) => {
    setSelectedOrder(order)
    setDetailDialogOpen(true)
  }

  const handleViewReceipt = (order: BoardingOrder) => {
    setSelectedOrder(order)
    setReceiptDialogOpen(true)
  }

  const handleUpdatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    if (!isReadOnly) {
      onUpdatePaymentStatus(orderId, status)
    }
  }

  const handleReleasePet = (orderId: string) => {
    if (onReleasePet && !isReadOnly) {
      onReleasePet(orderId)
    }
  }

  const handleForceRelease = (orderId: string) => {
    if (onForceRelease && !isReadOnly) {
      onForceRelease(orderId)
    }
  }

  const handleRowClick = (order: BoardingOrder) => {
    setSelectedOrder(order)
    setDetailDialogOpen(true)
  }

  const getBoardingStatusColor = (status: string) => {
    switch (status) {
      case "Boarding":
        return "bg-blue-600 hover:bg-blue-600 text-white min-w-[100px] flex justify-center"
      case "Done Boarding":
        return "bg-green-600 hover:bg-green-600 text-white min-w-[100px] flex justify-center"
      case "Released":
        return "bg-purple-600 hover:bg-purple-600 text-white min-w-[100px] flex justify-center"
      default:
        return "bg-gray-600 hover:bg-gray-600 text-white min-w-[100px] flex justify-center"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-600 hover:bg-green-600 text-white min-w-[100px] flex justify-center"
      case "Pending":
        return "bg-yellow-600 hover:bg-yellow-600 text-white min-w-[100px] flex justify-center"
      default:
        return "bg-gray-600 hover:bg-gray-600 text-white min-w-[100px] flex justify-center"
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

  const getPetTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "dog":
        return <FaShieldDog className="h-3 w-3 mr-1" />
      case "cat":
        return <FaShieldCat className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  const handleDeleteRecord = (orderId: string) => {
    setSelectedOrder(boardingOrders.find((order) => order.id === orderId) || null)
    setDeleteConfirmationOpen(true)
  }

  const confirmDelete = () => {
    if (selectedOrder && onDeleteRecord) {
      onDeleteRecord(selectedOrder.id)
      setDeleteConfirmationOpen(false)
    }
  }

  // Format duration to show both days and hours
  const formatDuration = (order: BoardingOrder) => {
    const durationInHours = calculateDuration(order.startDate, order.endDate, "Daycare")
    const durationInDays = calculateDuration(order.startDate, order.endDate, "LongStay")

    if (order.boardingType === "Daycare") {
      return `${durationInHours} hour${durationInHours !== 1 ? "s" : ""}`
    }

    return `${durationInDays} day${durationInDays !== 1 ? "s" : ""}`
  }

  // Create an array of 6 items, filled with actual data or empty placeholder rows
  const tableRows = Array(6)
    .fill(null)
    .map((_, index) => boardingOrders[index] || null)

  return (
    <>
      <div className="rounded-md border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Center-align all column header texts */}
                <TableHead className="w-[80px] text-center">Pet</TableHead>
                <TableHead className="text-center">Pet Name</TableHead>
                <TableHead className="hidden md:table-cell text-center">Owner</TableHead>
                <TableHead className="text-center">Pet Type</TableHead>
                <TableHead className="hidden lg:table-cell text-center">Type</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  <div className="flex items-center justify-center">
                    <FaRegHourglassHalf className="h-4 w-4 mr-1" />
                    <span>Duration</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Payment</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {boardingOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-[432px] text-center">
                    {tabName} is empty
                  </TableCell>
                </TableRow>
              ) : (
                tableRows.map((order, index) => (
                  <TableRow
                    key={order ? order.id : `empty-${index}`}
                    className={`${order?.isOverdue ? "bg-red-50 dark:bg-red-950/20" : ""} 
    ${
      order?.additionalServices && order?.additionalServices.length > 0 && order?.paymentStatus === "Pending"
        ? "bg-amber-50 dark:bg-amber-950/20"
        : ""
    } 
    ${order ? "cursor-pointer hover:bg-muted/50" : ""}`}
                    onClick={() => order && handleRowClick(order)}
                  >
                    {order ? (
                      <>
                        <TableCell>
                          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                            <Image
                              src={order.pet.imageUrl || "/placeholder.svg?height=40&width=40" || "/placeholder.svg"}
                              alt={order.pet.name}
                              width={40}
                              height={40}
                              className="object-cover w-10 h-10"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{order.pet.name}</span>
                            <span className="text-xs text-muted-foreground">{order.pet.breed}</span>
                            {order.isOverdue && (
                              <div className="flex items-center text-xs text-red-600 mt-1">
                                <IoAlertCircle className="h-3 w-3 mr-1 flex-shrink-0" /> Overdue
                              </div>
                            )}
                            {order.additionalServices &&
                              order.additionalServices.length > 0 &&
                              order.paymentStatus === "Pending" && (
                                <div className="flex items-center text-xs text-amber-600 mt-1">
                                  <PhilippinePesoIcon className="h-3 w-3 mr-1 flex-shrink-0" /> Additional charges
                                </div>
                              )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <span>{order.owner.name}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                              {order.owner.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getPetTypeColor(order.pet.type)}>
                            <div className="flex items-center justify-center w-full">
                              {getPetTypeIcon(order.pet.type)}
                              {order.pet.type}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-col">
                            <span>{order.boardingType}</span>
                            <span className="text-xs text-muted-foreground">
                              {order.boardingType === "Daycare" ? "Hourly" : "Overnight"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex flex-col">
                            <span className="text-sm">{formatDuration(order)}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(order.startDate).split(",")[0]}
                            </span>
                          </div>
                        </TableCell>
                        {/* Ensure status badges display on a single line */}
                        <TableCell className="whitespace-nowrap">
                          <div className="flex justify-center">
                            <Badge variant="secondary" className={`${getBoardingStatusColor(order.boardingStatus)}`}>
                              {order.boardingStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        {/* Ensure payment status badges display on a single line */}
                        <TableCell className="whitespace-nowrap">
                          <div className="flex justify-center">
                            <Badge variant="secondary" className={`${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            {(isEligibleForRelease(order) || (order.isOverdue && order.paymentStatus === "Paid")) &&
                              onReleasePet &&
                              !isReadOnly && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleReleasePet(order.id)}
                                  title="Release Pet"
                                  className="bg-green-600 hover:bg-green-700 text-white w-[100px]"
                                >
                                  <GoCheckCircleFill className="h-3.5 w-3.5 mr-1" />
                                  Release
                                </Button>
                              )}
                            {isEligibleForForceRelease(order) && onForceRelease && !isReadOnly && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleForceRelease(order.id)}
                                title="Force Release Pet"
                                className="bg-amber-600 hover:bg-amber-700 text-white w-[100px]"
                              >
                                <FaSignOutAlt className="h-3.5 w-3.5 mr-1" />
                                Force
                              </Button>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="border rounded-md">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {isReadOnly ? (
                                  <>
                                    <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                                      <MdOutlineMoreHoriz className="h-4 w-4 mr-2 text-blue-600" />
                                      View Boarding Details
                                    </DropdownMenuItem>
                                    {order.boardingStatus === "Released" && (
                                      <>
                                        <DropdownMenuItem onClick={() => handleViewReceipt(order)}>
                                          <IoReceipt className="h-4 w-4 mr-2 text-purple-600" />
                                          View Receipt
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleDeleteRecord(order.id)}
                                          className="text-red-600"
                                        >
                                          <FaTrashCan className="h-4 w-4 mr-2" />
                                          Delete Record
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                                      <MdOutlineMoreHoriz className="h-4 w-4 mr-2 text-blue-600" />
                                      View Boarding Details
                                    </DropdownMenuItem>
                                    {order.paymentStatus !== "Paid" && (
                                      <DropdownMenuItem
                                        onClick={() => onUpdatePaymentStatus(order.id, "Paid")}
                                        className="text-green-600"
                                        disabled={isProcessing}
                                      >
                                        {isProcessing ? (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                          <FaCheckCircle className="mr-2 h-4 w-4" />
                                        )}
                                        Mark as Paid
                                      </DropdownMenuItem>
                                    )}
                                    {order.paymentStatus !== "Pending" && (
                                      <DropdownMenuItem
                                        onClick={() => onUpdatePaymentStatus(order.id, "Pending")}
                                        className="text-yellow-600"
                                        disabled={isProcessing}
                                      >
                                        {isProcessing ? (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                          <MdPendingActions className="mr-2 h-4 w-4" />
                                        )}
                                        Mark as Pending
                                      </DropdownMenuItem>
                                    )}
                                    {isEligibleForRelease(order) && onReleasePet && (
                                      <DropdownMenuItem onClick={() => handleReleasePet(order.id)}>
                                        <GoCheckCircleFill className="mr-2 h-4 w-4 text-green-600" />
                                        Release Pet
                                      </DropdownMenuItem>
                                    )}
                                    {isEligibleForForceRelease(order) && onForceRelease && !isReadOnly && (
                                      <DropdownMenuItem onClick={() => handleForceRelease(order.id)}>
                                        <FaSignOutAlt className="mr-2 h-4 w-4 text-amber-600" />
                                        Force Release Pet
                                      </DropdownMenuItem>
                                    )}
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <TableCell colSpan={9} className="h-[72px]">
                        {/* Empty row placeholder */}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedOrder && (
        <>
          <BoardingDetailDialog
            open={detailDialogOpen}
            onOpenChange={setDetailDialogOpen}
            boardingOrder={selectedOrder}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onReleasePet={!isReadOnly ? onReleasePet : undefined}
          />

          <ReceiptDialog
            open={receiptDialogOpen}
            onOpenChange={setReceiptDialogOpen}
            boardingOrder={selectedOrder}
            showBackButton={false}
          />

          <ConfirmationDialog
            open={deleteConfirmationOpen}
            onOpenChange={setDeleteConfirmationOpen}
            title="Delete Boarding Record"
            description="Are you sure you want to delete this boarding record? This action cannot be undone."
            onConfirm={confirmDelete}
          />
        </>
      )}
    </>
  )
}
