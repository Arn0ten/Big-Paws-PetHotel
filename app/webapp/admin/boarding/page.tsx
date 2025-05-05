"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BoardingTable } from "./components/boarding-table"
import { StatsCards } from "./components/stats-cards"
import type { BoardingOrder, PaymentStatus } from "./types"
import { sampleBoardingOrders } from "./data/sample-data"
import {
  filterOrdersByStatus,
  searchOrders,
  updateBoardingStatus,
  releasePet,
  checkOverduePickups,
} from "./utils/helpers"
import { SuccessDialog } from "./components/success-dialog"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaginationControls } from "@/app/webapp/admin/components/pagination-controls"
import { ActionConfirmationDialog } from "@/components/ui/action-confirmation-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Find the FilterBar component and update it:

// Update the FilterBar component props
interface FilterBarProps {
  onSearch: (term: string) => void
  onFilterBoardingStatus: (status: string) => void
  onFilterPaymentStatus: (status: string) => void
  onRefresh: () => void
  isLoading?: boolean
  isRefreshing?: boolean
  isSearching?: boolean
  boardingStatusFilter: string
  paymentStatusFilter: string
}

// Update the FilterBar component implementation
export function FilterBar({
  onSearch,
  onFilterBoardingStatus,
  onFilterPaymentStatus,
  onRefresh,
  isLoading = false,
  isRefreshing = false,
  isSearching = false,
  boardingStatusFilter,
  paymentStatusFilter,
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle real-time search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value)
    }, 300) // 300ms debounce
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const handleClearSearch = () => {
    setSearchTerm("")
    onSearch("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    onSearch("")
    onFilterBoardingStatus("all")
    onFilterPaymentStatus("all")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-row justify-between items-center gap-4 flex-wrap md:flex-nowrap">
      {/* Left side - Search and Filters */}
      <div className="flex flex-wrap gap-2 items-center w-full">
        <div className="relative flex-1 min-w-0 md:w-[300px]">
          <Input
            placeholder="Search by pet or owner name..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
            ref={searchInputRef}
          />
          <div className="absolute left-2.5 top-2.5">
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              Clear
            </Button>
          )}
        </div>

        <Select onValueChange={onFilterBoardingStatus} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Boarding Status</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Boarding">Boarding</SelectItem>
            <SelectItem value="Done Boarding">Done Boarding</SelectItem>
            <SelectItem value="Released">Released</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onFilterPaymentStatus} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Payment Status</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {(searchTerm || boardingStatusFilter !== "all" || paymentStatusFilter !== "all") && (
          <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default function BoardingManagementPage() {
  const [boardingOrders, setBoardingOrders] = useState<BoardingOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<BoardingOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [successDialog, setSuccessDialog] = useState({
    open: false,
    message: "",
  })

  const [actionDialog, setActionDialog] = useState({
    open: false,
    title: "",
    description: "",
    action: "",
    orderId: "",
    status: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [boardingStatusFilter, setBoardingStatusFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Standardized to 10 items per page

  const fetchBoardingOrders = useCallback(async () => {
    try {
      setIsRefreshing(true)
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/boarding-orders');
      // const data = await response.json();

      // Using sample data for now
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay

      // Check for overdue pickups
      const ordersWithOverdueStatus = checkOverduePickups(sampleBoardingOrders)

      setBoardingOrders(ordersWithOverdueStatus)
      setFilteredOrders(ordersWithOverdueStatus)
    } catch (error) {
      console.error("Error fetching boarding orders:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchBoardingOrders()
  }, [fetchBoardingOrders])

  useEffect(() => {
    // Apply filters whenever filter states change
    let result = [...boardingOrders]

    // Apply search filter
    if (searchTerm) {
      result = searchOrders(result, searchTerm)
    }

    // Apply status filters
    result = filterOrdersByStatus(result, boardingStatusFilter, paymentStatusFilter)

    // Apply tab filter
    if (activeTab === "active") {
      result = result.filter((order) => order.boardingStatus === "Boarding")
    } else if (activeTab === "completed") {
      result = result.filter((order) => order.boardingStatus === "Done Boarding")
    } else if (activeTab === "overdue") {
      result = result.filter((order) => order.isOverdue)
    } else if (activeTab === "released") {
      result = result.filter((order) => order.boardingStatus === "Released")
    }

    setFilteredOrders(result)
  }, [boardingOrders, searchTerm, boardingStatusFilter, paymentStatusFilter, activeTab])

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1)
  }, [searchTerm, boardingStatusFilter, paymentStatusFilter, activeTab])

  // Calculate pagination values
  const totalItems = filteredOrders.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleUpdatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    setActionDialog({
      open: true,
      title: `Confirm Payment Status Change`,
      description: `Are you sure you want to mark this boarding as ${status}?`,
      action: "updatePayment",
      orderId,
      status,
    })
  }

  const handleReleasePet = (orderId: string) => {
    setActionDialog({
      open: true,
      title: "Confirm Pet Release",
      description: "Are you sure you want to release this pet? This action cannot be undone.",
      action: "releasePet",
      orderId,
      status: "",
    })
  }

  // Update the BoardingManagementPage component to include the Force Release functionality
  // Add the handleForceRelease function after the handleReleasePet function

  const handleForceRelease = (orderId: string) => {
    setActionDialog({
      open: true,
      title: "Confirm Force Release",
      description:
        "Are you sure you want to force release this pet? This action will immediately mark the pet as released regardless of its current boarding status.",
      action: "forceRelease",
      orderId,
      status: "",
    })
  }

  const handleDeleteRecord = (orderId: string) => {
    setActionDialog({
      open: true,
      title: "Confirm Record Deletion",
      description: "Are you sure you want to delete this boarding record? This action cannot be undone.",
      action: "deleteRecord",
      orderId,
      status: "",
    })
  }

  const handleConfirmAction = async () => {
    setIsProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { action, orderId, status } = actionDialog

    // Update local state based on the action
    if (action === "updatePayment") {
      const updatedOrders = boardingOrders.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = {
            ...updateBoardingStatus(order, status as PaymentStatus),
            lastModifiedBy: "Admin",
            updatedAt: new Date().toISOString(),
            lastModificationReason: `Payment status updated to ${status}`,
          }
          return updatedOrder
        }
        return order
      })

      setBoardingOrders(updatedOrders)
      setSuccessDialog({
        open: true,
        message: `Payment status has been updated to ${status}.`,
      })
    } else if (action === "releasePet") {
      const updatedOrders = boardingOrders.map((order) => {
        if (order.id === orderId) {
          const releasedOrder = releasePet(order)
          return {
            ...releasedOrder,
            lastModifiedBy: "Admin",
            lastModificationReason: "Pet released",
          }
        }
        return order
      })

      setBoardingOrders(updatedOrders)
      setSuccessDialog({
        open: true,
        message: "Pet has been successfully released.",
      })
    }
    // Update the handleConfirmAction function to include the forceRelease case
    // Inside the handleConfirmAction function, add this case after the releasePet case:
    else if (action === "forceRelease") {
      // In production, this would be an API call
      // await fetch(`/api/boarding/${orderId}/force-release`, { method: 'POST' });

      const updatedOrders = boardingOrders.map((order) => {
        if (order.id === orderId) {
          const releasedOrder = {
            ...order,
            boardingStatus: "Released",
            releaseTimestamp: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            receiptGenerated: true,
            notificationSent: true,
            isOverdue: false,
            lastModifiedBy: "Admin",
            lastModificationReason: "Pet force released",
            paymentStatus: "Paid", // Ensure payment status is set to Paid when force releasing
          }
          return releasedOrder
        }
        return order
      })

      setBoardingOrders(updatedOrders)
      setSuccessDialog({
        open: true,
        message: "Pet has been successfully force released.",
      })
    } else if (action === "deleteRecord") {
      const updatedOrders = boardingOrders.filter((order) => order.id !== orderId)
      setBoardingOrders(updatedOrders)
      setSuccessDialog({
        open: true,
        message: "Boarding record has been successfully deleted.",
      })
    }

    setIsProcessing(false)
    setActionDialog({ ...actionDialog, open: false })
  }

  const handleRefresh = () => {
    fetchBoardingOrders()
    setSearchTerm("")
  }

  const handleSearch = async (term: string) => {
    setIsSearching(true)
    setSearchTerm(term)

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsSearching(false)
  }

  const handleFilterBoardingStatus = (status: string) => {
    setBoardingStatusFilter(status)
  }

  const handleFilterPaymentStatus = (status: string) => {
    setPaymentStatusFilter(status)
  }

  const isTableLoading = isLoading || isRefreshing || isSearching

  // Update the BoardingManagementPage component to handle card clicks
  // First, add a function to handle card clicks that will set the active tab

  const handleCardClick = (tabValue: string) => {
    setActiveTab(tabValue)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Boarding Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage pet boarding orders, update payment status, and release pets.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards boardingOrders={boardingOrders} isLoading={isTableLoading} onCardClick={handleCardClick} />

      {/* Filters */}
      <FilterBar
        onSearch={handleSearch}
        onFilterBoardingStatus={handleFilterBoardingStatus}
        onFilterPaymentStatus={handleFilterPaymentStatus}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        isSearching={isSearching}
        boardingStatusFilter={boardingStatusFilter}
        paymentStatusFilter={paymentStatusFilter}
      />

      <div className="overflow-x-auto pb-2">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full sm:w-auto flex flex-nowrap justify-start overflow-x-auto bg-muted/30 p-1">
              <TabsTrigger
                value="all"
                className="flex-1 sm:flex-none whitespace-nowrap rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
              >
                All Boardings
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="flex-1 sm:flex-none whitespace-nowrap rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  Active
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="flex-1 sm:flex-none whitespace-nowrap rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Completed
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="overdue"
                className="flex-1 sm:flex-none whitespace-nowrap rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm text-red-600 dark:text-red-400"
              >
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Overdue
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="released"
                className="flex-1 sm:flex-none whitespace-nowrap rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm text-purple-700 dark:text-purple-400"
              >
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  Released
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-6">
            {isTableLoading ? (
              <BoardingTableSkeleton />
            ) : (
              <>
                <BoardingTable
                  boardingOrders={currentOrders}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                  onReleasePet={handleReleasePet}
                  onForceRelease={handleForceRelease}
                  onDeleteRecord={handleDeleteRecord}
                  tabName="All Boardings"
                  isProcessing={isProcessing}
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            {isTableLoading ? (
              <BoardingTableSkeleton />
            ) : (
              <>
                <BoardingTable
                  boardingOrders={currentOrders}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                  onReleasePet={handleReleasePet}
                  onForceRelease={handleForceRelease}
                  onDeleteRecord={handleDeleteRecord}
                  tabName="Active"
                  isProcessing={isProcessing}
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            {isTableLoading ? (
              <BoardingTableSkeleton />
            ) : (
              <>
                <BoardingTable
                  boardingOrders={currentOrders}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                  onReleasePet={handleReleasePet}
                  onForceRelease={handleForceRelease}
                  onDeleteRecord={handleDeleteRecord}
                  tabName="Completed"
                  isProcessing={isProcessing}
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </TabsContent>
          <TabsContent value="overdue" className="mt-6">
            {isTableLoading ? (
              <BoardingTableSkeleton />
            ) : (
              <>
                <BoardingTable
                  boardingOrders={currentOrders}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                  onReleasePet={handleReleasePet}
                  onForceRelease={handleForceRelease}
                  onDeleteRecord={handleDeleteRecord}
                  tabName="Overdue"
                  isProcessing={isProcessing}
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </TabsContent>
          <TabsContent value="released" className="mt-6">
            {isTableLoading ? (
              <BoardingTableSkeleton />
            ) : (
              <>
                <BoardingTable
                  boardingOrders={currentOrders}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                  onDeleteRecord={handleDeleteRecord}
                  onForceRelease={handleForceRelease}
                  isReadOnly={true}
                  tabName="Released"
                  isProcessing={isProcessing}
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <SuccessDialog
        open={successDialog.open}
        onOpenChange={(open) => setSuccessDialog({ ...successDialog, open })}
        title="Action Successful"
        description={successDialog.message}
      />
      <ActionConfirmationDialog
        open={actionDialog.open}
        onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}
        onConfirm={handleConfirmAction}
        title={actionDialog.title}
        description={actionDialog.description}
        confirmText={isProcessing ? "Processing..." : "Confirm"}
        isLoading={isProcessing}
      />
    </div>
  )
}

function BoardingTableSkeleton() {
  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableBody>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i} className="h-[72px]">
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
