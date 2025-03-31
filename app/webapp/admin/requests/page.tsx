"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Camera,
  Video,
  Scissors,
  Clock,
  FileText,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  Calendar,
  ArrowUpDown,
  X,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  CheckCircle,
  Dog,
  Cat,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "../boarding/utils/helpers";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useRequestStore } from "@/lib/shared-request-data";

// Utility functions for request management
const getRequestTypeIcon = (type: string) => {
  switch (type) {
    case "photo":
      return <Camera className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "grooming":
      return <Scissors className="h-5 w-5" />;
    case "boarding-extension":
      return <Clock className="h-5 w-5" />;
    case "custom":
      return <FileText className="h-5 w-5" />;
    case "dog":
      return <Dog className="h-5 w-5" />;
    case "cat":
      return <Cat className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getRequestTypeLabel = (type: string) => {
  switch (type) {
    case "photo":
      return "Photo Update";
    case "video":
      return "Video Request";
    case "grooming":
      return "Grooming Service";
    case "boarding-extension":
      return "Boarding Extension";
    case "custom":
      return "Custom Request";
    case "dog":
      return "Dog";
    case "cat":
      return "Cat";
    default:
      return "Request";
  }
};

// Function to get time ago in words
const getTimeAgo = (date: string) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};

interface NewRequestCardProps {
  request: any;
  onApprove: () => void;
  onReject: () => void;
  onViewDetails: () => void;
}

interface RejectedRequestCardProps {
  request: any;
  onViewDetails: () => void;
  onReconsider: () => void;
}

// Main component for the Requests page
export default function RequestsPage() {
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { requests, updateRequest, reset: resetRequests } = useRequestStore();
  const [activeTab, setActiveTab] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showReconsiderDialog, setShowReconsiderDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [reconsiderationReason, setReconsiderationReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [successType, setSuccessType] = useState("");
  const [showApproveConfirmDialog, setShowApproveConfirmDialog] =
    useState(false);

  // Update the search functionality to trigger refresh before displaying results
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setIsSearching(true);

    // Simulate refreshing data with the search query
    setTimeout(() => {
      // In a real implementation, you would call your API here
      // For example: fetchRequests(query)

      // For the mock implementation, we're just refreshing the existing data
      resetRequests();
      setIsLoading(false);
      setIsSearching(false);
    }, 800);
  };

  const handleApproveRequest = (request: any) => {
    setSelectedRequest(request);
    setIsProcessing(true);

    // Update the request status to "in-progress"
    setTimeout(() => {
      updateRequest(request.id, {
        status: "in-progress",
        approvedAt: new Date().toISOString(),
        approvedBy: "Admin",
      });

      setIsProcessing(false);
      setShowDetailsDialog(false);

      // Show success dialog
      setSuccessTitle("Request Approved");
      setSuccessMessage(
        `The ${getRequestTypeLabel(request.type).toLowerCase()} for ${request.petName} has been approved and moved to In Progress.`,
      );
      setSuccessType(request.type);
      setShowSuccessDialog(true);

      // Reset state
      setSelectedRequest(null);
    }, 1500);
  };

  const handleRejectRequest = () => {
    if (!selectedRequest || !rejectionReason.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Update the request status to "rejected"
      updateRequest(selectedRequest.id, {
        status: "rejected",
        rejectedAt: new Date().toISOString(),
        rejectedBy: "Admin",
        rejectionReason: rejectionReason,
      });

      setIsProcessing(false);
      setShowRejectDialog(false);
      setShowDetailsDialog(false);

      // Show success dialog
      setSuccessTitle("Request Rejected");
      setSuccessMessage(
        `The ${getRequestTypeLabel(selectedRequest.type).toLowerCase()} for ${selectedRequest.petName} has been rejected.`,
      );
      setSuccessType(selectedRequest.type);
      setShowSuccessDialog(true);

      // Reset state
      setRejectionReason("");
    }, 1500);
  };

  const handleReconsiderRequest = () => {
    if (!selectedRequest || !reconsiderationReason.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Update the request status from "rejected" to "new" with reconsidered flag
      updateRequest(selectedRequest.id, {
        status: "new",
        reconsideredAt: new Date().toISOString(),
        reconsideredBy: "Admin",
        reconsiderationReason: reconsiderationReason,
        isReconsidered: true,
        // Keep the original rejection data for reference
        _previousRejection: {
          rejectedAt: selectedRequest.rejectedAt,
          rejectedBy: selectedRequest.rejectedBy,
          rejectionReason: selectedRequest.rejectionReason,
        },
        // Add notification for pet owner
        notification: {
          type: "request-reconsidered",
          message: `Your ${getRequestTypeLabel(selectedRequest.type).toLowerCase()} request has been reconsidered and is now pending review.`,
          createdAt: new Date().toISOString(),
          isRead: false,
        },
      });

      setIsProcessing(false);
      setShowReconsiderDialog(false);
      setShowDetailsDialog(false);

      // Show success dialog
      setSuccessTitle("Request Reconsidered");
      setSuccessMessage(
        `The ${getRequestTypeLabel(selectedRequest.type).toLowerCase()} for ${selectedRequest.petName} has been moved back to New Requests.`,
      );
      setSuccessType(selectedRequest.type);
      setShowSuccessDialog(true);

      // Reset state
      setReconsiderationReason("");
    }, 1500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery("");
    setFilterType("all");

    // Simulate refreshing data
    setTimeout(() => {
      resetRequests();
      setIsLoading(false);
    }, 1500);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter and sort requests - implementing FIFO (newest first)
  const filteredAndSortedRequests = requests
    .filter((request) => {
      // Filter by tab
      if (activeTab === "new" && request.status !== "new") return false;
      if (activeTab === "rejected" && request.status !== "rejected")
        return false;

      // Filter by search query
      const searchLower = searchQuery.toLowerCase();
      if (
        searchQuery &&
        !request.petName.toLowerCase().includes(searchLower) &&
        !request.petOwnerName.toLowerCase().includes(searchLower) &&
        !request.description.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      // Filter by request type
      if (filterType !== "all" && request.type !== filterType) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by creation date - newest first (FIFO)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  useEffect(() => {
    // Add CSS to hide scrollbars but keep functionality
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Requests
        </h1>
        <p className="text-muted-foreground">
          Review and manage incoming requests from pet owners.
        </p>
      </motion.div>

      {/* Enhanced Search, Filter, and Refresh Section */}
      <div className="flex flex-row items-center gap-4 flex-wrap md:flex-nowrap mb-6">
        {/* Left side - Search and Filters */}
        <div className="flex flex-wrap gap-2 items-center w-full">
          {/* Standardize search bar position and size */}
          <div className="relative flex-1 min-w-0 md:w-[300px]">
            <Input
              placeholder="Search by pet name, owner, or description..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                setIsSearching(true);

                // Clear any existing timeout
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current);
                }

                // Set a new timeout for the search
                searchTimeoutRef.current = setTimeout(() => {
                  handleSearch(query);
                }, 300);
              }}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
                onClick={() => {
                  setSearchQuery("");
                  handleSearch("");
                  setIsSearching(false);
                }}
                aria-label="Clear search"
              >
                Clear
              </Button>
            )}
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] h-10">
              <div className="flex items-center gap-1.5 text-sm">
                <Filter className="h-3.5 w-3.5" />
                <span className="truncate">
                  {filterType === "all"
                    ? "All Types"
                    : filterType === "photo"
                      ? "Photos"
                      : filterType === "video"
                        ? "Videos"
                        : filterType === "grooming"
                          ? "Grooming"
                          : filterType === "boarding-extension"
                            ? "Extensions"
                            : filterType === "custom"
                              ? "Custom"
                              : "Filter"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="photo">Photo Updates</SelectItem>
              <SelectItem value="video">Video Requests</SelectItem>
              <SelectItem value="grooming">Grooming</SelectItem>
              <SelectItem value="boarding-extension">
                Boarding Extensions
              </SelectItem>
              <SelectItem value="custom">Custom Requests</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="flex items-center gap-1.5 h-10 px-3"
            onClick={toggleSortOrder}
            title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
          >
            <Calendar className="h-3.5 w-3.5" />
            <ArrowUpDown className="h-3 w-3" />
            <span className="sr-only md:not-sr-only md:inline-block md:ml-1 text-xs">
              {sortOrder === "desc" ? "Newest" : "Oldest"}
            </span>
          </Button>

          {(searchQuery || filterType !== "all") && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
                setIsSearching(false);
              }}
              title="Clear filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Tab Interface */}
      <div className="bg-card rounded-lg shadow-sm border">
        {isLoading || isSearching ? (
          <div className="px-4 pt-4">
            <Tabs defaultValue="new" className="w-full">
              <TabsList className="w-full grid grid-cols-2 h-14 p-1 bg-muted/30 dark:bg-muted/20 rounded-lg overflow-x-auto scrollbar-hide">
                <TabsTrigger
                  value="new"
                  className="flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base"
                >
                  <FileText className="h-5 w-5" />
                  <span className="hidden sm:inline">New Requests</span>
                  <span className="sm:hidden">New</span>
                  <Skeleton className="h-5 w-8 rounded-full" />
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base"
                >
                  <X className="h-5 w-5" />
                  <span className="hidden sm:inline">Rejected Requests</span>
                  <span className="sm:hidden">Rejected</span>
                  <Skeleton className="h-5 w-8 rounded-full" />
                </TabsTrigger>
              </TabsList>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <RequestCardSkeleton key={index} />
                    ))}
                </div>
              </div>
            </Tabs>
          </div>
        ) : (
          <Tabs
            defaultValue="new"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-2 h-14 p-1 bg-muted/30 dark:bg-muted/20 rounded-lg overflow-x-auto scrollbar-hide">
                <TabsTrigger
                  value="new"
                  className={`flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base ${
                    activeTab === "new"
                      ? "bg-background shadow-sm font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span className="hidden sm:inline">New Requests</span>
                  <span className="sm:hidden">New</span>
                  <Badge
                    variant={activeTab === "new" ? "default" : "secondary"}
                    className="ml-1 text-xs px-2 py-0 h-5"
                  >
                    {requests.filter((r) => r.status === "new").length}
                  </Badge>
                  {/* Show indicator for reconsidered requests */}
                  {requests.some(
                    (r) => r.status === "new" && r.isReconsidered,
                  ) && (
                    <Badge
                      variant="outline"
                      className="ml-1 bg-amber-100 text-amber-700 border-amber-200 text-xs px-2 py-0 h-5"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      {
                        requests.filter(
                          (r) => r.status === "new" && r.isReconsidered,
                        ).length
                      }
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className={`flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base ${
                    activeTab === "rejected"
                      ? "bg-background shadow-sm font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <X className="h-5 w-5" />
                  <span className="hidden sm:inline">Rejected Requests</span>
                  <span className="sm:hidden">Rejected</span>
                  <Badge
                    variant={activeTab === "rejected" ? "default" : "secondary"}
                    className="ml-1 text-xs px-2 py-0 h-5"
                  >
                    {requests.filter((r) => r.status === "rejected").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="new" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
                {filteredAndSortedRequests.length === 0 ? (
                  <div className="col-span-full">
                    <EmptyState message="No new requests found" />
                  </div>
                ) : (
                  <>
                    <AnimatePresence>
                      {filteredAndSortedRequests.map((request) => (
                        <NewRequestCard
                          key={request.id}
                          request={request}
                          onApprove={() => handleApproveRequest(request)}
                          onReject={() => {
                            setSelectedRequest(request);
                            setRejectionReason("");
                            setShowRejectDialog(true);
                          }}
                          onViewDetails={() => {
                            setSelectedRequest(request);
                            setShowDetailsDialog(true);
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
                {filteredAndSortedRequests.length === 0 ? (
                  <div className="col-span-full">
                    <EmptyState message="No rejected requests found" />
                  </div>
                ) : (
                  <>
                    <AnimatePresence>
                      {filteredAndSortedRequests.map((request) => (
                        <RejectedRequestCard
                          key={request.id}
                          request={request}
                          onViewDetails={() => {
                            setSelectedRequest(request);
                            setShowDetailsDialog(true);
                          }}
                          onReconsider={() => {
                            setSelectedRequest(request);
                            setReconsiderationReason("");
                            setShowReconsiderDialog(true);
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Request Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "sm:max-w-[600px]"} max-h-[90vh] overflow-y-auto`}
        >
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                  <span
                    className={`
                p-1 rounded-full 
                ${selectedRequest.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${selectedRequest.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                ${selectedRequest.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${selectedRequest.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${selectedRequest.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
              `}
                  >
                    {getRequestTypeIcon(selectedRequest.type)}
                  </span>
                  {getRequestTypeLabel(selectedRequest.type)}
                </DialogTitle>
                <DialogDescription>
                  Request from {selectedRequest.petOwnerName} for{" "}
                  {selectedRequest.petName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Pet
                    </span>
                    <div className="text-base font-medium mt-1">
                      {selectedRequest.petName}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Pet Owner
                    </span>
                    <div className="text-base font-medium mt-1">
                      {selectedRequest.petOwnerName}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Submitted
                    </span>
                    <div className="text-base font-medium mt-1">
                      {formatDate(selectedRequest.createdAt)}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Status
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge
                        variant={
                          selectedRequest.status === "rejected"
                            ? "destructive"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {selectedRequest.status === "new" && "New"}
                        {selectedRequest.status === "in-progress" &&
                          "In Progress"}
                        {selectedRequest.status === "completed" && "Completed"}
                        {selectedRequest.status === "rejected" && "Rejected"}
                      </Badge>
                      {selectedRequest.isReconsidered && (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-700 border-amber-200 text-xs"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Reconsidered
                        </Badge>
                      )}
                    </div>
                  </div>

                  {selectedRequest.type === "boarding-extension" &&
                    selectedRequest.extensionDetails && (
                      <>
                        <div>
                          <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                            Current End Date
                          </span>
                          <div className="text-base font-medium mt-1">
                            {formatDate(selectedRequest.currentEndDate)}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                            Extension Requested
                          </span>
                          <div className="text-base font-medium mt-1 text-amber-700 dark:text-amber-400">
                            {selectedRequest.extensionDetails.duration}{" "}
                            {selectedRequest.extensionDetails.unit}
                          </div>
                        </div>
                      </>
                    )}

                  {selectedRequest.type === "grooming" &&
                    selectedRequest.groomingService && (
                      <div className="col-span-2">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                          Requested Service
                        </span>
                        <div className="text-base font-medium mt-1 text-green-700 dark:text-green-400">
                          {selectedRequest.groomingService
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                      </div>
                    )}
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Description
                  </span>
                  <div className="mt-1 p-3 bg-muted/30 rounded-md text-base whitespace-pre-wrap">
                    {selectedRequest.description}
                  </div>
                </div>

                {selectedRequest.status === "rejected" && (
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Rejection Reason
                    </span>
                    <div className="mt-1 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md text-base text-red-700 dark:text-red-300 whitespace-pre-wrap">
                      {selectedRequest.rejectionReason}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Rejected by {selectedRequest.rejectedBy} on{" "}
                      {formatDate(selectedRequest.rejectedAt)}
                    </div>
                  </div>
                )}

                {selectedRequest.isReconsidered && (
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Reconsideration Notes
                    </span>
                    <div className="mt-1 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md text-base text-amber-700 dark:text-amber-300 whitespace-pre-wrap">
                      {selectedRequest.reconsiderationReason}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Reconsidered by {selectedRequest.reconsideredBy} on{" "}
                      {formatDate(selectedRequest.reconsideredAt)}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter
                className={`${isMobile ? "flex-col space-y-2" : ""}`}
              >
                {selectedRequest.status === "new" ? (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setRejectionReason("");
                        setShowRejectDialog(true);
                      }}
                      disabled={isProcessing}
                      className={`${isMobile ? "w-full" : ""}`}
                    >
                      <ThumbsDown className="mr-2 h-4 w-4 text" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApproveRequest(selectedRequest)}
                      disabled={isProcessing}
                      className={`${isMobile ? "w-full" : ""}`}
                    >
                      {isProcessing &&
                      selectedRequest?.id === selectedRequest?.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Approve
                        </>
                      )}
                    </Button>
                  </>
                ) : selectedRequest.status === "rejected" ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShowDetailsDialog(false)}
                      className={`${isMobile ? "w-full" : ""}`}
                    >
                      Close
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        setReconsiderationReason("");
                        setShowReconsiderDialog(true);
                      }}
                      className={`${isMobile ? "w-full" : ""} bg-amber-600 hover:bg-amber-700 text-white`}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reconsider
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailsDialog(false)}
                    className={`${isMobile ? "w-full" : ""}`}
                  >
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Request Dialog - Update styling */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"}`}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              Reject Request
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request. This will be
              visible to the pet owner.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="rejection-reason"
                className="text-xs uppercase tracking-wide text-muted-foreground font-medium"
              >
                Rejection Reason
              </Label>
              <Textarea
                id="rejection-reason"
                placeholder="Enter the reason for rejecting this request..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Be clear and concise about why the request cannot be fulfilled
                at this time.
              </p>
            </div>
          </div>

          <DialogFooter className={`${isMobile ? "flex-col space-y-2" : ""}`}>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={isProcessing}
              className={`${isMobile ? "w-full" : ""}`}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectRequest}
              disabled={!rejectionReason.trim() || isProcessing}
              className={`${isMobile ? "w-full" : ""}`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Rejection"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reconsider Request Dialog - Update styling */}
      <Dialog
        open={showReconsiderDialog}
        onOpenChange={setShowReconsiderDialog}
      >
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"}`}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-amber-500" />
              Reconsider Request
            </DialogTitle>
            <DialogDescription>
              This will move the request back to the New Requests tab for
              reconsideration. Please provide a reason for this change.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="reconsideration-reason"
                className="text-xs uppercase tracking-wide text-muted-foreground font-medium"
              >
                Reconsideration Reason
              </Label>
              <Textarea
                id="reconsideration-reason"
                placeholder="Enter the reason for reconsidering this request..."
                value={reconsiderationReason}
                onChange={(e) => setReconsiderationReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Explain why this request is being reconsidered. This message
                will be visible to the pet owner.
              </p>
            </div>
          </div>

          <DialogFooter className={`${isMobile ? "flex-col space-y-2" : ""}`}>
            <Button
              variant="outline"
              onClick={() => setShowReconsiderDialog(false)}
              disabled={isProcessing}
              className={`${isMobile ? "w-full" : ""}`}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleReconsiderRequest}
              disabled={!reconsiderationReason.trim() || isProcessing}
              className={`${isMobile ? "w-full" : ""} bg-amber-600 hover:bg-amber-700 text-white`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Reconsideration"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
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
                {successType === "photo" && (
                  <Camera className="h-6 w-6 text-blue-500" />
                )}
                {successType === "video" && (
                  <Video className="h-6 w-6 text-purple-500" />
                )}
                {successType === "grooming" && (
                  <Scissors className="h-6 w-6 text-green-500" />
                )}
                {successType === "boarding-extension" && (
                  <Clock className="h-6 w-6 text-amber-500" />
                )}
                {successType === "custom" && (
                  <FileText className="h-6 w-6 text-gray-500" />
                )}
                {!successType && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </motion.div>
            </div>
            <DialogTitle className="text-center text-xl">
              {successTitle}
            </DialogTitle>
            <DialogDescription className="text-center">
              {successMessage}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// New Request Card Component with improved button layout
function NewRequestCard({
  request,
  onApprove,
  onReject,
  onViewDetails,
}: NewRequestCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallCard = useMediaQuery("(max-width: 400px)");
  const [isApproving, setIsApproving] = useState(false);
  const [showApproveConfirmDialog, setShowApproveConfirmDialog] =
    useState(false);

  // Force stacking on narrow cards
  useEffect(() => {
    const handleResize = () => {
      const cardElements = document.querySelectorAll(".request-card");
      cardElements.forEach((card) => {
        const cardWidth = (card as HTMLElement).offsetWidth;
        if (cardWidth < 300) {
          (card as HTMLElement).classList.add("narrow-card");
        } else {
          (card as HTMLElement).classList.remove("narrow-card");
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardBgColor = (type: string) => {
    switch (type) {
      case "photo":
        return "bg-blue-50 dark:bg-blue-950/20";
      case "video":
        return "bg-purple-50 dark:bg-purple-950/20";
      case "grooming":
        return "bg-green-50 dark:bg-green-950/20";
      case "boarding-extension":
        return "bg-amber-50 dark:bg-amber-950/20";
      case "custom":
        return "bg-gray-50 dark:bg-gray-950/20";
      default:
        return "";
    }
  };

  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setShowApproveConfirmDialog(true);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onReject();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.3,
      }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card
        className={`w-full h-[280px] flex flex-col request-card cursor-pointer ${getCardBgColor(request.type)}`}
        onClick={onViewDetails}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div
                className={`
                p-2 rounded-full 
                ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
              `}
              >
                {getRequestTypeIcon(request.type)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">
                  {getRequestTypeLabel(request.type)}
                </CardTitle>
                <CardDescription className="text-foreground/70 dark:text-foreground/60 font-medium">
                  {request.petName}{" "}
                  <span className="text-muted-foreground">
                    ({request.petOwnerName})
                  </span>
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {request.isReconsidered && (
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-700 border-amber-200 ml-auto"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reconsidered
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
          <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">
            {request.description}
          </p>

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Submitted
            </span>
            <div className="text-sm font-medium mt-0.5">
              {getTimeAgo(request.createdAt)}
            </div>
          </div>
        </CardContent>
        <CardFooter className={`p-4 pt-0 mt-auto flex flex-col gap-2`}>
          <div
            className={`flex flex-col ${!isSmallCard ? "sm:flex-row" : ""} gap-2 w-full`}
          >
            <Button
              className="w-full text-sm px-2 sm:px-4"
              onClick={handleApprove}
              size={isSmallCard ? "sm" : "default"}
              disabled={isApproving}
            >
              {isApproving ? (
                <>
                  <Loader2 className="mr-1 sm:mr-2 h-4 w-4 animate-spin" />
                  <span>Approving...</span>
                </>
              ) : (
                <>
                  <ThumbsUp className="mr-1 sm:mr-2 h-4 w-4" />
                  <span>Approve</span>
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              className="w-full text-sm px-2 sm:px-4"
              onClick={handleReject}
              size={isSmallCard ? "sm" : "default"}
            >
              <ThumbsDown className="mr-1 sm:mr-2 h-4 w-4" />
              <span>Reject</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog
        open={showApproveConfirmDialog}
        onOpenChange={setShowApproveConfirmDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Approval</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this{" "}
              {getRequestTypeLabel(request.type).toLowerCase()} request for{" "}
              {request.petName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowApproveConfirmDialog(false);
                setIsApproving(true);
                onApprove();
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Rejected Request Card Component with Reconsider button
function RejectedRequestCard({
  request,
  onViewDetails,
  onReconsider,
}: RejectedRequestCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallCard = useMediaQuery("(max-width: 400px)");

  const handleReconsider = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onReconsider();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card
        className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 w-full h-[280px] flex flex-col request-card cursor-pointer"
        onClick={onViewDetails}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div
                className={`
                p-2 rounded-full 
                ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
              `}
              >
                {getRequestTypeIcon(request.type)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">
                  {getRequestTypeLabel(request.type)}
                </CardTitle>
                <CardDescription className="text-foreground/70 dark:text-foreground/60 font-medium">
                  {request.petName}{" "}
                  <span className="text-muted-foreground">
                    ({request.petOwnerName})
                  </span>
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800 ml-auto"
            >
              <X className="h-3 w-3 mr-1" /> Rejected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
          <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">
            {request.description}
          </p>

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Rejected
            </span>
            <div className="text-sm font-medium mt-0.5">
              {formatDate(request.rejectedAt)}
            </div>
          </div>

          {/* Show rejection reason preview */}
          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Rejection Reason
            </span>
            <div className="mt-1 p-2 bg-red-50 border border-red-100 rounded-md dark:bg-red-950/20 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300 line-clamp-2">
                {request.rejectionReason}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className={`p-4 pt-0 mt-auto`}>
          <Button
            variant="default"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleReconsider}
            size={isSmallCard ? "sm" : "default"}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reconsider
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Skeleton component for loading state
function RequestCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-9 rounded-full animate-pulse" />
              <div>
                <Skeleton className="h-5 w-32 mb-1 animate-pulse" />
                <Skeleton className="h-4 w-24 animate-pulse" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <Skeleton className="h-4 w-full mb-2 animate-pulse" />
          <Skeleton className="h-4 w-3/4 mb-2 animate-pulse" />
          <Skeleton className="h-4 w-1/2 mb-4 animate-pulse" />
          <Skeleton className="h-3 w-32 mt-auto animate-pulse" />
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Skeleton className="h-9 w-full animate-pulse" />
        </CardFooter>
      </Card>
    </div>
  );
}

// Empty state component
function EmptyState({ message = "No requests found" }: { message?: string }) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{message}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Requests will appear here when pet owners submit them
        </p>
      </CardContent>
    </Card>
  );
}
