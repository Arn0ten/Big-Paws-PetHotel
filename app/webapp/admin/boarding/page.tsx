"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoardingTable } from "./components/boarding-table";
import { StatsCards } from "./components/stats-cards";
import type { BoardingOrder, PaymentStatus } from "./types";
import { sampleBoardingOrders } from "./data/sample-data";
import {
  filterOrdersByStatus,
  searchOrders,
  updateBoardingStatus,
  releasePet,
  checkOverduePickups,
} from "./utils/helpers";
import { SuccessDialog } from "./components/success-dialog";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/app/webapp/admin/components/pagination-controls";

// In the FilterBar component props
interface FilterBarProps {
  onSearch: (term: string) => void;
  onFilterBoardingStatus: (status: string) => void;
  onFilterPaymentStatus: (status: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  isSearching?: boolean;
}

// Add isSearching to the props destructuring
export function FilterBar({
  onSearch,
  onFilterBoardingStatus,
  onFilterPaymentStatus,
  onRefresh,
  isLoading = false,
  isRefreshing = false,
  isSearching = false,
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle real-time search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Remove the handleSearchKeyDown function as it's no longer needed

  // Update the search input implementation
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1 flex gap-2">
        <div className="relative flex-1">
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
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onRefresh();
            setSearchTerm("");
          }}
          disabled={isRefreshing}
          className="h-10 w-10 flex-shrink-0"
          title="Refresh data"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
      {/* Rest of the component remains the same */}
    </div>
  );
}

export default function BoardingManagementPage() {
  const [boardingOrders, setBoardingOrders] = useState<BoardingOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<BoardingOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [successDialog, setSuccessDialog] = useState({
    open: false,
    message: "",
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [boardingStatusFilter, setBoardingStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Standardized to 10 items per page

  const fetchBoardingOrders = useCallback(async () => {
    try {
      setIsRefreshing(true);
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/boarding-orders');
      // const data = await response.json();

      // Using sample data for now
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

      // Check for overdue pickups
      const ordersWithOverdueStatus = checkOverduePickups(sampleBoardingOrders);

      setBoardingOrders(ordersWithOverdueStatus);
      setFilteredOrders(ordersWithOverdueStatus);
    } catch (error) {
      console.error("Error fetching boarding orders:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBoardingOrders();
  }, [fetchBoardingOrders]);

  useEffect(() => {
    // Apply filters whenever filter states change
    let result = [...boardingOrders];

    // Apply search filter
    if (searchTerm) {
      result = searchOrders(result, searchTerm);
    }

    // Apply status filters
    result = filterOrdersByStatus(
      result,
      boardingStatusFilter,
      paymentStatusFilter,
    );

    // Apply tab filter
    if (activeTab === "active") {
      result = result.filter((order) => order.boardingStatus === "Boarding");
    } else if (activeTab === "completed") {
      result = result.filter(
        (order) => order.boardingStatus === "Done Boarding",
      );
    } else if (activeTab === "overdue") {
      result = result.filter((order) => order.isOverdue);
    } else if (activeTab === "released") {
      result = result.filter((order) => order.boardingStatus === "Released");
    }

    setFilteredOrders(result);
  }, [
    boardingOrders,
    searchTerm,
    boardingStatusFilter,
    paymentStatusFilter,
    activeTab,
  ]);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [searchTerm, boardingStatusFilter, paymentStatusFilter, activeTab]);

  // Calculate pagination values
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdatePaymentStatus = (
    orderId: string,
    status: PaymentStatus,
  ) => {
    // Update local state
    const updatedOrders = boardingOrders.map((order) => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...updateBoardingStatus(order, status),
          lastModifiedBy: "Admin",
          updatedAt: new Date().toISOString(),
          lastModificationReason: `Payment status updated to ${status}`,
        };
        return updatedOrder;
      }
      return order;
    });

    setBoardingOrders(updatedOrders);
    setSuccessDialog({
      open: true,
      message: `Payment status has been updated to ${status}.`,
    });
  };

  const handleReleasePet = (orderId: string) => {
    // Update local state
    const updatedOrders = boardingOrders.map((order) => {
      if (order.id === orderId) {
        const releasedOrder = releasePet(order);
        return {
          ...releasedOrder,
          lastModifiedBy: "Admin",
          lastModificationReason: "Pet released",
        };
      }
      return order;
    });

    setBoardingOrders(updatedOrders);
    setSuccessDialog({
      open: true,
      message: "Pet has been successfully released.",
    });
  };

  //Delete record
  const handleDeleteRecord = (orderId: string) => {
    // Update local state
    const updatedOrders = boardingOrders.filter(
      (order) => order.id !== orderId,
    );
    setBoardingOrders(updatedOrders);
    setSuccessDialog({
      open: true,
      message: "Boarding record has been successfully deleted.",
    });
  };

  const handleRefresh = () => {
    fetchBoardingOrders();
    setSearchTerm("");
  };

  const handleSearch = async (term: string) => {
    setIsSearching(true);
    setSearchTerm(term);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSearching(false);
  };

  const handleFilterBoardingStatus = (status: string) => {
    setBoardingStatusFilter(status);
  };

  const handleFilterPaymentStatus = (status: string) => {
    setPaymentStatusFilter(status);
  };

  const isTableLoading = isLoading || isRefreshing || isSearching;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Boarding Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage pet boarding orders, update payment status, and release pets.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards boardingOrders={boardingOrders} isLoading={isTableLoading} />

      {/* Filters */}
      <FilterBar
        onSearch={handleSearch}
        onFilterBoardingStatus={handleFilterBoardingStatus}
        onFilterPaymentStatus={handleFilterPaymentStatus}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isSearching={isSearching}
      />

      <div className="overflow-x-auto pb-2">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full sm:w-auto flex flex-nowrap justify-start overflow-x-auto">
              <TabsTrigger
                value="all"
                className="flex-1 sm:flex-none whitespace-nowrap"
              >
                All Boardings
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="flex-1 sm:flex-none whitespace-nowrap"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="flex-1 sm:flex-none whitespace-nowrap"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="overdue"
                className="flex-1 sm:flex-none whitespace-nowrap text-red-600 dark:text-red-400"
              >
                Overdue
              </TabsTrigger>
              <TabsTrigger
                value="released"
                className="flex-1 sm:flex-none whitespace-nowrap bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-indigo-100 data-[state=active]:text-purple-900 dark:from-purple-950/30 dark:to-indigo-950/30 dark:text-purple-300 dark:data-[state=active]:from-purple-900/50 dark:data-[state=active]:to-indigo-900/50 dark:data-[state=active]:text-purple-200"
              >
                Released
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
                  onDeleteRecord={handleDeleteRecord}
                  tabName="All Boardings"
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
                  tabName="Active"
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
                  tabName="Completed"
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
                  tabName="Overdue"
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
                  isReadOnly={true}
                  tabName="Released"
                />

                {/* Standardized Pagination Controls */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
    </div>
  );
}

function BoardingTableSkeleton() {
  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="h-10 flex items-center border-b">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-4 w-full max-w-[100px] mx-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
        </div>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-16 flex items-center border-b">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mx-2 animate-pulse" />
              {Array(7)
                .fill(0)
                .map((_, j) => (
                  <div
                    key={j}
                    className="h-4 w-full max-w-[100px] mx-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    style={{
                      animationDelay: `${(i * 7 + j) * 0.05}s`,
                    }}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}
