"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  AlertTriangle,
  Clock,
  Receipt,
  Dog,
  Cat,
  LogOut,
  Trash2,
  DollarSign,
  Loader2,
  AlertCircle,
  PhilippinePesoIcon,
} from "lucide-react";
import type { BoardingOrder, PaymentStatus } from "../types";
import {
  formatDate,
  calculateDuration,
  isEligibleForRelease,
} from "../utils/helpers";
import { BoardingDetailDialog } from "./boarding-detail-dialog";
import { ReceiptDialog } from "./receipt-dialog";
import { ConfirmationDialog } from "./confirmation-dialog";

interface BoardingTableProps {
  boardingOrders: BoardingOrder[];
  onUpdatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  onReleasePet?: (orderId: string) => void;
  onDeleteRecord?: (orderId: string) => void;
  isReadOnly?: boolean;
  tabName: string;
  isProcessing?: boolean;
}

export function BoardingTable({
  boardingOrders,
  onUpdatePaymentStatus,
  onReleasePet,
  onDeleteRecord,
  isReadOnly = false,
  tabName = "",
  isProcessing = false,
}: {
  boardingOrders: BoardingOrder[];
  onUpdatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  onReleasePet?: (orderId: string) => void;
  onDeleteRecord?: (orderId: string) => void;
  isReadOnly?: boolean;
  tabName?: string;
  isProcessing?: boolean;
}) {
  const [selectedOrder, setSelectedOrder] = useState<BoardingOrder | null>(
    null,
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleViewDetails = (order: BoardingOrder) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleViewReceipt = (order: BoardingOrder) => {
    setSelectedOrder(order);
    setReceiptDialogOpen(true);
  };

  const handleUpdatePaymentStatus = (
    orderId: string,
    status: PaymentStatus,
  ) => {
    if (!isReadOnly) {
      onUpdatePaymentStatus(orderId, status);
    }
  };

  const handleReleasePet = (orderId: string) => {
    if (onReleasePet && !isReadOnly) {
      onReleasePet(orderId);
    }
  };

  const handleRowClick = (order: BoardingOrder) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const getBoardingStatusColor = (status: string) => {
    switch (status) {
      case "Boarding":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Done Boarding":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Released":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Not Paid":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPetTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "dog":
        return "bg-blue-600 text-white dark:bg-blue-700 dark:text-white";
      case "cat":
        return "bg-purple-600 text-white dark:bg-purple-700 dark:text-white";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPetTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "dog":
        return <Dog className="h-3 w-3 mr-1" />;
      case "cat":
        return <Cat className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const handleDeleteRecord = (orderId: string) => {
    setSelectedOrder(
      boardingOrders.find((order) => order.id === orderId) || null,
    );
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (selectedOrder && onDeleteRecord) {
      onDeleteRecord(selectedOrder.id);
      setDeleteConfirmationOpen(false);
    }
  };

  // Format duration to show both days and hours
  const formatDuration = (order: BoardingOrder) => {
    const durationInHours = calculateDuration(
      order.startDate,
      order.endDate,
      "Daycare",
    );
    const durationInDays = calculateDuration(
      order.startDate,
      order.endDate,
      "LongStay",
    );

    if (order.boardingType === "Daycare") {
      return `${durationInHours} hour${durationInHours !== 1 ? "s" : ""}`;
    }

    return `${durationInDays} day${durationInDays !== 1 ? "s" : ""}`;
  };

  // Create an array of 6 items, filled with actual data or empty placeholder rows
  const tableRows = Array(6)
    .fill(null)
    .map((_, index) => boardingOrders[index] || null);

  return (
    <>
      <div className="rounded-md border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Pet</TableHead>
                <TableHead>Pet Name</TableHead>
                <TableHead className="hidden md:table-cell">Owner</TableHead>
                <TableHead>Pet Type</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Duration</span>
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
      order?.additionalServices &&
      order?.additionalServices.length > 0 &&
      order?.paymentStatus === "Pending"
        ? "bg-amber-50 dark:bg-amber-950/20"
        : ""
    } 
    ${order ? "cursor-pointer hover:bg-muted/50" : ""}`}
                    onClick={() => order && handleRowClick(order)}
                  >
                    {order ? (
                      <>
                        <TableCell>
                          <Image
                            src={
                              order.pet.imageUrl ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={order.pet.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{order.pet.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {order.pet.breed}
                            </span>
                            {order.isOverdue && (
                              <div className="flex items-center text-xs text-red-600 mt-1">
                                <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />{" "}
                                Overdue
                              </div>
                            )}
                            {order.additionalServices &&
                              order.additionalServices.length > 0 &&
                              order.paymentStatus === "Pending" && (
                                <div className="flex items-center text-xs text-amber-600 mt-1">
                                  <PhilippinePesoIcon className="h-3 w-3 mr-1 flex-shrink-0" />{" "}
                                  Additional charges
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
                          <Badge
                            variant="outline"
                            className={getPetTypeColor(order.pet.type)}
                          >
                            <div className="flex items-center">
                              {getPetTypeIcon(order.pet.type)}
                              {order.pet.type}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-col">
                            <span>{order.boardingType}</span>
                            <span className="text-xs text-muted-foreground">
                              {order.boardingType === "Daycare"
                                ? "Hourly"
                                : "Overnight"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex flex-col">
                            <span className="text-sm">
                              {formatDuration(order)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(order.startDate).split(",")[0]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getBoardingStatusColor(
                              order.boardingStatus,
                            )}
                          >
                            {order.boardingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getPaymentStatusColor(
                              order.paymentStatus,
                            )}
                          >
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className="text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            {(isEligibleForRelease(order) ||
                              (order.isOverdue &&
                                order.paymentStatus === "Paid")) &&
                              onReleasePet &&
                              !isReadOnly && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReleasePet(order.id)}
                                  title="Release Pet"
                                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30"
                                >
                                  <LogOut className="h-3.5 w-3.5 mr-1" />
                                  Release
                                </Button>
                              )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="border rounded-md"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {isReadOnly ? (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => handleViewDetails(order)}
                                    >
                                      View Boarding Details
                                    </DropdownMenuItem>
                                    {order.boardingStatus === "Released" && (
                                      <>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleViewReceipt(order)
                                          }
                                        >
                                          <Receipt className="h-4 w-4 mr-2" />
                                          View Receipt
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleDeleteRecord(order.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete Record
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => handleViewDetails(order)}
                                    >
                                      View Boarding Details
                                    </DropdownMenuItem>
                                    {order.paymentStatus !== "Paid" && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          onUpdatePaymentStatus(
                                            order.id,
                                            "Paid",
                                          )
                                        }
                                        className="text-green-600 dark:text-green-400"
                                        disabled={isProcessing}
                                      >
                                        {isProcessing && (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Mark as Paid
                                      </DropdownMenuItem>
                                    )}
                                    {order.paymentStatus !== "Pending" && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          onUpdatePaymentStatus(
                                            order.id,
                                            "Pending",
                                          )
                                        }
                                        className="text-yellow-600 dark:text-yellow-400"
                                        disabled={isProcessing}
                                      >
                                        {isProcessing && (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Mark as Pending
                                      </DropdownMenuItem>
                                    )}
                                    {order.paymentStatus !== "Not Paid" && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          onUpdatePaymentStatus(
                                            order.id,
                                            "Not Paid",
                                          )
                                        }
                                        className="text-red-600 dark:text-red-400"
                                        disabled={isProcessing}
                                      >
                                        {isProcessing && (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Mark as Not Paid
                                      </DropdownMenuItem>
                                    )}
                                    {isEligibleForRelease(order) &&
                                      onReleasePet && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleReleasePet(order.id)
                                          }
                                        >
                                          Release Pet
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
  );
}
