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
// Import the necessary icons
import {
  CheckCircle,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Bell,
  Calendar,
  ArrowUpDown,
  ArrowLeft,
  AlertTriangle,
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
import { SuccessDialog } from "./components/success-dialog";
import { formatCurrency, formatDate } from "./utils/helpers";
import { EnhancedRequestDialog } from "./components/enhanced-request-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChatBubble } from "./components/chat-bubble";
import { sampleRequests, sampleBoardingData } from "./data/sample-data";
import { PRICING, calculateExtensionCost } from "./data/pricing-data";
import { getRequestTypeIcon, getRequestTypeLabel } from "./utils/ui-helpers";

interface InProgressRequestCardProps {
  request: any;
  onProcess: () => void;
  onUndoAccept: () => void;
  onViewDetails: () => void;
}

interface CompletedRequestCardProps {
  request: any;
}

// Enhance the tab interface in the main component
export default function RequestManagementPage() {
  const [requests, setRequests] = useState(sampleRequests);
  const [boardingData, setBoardingData] = useState(sampleBoardingData);
  const [activeTab, setActiveTab] = useState("in-progress");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showProcessDialog, setShowProcessDialog] = useState(false);
  const [processingNotes, setProcessingNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extensionDate, setExtensionDate] = useState<Date | undefined>(
    undefined,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroomingService, setSelectedGroomingService] = useState(
    "premium-wash-and-cut",
  );
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [successDialog, setSuccessDialog] = useState({
    open: false,
    title: "",
    message: "",
    type: "",
  });
  const [hasNewCompletedRequests, setHasNewCompletedRequests] = useState(false);
  const [showBoardingDetailsDialog, setShowBoardingDetailsDialog] =
    useState(false);
  const [selectedBoardingDetails, setSelectedBoardingDetails] =
    useState<any>(null);
  const [showUndoAcceptDialog, setShowUndoAcceptDialog] = useState(false);
  const [undoAcceptMessage, setUndoAcceptMessage] = useState("");
  const [requestToUndo, setRequestToUndo] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallCard = useMediaQuery("(max-width: 400px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showConfirmProcessDialog, setShowConfirmProcessDialog] =
    useState(false);

  // Calculate price based on request type and details
  // NOTE FOR BACKEND: Implement proper price calculation on actual service rates
  useEffect(() => {
    if (!selectedRequest) return;

    if (selectedRequest.type === "grooming") {
      const petSize = selectedRequest.petSize || "Medium";
      const serviceType = selectedGroomingService;

      // Check if the pet is a cat
      const isCat =
        selectedRequest.petName?.toLowerCase().includes("cat") || false;
      const priceKey = isCat ? `cat-${serviceType}` : serviceType;

      if (PRICING.grooming[priceKey] && PRICING.grooming[priceKey][petSize]) {
        setCalculatedPrice(PRICING.grooming[priceKey][petSize]);
      } else {
        // Fallback to default pricing
        setCalculatedPrice(PRICING.grooming["premium-wash-and-cut"][petSize]);
      }
    } else if (
      selectedRequest.type === "boarding-extension" &&
      selectedRequest.extensionDetails
    ) {
      const cost = calculateExtensionCost(
        selectedRequest.extensionDetails.duration,
        selectedRequest.extensionDetails.unit,
        selectedRequest.petSize || "Medium",
      );
      setCalculatedPrice(cost);
    } else {
      setCalculatedPrice(null);
    }
  }, [selectedRequest, selectedGroomingService]);

  // Update handleCompleteRequest to properly incorporate audio with video
  // Update the handleCompleteRequest function to handle merged videos
  const handleCompleteRequest = () => {
    if (!selectedRequest) return;

    setIsProcessing(true);

    // BACKEND INTEGRATION:
    // Replace this setTimeout with an actual API call
    // Example:
    // try {
    //   const formData = new FormData();
    //   selectedFiles.forEach(file => formData.append('files', file));
    //   formData.append('processingNotes', processingNotes);
    //   if (extensionDate) formData.append('extensionDate', extensionDate.toISOString());
    //   if (selectedGroomingService) formData.append('groomingService', selectedGroomingService);
    //   if (selectedAudioUrl) formData.append('audioUrl', selectedAudioUrl); // Add audio URL if selected
    //   if (mergedVideoUrl) formData.append('mergedVideoUrl', mergedVideoUrl); // Add merged video URL if available
    //
    //   const response = await fetch(`/api/requests/${selectedRequest.id}/complete`, {
    //     method: 'PUT',
    //     body: formData,
    //   });
    //
    //   if (!response.ok) throw new Error('Failed to complete request');
    //
    //   const updatedRequest = await response.json();
    //
    //   // Update local state with the response from the server
    //   setRequests(prev => prev.map(req =>
    //     req.id === updatedRequest.id ? updatedRequest : req
    //   ));
    //
    //   // If boarding data was updated, fetch the latest boarding data
    //   if (selectedRequest.type === "boarding-extension" || selectedRequest.type === "grooming") {
    //     const boardingResponse = await fetch(`/api/boarding/${selectedRequest.boardingId}`);
    //     if (boardingResponse.ok) {
    //       const updatedBoarding = await boardingResponse.json();
    //       setBoardingData(prev => prev.map(b =>
    //         b.id === updatedBoarding.id ? updatedBoarding : b
    //       ));
    //       setSelectedBoardingDetails(updatedBoarding);
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error completing request:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to complete the request. Please try again.",
    //     variant: "destructive",
    //   });
    //   setIsProcessing(false);
    //   return;
    // }

    // NOTE FOR BACKEND: Replace with actual API call to update request status
    setTimeout(() => {
      // BACKEND INTEGRATION:
      // 1. Upload the selected files to your storage (S3, Azure Blob, etc.)
      // 2. Store the URLs in the database
      // 3. Associate them with the request record

      // Update the request status
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "completed",
              completedAt: new Date().toISOString(),
              completedBy: "Admin",
              processingNotes: processingNotes,
              // Store media information for display in chat bubbles
              mediaFiles:
                selectedFiles.length > 0
                  ? {
                      type: selectedRequest.type,
                      // In a real implementation, these would be URLs from your storage service
                      urls: previewUrls,
                      count: selectedFiles.length,
                      // Include audio information if this is a video with audio
                      audioUrl:
                        selectedRequest.type === "video"
                          ? selectedRequest.selectedAudioUrl
                          : undefined,
                      audioName:
                        selectedRequest.type === "video" &&
                        selectedRequest.selectedAudioUrl
                          ? selectedRequest.selectedAudioUrl
                              .split("/")
                              .pop()
                              ?.replace(/\.[^/.]+$/, "")
                          : undefined,
                      // Include information about merged audio/video if available
                      audioMerged:
                        selectedRequest.type === "video" &&
                        selectedRequest.audioMerged,
                      mergedVideoUrl:
                        selectedRequest.type === "video" &&
                        selectedRequest.mergedVideoUrl,
                    }
                  : undefined,
              ...(extensionDate && {
                extensionApproved: true,
                newEndDate: extensionDate.toISOString(),
              }),
              ...(selectedRequest.type === "grooming" && {
                groomingService: selectedGroomingService,
                price: calculatedPrice,
              }),
              ...(selectedRequest.type === "boarding-extension" && {
                price: calculatedPrice,
              }),
              isNewlyCompleted: true, // Mark as newly completed for highlighting
            }
          : req,
      );

      setRequests(updatedRequests);

      // Update the boarding data if needed
      if (
        selectedRequest.type === "boarding-extension" ||
        selectedRequest.type === "grooming"
      ) {
        const updatedBoardingData = boardingData.map((boarding) => {
          if (boarding.id === selectedRequest.boardingId) {
            // Create a transaction record for financial tracking
            const transactionRecord = {
              id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              timestamp: new Date().toISOString(),
              requestId: selectedRequest.id,
              requestType: selectedRequest.type,
              amount: calculatedPrice || 0,
              status: "pending",
              petId: boarding.pet.id,
              petName: boarding.pet.name,
              ownerId: boarding.owner.id,
              ownerName: boarding.owner.name,
              description: "",
              processedBy: "Admin",
            };

            // For boarding extension
            if (
              selectedRequest.type === "boarding-extension" &&
              extensionDate
            ) {
              // Create a record of the additional charge
              const additionalService = {
                id: `svc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                name: `${selectedRequest.extensionDetails.duration} ${selectedRequest.extensionDetails.unit} extension`,
                price: calculatedPrice || 0,
                requestId: selectedRequest.id,
                timestamp: new Date().toISOString(),
                appliedDate: new Date().toISOString(),
              };

              // Get existing additional services or initialize empty array
              const existingServices = boarding.additionalServices || [];

              // Update transaction record description
              transactionRecord.description = `Boarding extension: ${selectedRequest.extensionDetails.duration} ${selectedRequest.extensionDetails.unit}`;

              // Calculate the new total with all charges
              const newTotalPrice =
                boarding.totalPrice + (calculatedPrice || 0);

              // Update the boarding record
              return {
                ...boarding,
                endDate: extensionDate.toISOString(),
                paymentStatus: "Pending", // Change to pending regardless of previous status
                totalPrice: newTotalPrice,
                additionalServices: [...existingServices, additionalService],
                transactions: [
                  ...(boarding.transactions || []),
                  transactionRecord,
                ],
                outstandingBalance:
                  (boarding.outstandingBalance || 0) + (calculatedPrice || 0),
                updatedAt: new Date().toISOString(),
                lastModifiedBy: "Admin",
                lastModificationReason: "Boarding extension approved",
                paymentDue: true,
                paymentHistory: [
                  ...(boarding.paymentHistory || []),
                  {
                    date: new Date().toISOString(),
                    description: "Boarding extension added",
                    amount: calculatedPrice || 0,
                    type: "charge",
                    status: "pending",
                  },
                ],
              };
            }

            // For grooming service
            if (selectedRequest.type === "grooming") {
              // Create a record of the grooming service
              const groomingService = {
                id: `svc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                name: `Grooming: ${selectedGroomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`,
                price: calculatedPrice || 0,
                requestId: selectedRequest.id,
                timestamp: new Date().toISOString(),
                appliedDate: new Date().toISOString(),
              };

              // Get existing additional services or initialize empty array
              const existingServices = boarding.additionalServices || [];

              // Update transaction record description
              transactionRecord.description = `Grooming service: ${selectedGroomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`;

              // Calculate the new total with all charges
              const newTotalPrice =
                boarding.totalPrice + (calculatedPrice || 0);

              // Update the boarding record
              return {
                ...boarding,
                paymentStatus: "Pending", // Change to pending regardless of previous status
                totalPrice: newTotalPrice,
                additionalServices: [...existingServices, groomingService],
                transactions: [
                  ...(boarding.transactions || []),
                  transactionRecord,
                ],
                outstandingBalance:
                  (boarding.outstandingBalance || 0) + (calculatedPrice || 0),
                updatedAt: new Date().toISOString(),
                lastModifiedBy: "Admin",
                lastModificationReason: "Grooming service added",
                paymentDue: true,
                paymentHistory: [
                  ...(boarding.paymentHistory || []),
                  {
                    date: new Date().toISOString(),
                    description: "Grooming service added",
                    amount: calculatedPrice || 0,
                    type: "charge",
                    status: "pending",
                  },
                ],
              };
            }
          }
          return boarding;
        });

        setBoardingData(updatedBoardingData);

        // Find the updated boarding details to show in the dialog
        const updatedBoarding = updatedBoardingData.find(
          (b) => b.id === selectedRequest.boardingId,
        );
        if (updatedBoarding) {
          setSelectedBoardingDetails(updatedBoarding);
        }
      }

      setIsProcessing(false);
      setShowProcessDialog(false);

      // Show success dialog
      setSuccessDialog({
        open: true,
        title: "Request Completed Successfully",
        message: `The ${getRequestTypeLabel(selectedRequest.type).toLowerCase()} for ${selectedRequest.petName} has been completed.`,
        type: selectedRequest.type,
      });

      // Set new completed requests flag
      setHasNewCompletedRequests(true);

      // Immediately switch to the completed tab to show the user where the request went
      setActiveTab("completed");

      // Reset form state
      setSelectedRequest(null);
      setProcessingNotes("");
      setSelectedFiles([]);
      setPreviewUrls([]);
      setExtensionDate(undefined);
      setSelectedGroomingService("premium-wash-and-cut");
    }, 1500);
  };

  // Add a useEffect to handle dialog sequencing
  useEffect(() => {
    // If success dialog closes and we have boarding details to show, open that dialog
    if (!successDialog.open && selectedBoardingDetails) {
      // Small delay to prevent dialog overlap
      const timer = setTimeout(() => {
        setShowBoardingDetailsDialog(true);
        // Clear the selected boarding details after showing the dialog
        // to prevent it from showing again if success dialog opens for another reason
        setSelectedBoardingDetails(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [successDialog.open, selectedBoardingDetails]);

  const handleUndoAccept = (request: any) => {
    setRequestToUndo(request);
    setUndoAcceptMessage("");
    setShowUndoAcceptDialog(true);
  };

  const confirmUndoAccept = () => {
    if (!requestToUndo) return;

    setIsProcessing(true);

    // BACKEND INTEGRATION:
    // Replace this setTimeout with an actual API call
    // Example:
    // try {
    //   const response = await fetch(`/api/requests/${requestToUndo.id}/return`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ reason: undoAcceptMessage }),
    //   });
    //
    //   if (!response.ok) throw new Error('Failed to return request');
    //
    //   const updatedRequest = await response.json();
    //
    //   // Update local state with the response from the server
    //   setRequests(prev => prev.map(req =>
    //     req.id === updatedRequest.id ? updatedRequest : req
    //   ));
    //
    //   setIsProcessing(false);
    //   setShowUndoAcceptDialog(false);
    //
    //   toast({
    //     title: "Request Returned",
    //     description: `The request has been returned to the New Requests tab.`,
    //   });
    //
    //   setRequestToUndo(null);
    //   setUndoAcceptMessage("");
    // } catch (error) {
    //   console.error('Error returning request:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to return the request. Please try again.",
    //     variant: "destructive",
    //   });
    //   setIsProcessing(false);
    // }

    // Simulate API call
    setTimeout(() => {
      // Update the request status back to "new" (not in-progress)
      const updatedRequests = requests.map((req) =>
        req.id === requestToUndo.id
          ? {
              ...req,
              status: "new", // Change to "new" instead of "in-progress"
              undoReason: undoAcceptMessage,
              undoTimestamp: new Date().toISOString(),
              undoBy: "Admin",
              // Keep the original data but mark as undone
              _previousData: {
                status: req.status,
                processingNotes: req.processingNotes,
              },
            }
          : req,
      );

      setRequests(updatedRequests);
      setIsProcessing(false);
      setShowUndoAcceptDialog(false);

      // Show success toast
      toast({
        title: "Request Returned to New Requests",
        description: `The ${getRequestTypeLabel(requestToUndo.type).toLowerCase()} for ${requestToUndo.petName} has been returned to the New Requests tab.`,
        duration: 5000,
      });

      // Reset state
      setRequestToUndo(null);
      setUndoAcceptMessage("");
    }, 1500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery("");
    setFilterType("all");

    // BACKEND INTEGRATION:
    // Replace this setTimeout with an actual API call
    // Example:
    // try {
    //   const response = await fetch('/api/requests?status=in-progress,completed');
    //   if (!response.ok) throw new Error('Failed to fetch requests');
    //   const data = await response.json();
    //   setRequests(data);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error('Error fetching requests:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to refresh data. Please try again.",
    //     variant: "destructive",
    //   });
    //   setIsLoading(false);
    // }

    // NOTE FOR BACKEND: Replace with actual API call to refresh data
    setTimeout(() => {
      // Simulate refreshing data
      setRequests([...sampleRequests]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    // BACKEND INTEGRATION:
    // Replace this setTimeout with an actual API call
    // Example:
    // try {
    //   const response = await fetch(`/api/requests?search=${encodeURIComponent(query)}&status=${activeTab}`);
    //   if (!response.ok) throw new Error('Failed to search requests');
    //   const data = await response.json();
    //   setRequests(data);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error('Error searching requests:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to search. Please try again.",
    //     variant: "destructive",
    //   });
    //   setIsLoading(false);
    // }

    // NOTE FOR BACKEND: Replace with actual API call to search requests
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplaceFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Modify the filteredAndSortedRequests to highlight newly completed requests
  // Update the filteredAndSortedRequests function to properly filter requests based on the active tab
  // This ensures that completed requests are immediately removed from the In Progress tab
  const filteredAndSortedRequests = requests
    .filter((request) => {
      // Filter by tab - this ensures requests are only shown in their appropriate tabs
      if (activeTab === "in-progress" && request.status !== "in-progress")
        return false;
      if (activeTab === "completed" && request.status !== "completed")
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
      if (activeTab === "completed") {
        // Sort completed requests by completion date - newest first
        const dateA = new Date(a.completedAt || a.createdAt).getTime();
        const dateB = new Date(b.completedAt || b.createdAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        // Sort in-progress requests by creation date
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      }
    })
    // Add a property to identify newly completed requests (completed in the last hour)
    .map((request) => {
      if (request.status === "completed" && request.completedAt) {
        const completedTime = new Date(request.completedAt).getTime();
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        const isNew =
          completedTime > oneHourAgo || request.isNewlyCompleted === true;
        return {
          ...request,
          isNewlyCompleted: isNew,
        };
      }
      return request;
    });

  // Reset new completed requests flag when switching to completed tab
  useEffect(() => {
    if (activeTab === "completed") {
      setHasNewCompletedRequests(false);
    }
  }, [activeTab]);

  // Handle file selection for multiple files
  const handleMultipleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    // Generate preview URLs for the selected files
    const newPreviewUrls: string[] = [];
    files.forEach((file) => {
      newPreviewUrls.push(URL.createObjectURL(file));
    });
    setPreviewUrls(newPreviewUrls);
  };

  // Remove a specific file from the selected files
  const handleRemoveSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedPreviewUrls = [...previewUrls];
    updatedPreviewUrls.splice(index, 1);
    setPreviewUrls(updatedPreviewUrls);
  };

  // Add this to the component
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
          Request Management
        </h1>
        <p className="text-muted-foreground">
          Process and complete approved requests from pet owners.
        </p>
      </motion.div>

      {/* Update the search bar, filter, date filter and refresh section to be more responsive
         Replace the existing flex container with this improved version */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            {isSearching ? (
              <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
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
                  setIsSearching(false);
                }, 300);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[140px] h-10">
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

            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-10 w-10 flex-shrink-0"
              title="Refresh data"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Interface */}
      <div className="bg-card rounded-lg shadow-sm border">
        <Tabs
          defaultValue="in-progress"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="px-4 pt-4">
            <TabsList className="w-full grid grid-cols-2 h-14 p-1 bg-muted/30 dark:bg-muted/20 rounded-lg">
              <TabsTrigger
                value="in-progress"
                className={`flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base ${
                  activeTab === "in-progress"
                    ? "bg-background shadow-sm font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Loader2 className="h-5 w-5" />
                <span className="hidden sm:inline">In Progress</span>
                <span className="sm:hidden">In Progress</span>
                <Badge
                  variant={
                    activeTab === "in-progress" ? "default" : "secondary"
                  }
                  className="ml-1 text-xs px-2 py-0 h-5"
                >
                  {requests.filter((r) => r.status === "in-progress").length}
                </Badge>
              </TabsTrigger>

              <TabsTrigger
                value="completed"
                className={`flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base relative ${
                  activeTab === "completed"
                    ? "bg-background shadow-sm font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Completed</span>
                <span className="sm:hidden">Completed</span>
                <Badge
                  variant={activeTab === "completed" ? "default" : "secondary"}
                  className="ml-1 text-xs px-2 py-0 h-5"
                >
                  {requests.filter((r) => r.status === "completed").length}
                </Badge>
                {hasNewCompletedRequests && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 p-0 flex items-center justify-center animate-pulse"
                    >
                      <span className="sr-only">New</span>
                      <span aria-hidden="true">!</span>
                    </Badge>
                  </motion.div>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="in-progress" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
              {isLoading ? (
                // Skeleton loading for cards
                Array.from({ length: 6 }).map((_, index) => (
                  <RequestCardSkeleton key={index} />
                ))
              ) : filteredAndSortedRequests.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState message="No requests in progress" />
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {filteredAndSortedRequests.map((request) => (
                      <InProgressRequestCard
                        key={request.id}
                        request={request}
                        onProcess={() => {
                          setSelectedRequest(request);
                          if (
                            request.type === "grooming" &&
                            request.groomingService
                          ) {
                            setSelectedGroomingService(request.groomingService);
                          }
                          setActiveTab("process");
                          setShowProcessDialog(true);
                        }}
                        onViewDetails={() => {
                          setSelectedRequest(request);
                          if (
                            request.type === "grooming" &&
                            request.groomingService
                          ) {
                            setSelectedGroomingService(request.groomingService);
                          }
                          setActiveTab("info");
                          setShowProcessDialog(true);
                        }}
                        onUndoAccept={() => handleUndoAccept(request)}
                      />
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
              {isLoading ? (
                // Skeleton loading for cards
                Array.from({ length: 6 }).map((_, index) => (
                  <RequestCardSkeleton key={index} />
                ))
              ) : filteredAndSortedRequests.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState message="No completed requests found" />
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {filteredAndSortedRequests.map((request) => (
                      <CompletedRequestCard
                        key={request.id}
                        request={request}
                      />
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Request Dialog */}
      <EnhancedRequestDialog
        open={showProcessDialog}
        onOpenChange={setShowProcessDialog}
        request={selectedRequest}
        onComplete={handleCompleteRequest}
        isProcessing={isProcessing}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedFiles={selectedFiles}
        previewUrls={previewUrls}
        handleMultipleFileSelect={handleMultipleFileSelect}
        handleRemoveSelectedFile={handleRemoveSelectedFile}
      />

      {/* Success Dialog */}
      <SuccessDialog
        open={successDialog.open}
        onOpenChange={(open) => setSuccessDialog({ ...successDialog, open })}
        title={successDialog.title}
        description={successDialog.message}
        type={successDialog.type as any}
      />

      {/* Boarding Details Dialog */}
      <Dialog
        open={showBoardingDetailsDialog}
        onOpenChange={setShowBoardingDetailsDialog}
      >
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"} max-h-[90vh] overflow-y-auto`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              Boarding Payment Updated
            </DialogTitle>
            <DialogDescription>
              The boarding record has been updated with additional charges.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {selectedBoardingDetails && (
              <>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
                    <Bell className="h-4 w-4" />
                    <span className="font-medium">Payment Status:</span>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800"
                    >
                      {selectedBoardingDetails.paymentStatus}
                    </Badge>
                  </div>
                  {selectedBoardingDetails.outstandingBalance > 0 && (
                    <div className="mt-2 text-sm text-amber-800 dark:text-amber-300">
                      <span className="font-medium">Outstanding Balance:</span>{" "}
                      <span className="font-bold">
                        {formatCurrency(
                          selectedBoardingDetails.outstandingBalance,
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Pet
                    </span>
                    <div className="text-base font-medium mt-1">
                      {selectedBoardingDetails.pet.name}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Owner
                    </span>
                    <div className="text-base font-medium mt-1">
                      {selectedBoardingDetails.owner.name}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Original Total
                  </span>
                  <div className="text-base font-medium mt-1">
                    {formatCurrency(
                      selectedBoardingDetails.totalPrice -
                        (selectedBoardingDetails.additionalCharges || 0),
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Additional Charges
                  </span>
                  <div className="mt-1 p-3 bg-green-50 border border-green-100 rounded-md text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-lg font-medium">
                      {formatCurrency(
                        selectedBoardingDetails.additionalCharges || 0,
                      )}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({selectedBoardingDetails.additionalChargesReason})
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    New Total
                  </span>
                  <div className="text-xl font-bold mt-1 text-green-700 dark:text-green-400">
                    {formatCurrency(selectedBoardingDetails.totalPrice)}
                  </div>
                </div>

                {/* New section: Recent Transaction */}
                {selectedBoardingDetails.transactions &&
                  selectedBoardingDetails.transactions.length > 0 && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Recent Transaction
                      </span>
                      <div className="mt-1 p-3 bg-blue-50 border border-blue-100 rounded-md text-blue-700 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">ID:</span>
                          <span className="text-sm">
                            {
                              selectedBoardingDetails.transactions[
                                selectedBoardingDetails.transactions.length - 1
                              ].id
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-medium">Type:</span>
                          <span className="text-sm capitalize">
                            {
                              selectedBoardingDetails.transactions[
                                selectedBoardingDetails.transactions.length - 1
                              ].requestType
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-medium">Amount:</span>
                          <span className="text-sm text-green-600 dark:text-green-400 font-bold">
                            {formatCurrency(
                              selectedBoardingDetails.transactions[
                                selectedBoardingDetails.transactions.length - 1
                              ].amount,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-medium">Status:</span>
                          <Badge variant="outline" className="capitalize">
                            {
                              selectedBoardingDetails.transactions[
                                selectedBoardingDetails.transactions.length - 1
                              ].status
                            }
                          </Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {new Date(
                            selectedBoardingDetails.transactions[
                              selectedBoardingDetails.transactions.length - 1
                            ].timestamp,
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-medium mb-1">Next Steps:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Notify the pet owner about the additional charges</li>
                      <li>Collect payment before pet release</li>
                      <li>Update payment status in Boarding Management</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowBoardingDetailsDialog(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Undo Accept Dialog - Update the title and description */}
      <Dialog
        open={showUndoAcceptDialog}
        onOpenChange={setShowUndoAcceptDialog}
      >
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"}`}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Return Request to New
            </DialogTitle>
            <DialogDescription>
              This will move the request back to the "New Requests" tab. Please
              provide a reason for this change that will be visible to the pet
              owner.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="undo-reason" className="font-medium">
                Reason for Returning Request
              </Label>
              <Textarea
                id="undo-reason"
                placeholder="Enter the reason for returning this request to the New Requests tab..."
                value={undoAcceptMessage}
                onChange={(e) => setUndoAcceptMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This message will be sent to the pet owner to explain why their
                request is being returned to the New Requests tab for
                reassignment or further evaluation.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUndoAcceptDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={confirmUndoAccept}
              disabled={!undoAcceptMessage.trim() || isProcessing}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Return"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Update the InProgressRequestCard component to enhance labels and values
function InProgressRequestCard({
  request,
  onProcess,
  onUndoAccept,
  onViewDetails,
}: InProgressRequestCardProps) {
  const [showConfirmProcessDialog, setShowConfirmProcessDialog] =
    useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallCard = useMediaQuery("(max-width: 400px)");

  return (
    <>
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
          className={`w-full h-full flex flex-col ${getCardBorderColor(request.type)} ${getCardBgColor(request.type)} cursor-pointer hover:shadow-md transition-shadow`}
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
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 flex-grow">
            <p className="text-sm line-clamp-3 text-foreground/90 dark:text-foreground/80">
              {request.description}
            </p>

            {request.type === "boarding-extension" &&
              request.extensionDetails && (
                <div className="mt-3 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Extension
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-amber-700 dark:text-amber-400">
                      {request.extensionDetails.duration}{" "}
                      {request.extensionDetails.unit}
                    </span>
                    {request.price && (
                      <span className="text-base font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(request.price)}
                      </span>
                    )}
                  </div>
                </div>
              )}

            {request.type === "grooming" && request.groomingService && (
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Service
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-green-700 dark:text-green-400">
                    {request.groomingService
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  {request.price && (
                    <span className="text-base font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(request.price)}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="mt-3">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Submitted
              </span>
              <div className="text-sm font-medium mt-0.5">
                {formatDate(request.createdAt)}
              </div>
            </div>

            {/* Show undo reason if this was previously completed and undone */}
            {request.undoReason && (
              <div className="mt-3 p-2 bg-amber-50 border border-amber-100 rounded-md dark:bg-amber-950/20 dark:border-amber-800">
                <p className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300 font-medium">
                  Returned to In-Progress
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  {request.undoReason}
                </p>
                <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                  {request.undoTimestamp
                    ? formatDate(request.undoTimestamp)
                    : ""}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className={`p-4 pt-0 mt-auto flex flex-col gap-2`}>
            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                // Show confirmation dialog instead of directly calling onProcess
                setShowConfirmProcessDialog(true);
              }}
              size={isSmallCard ? "sm" : "default"}
            >
              Process Request
            </Button>
            <Button
              variant="outline"
              className="w-full text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/50"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                onUndoAccept && onUndoAccept();
              }}
              size={isSmallCard ? "sm" : "default"}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to New
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog
        open={showConfirmProcessDialog}
        onOpenChange={setShowConfirmProcessDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Process Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to process this request for{" "}
              {request.petName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmProcessDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowConfirmProcessDialog(false);
                onProcess();
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Update CompletedRequestCard to remove 'new' badge when viewed
function CompletedRequestCard({ request }: CompletedRequestCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isNewlyCompleted, setIsNewlyCompleted] = useState(
    request.isNewlyCompleted,
  );
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Remove the 'new' badge when the details dialog is opened
  const handleViewDetails = () => {
    setIsNewlyCompleted(false);
    setShowDetails(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="h-full"
      >
        <Card
          className={`border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 w-full h-full flex flex-col ${
            isNewlyCompleted
              ? "ring-2 ring-green-400 dark:ring-green-600 shadow-md"
              : ""
          }`}
          onClick={handleViewDetails}
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
              <div className="flex items-center gap-1">
                {isNewlyCompleted && (
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800"
                  >
                    New
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800"
                >
                  <CheckCircle className="h-3 w-3 mr-1" /> Completed
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 flex-grow">
            <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">
              {request.description}
            </p>

            {(request.type === "grooming" ||
              request.type === "boarding-extension") &&
              request.price && (
                <div className="mt-3 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Price
                  </span>
                  <span className="text-base font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(request.price)}
                  </span>
                </div>
              )}

            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-3">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Submitted
                </span>
                <div className="text-sm font-medium mt-0.5">
                  {formatDate(request.createdAt)}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Completed
                </span>
                <div className="text-sm font-medium mt-0.5">
                  {formatDate(request.completedAt)}
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Completed by
                </span>
                <div className="text-sm font-medium mt-0.5">
                  {request.completedBy}
                </div>
              </div>
            </div>

            {/* Show media thumbnail if available */}
            {request.mediaFiles &&
              (request.type === "photo" || request.type === "video") && (
                <div className="mt-3">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    {request.type === "photo" ? "Photos" : "Video"}
                  </span>
                  <div className="mt-1 bg-muted/30 rounded-md p-2 flex items-center justify-between">
                    <span className="text-sm">
                      {request.mediaFiles.count || 1} {request.type}
                      {request.mediaFiles.count > 1 ? "s" : ""} uploaded
                    </span>
                    <Badge variant="outline" className="text-xs">
                      View in details
                    </Badge>
                  </div>
                </div>
              )}
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog
        open={showDetails}
        onOpenChange={(open) => {
          if (!open) {
            setShowDetails(false);
          }
        }}
      >
        <DialogContent
          className={`${isMobile ? "w-[95vw] max-w-lg" : "max-w-4xl"} ${isMobile ? "h-[90vh]" : "h-[85vh]"} p-0 flex flex-col`}
        >
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl flex items-center gap-2">
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
              {getRequestTypeLabel(request.type)} Request
            </DialogTitle>
            <DialogDescription>
              Completed on {formatDate(request.completedAt)} by{" "}
              {request.completedBy}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left panel - Request details */}
            <div className="w-full md:w-1/2 border-r overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/30">
              <div className="space-y-5">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Pet Information
                  </h3>
                  <p className="text-lg font-semibold">{request.petName}</p>
                  <p className="text-sm">
                    Owner:{" "}
                    <span className="font-medium">{request.petOwnerName}</span>
                  </p>
                </div>

                {request.type === "boarding-extension" &&
                  request.extensionDetails && (
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                      <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                        Extension Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Duration:</span>
                          <span className="text-base font-medium text-amber-700 dark:text-amber-400">
                            {request.extensionDetails.duration}{" "}
                            {request.extensionDetails.unit}
                          </span>
                        </div>
                        {request.price && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Price:</span>
                            <span className="text-base font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(request.price)}
                            </span>
                          </div>
                        )}
                        {request.newEndDate && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">New End Date:</span>
                            <span className="text-base font-medium">
                              {formatDate(request.newEndDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {request.type === "grooming" && request.groomingService && (
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                      Grooming Service
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Service:</span>
                        <span className="text-base font-medium text-green-700 dark:text-green-400">
                          {request.groomingService
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      {request.price && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Price:</span>
                          <span className="text-base font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(request.price)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Timeline
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Submitted:</span>
                      <span className="text-base font-medium">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completed:</span>
                      <span className="text-base font-medium">
                        {formatDate(request.completedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {request.mediaFiles && (
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                      Media
                    </h3>
                    <div className="p-3 bg-muted/50 rounded-md text-center">
                      <span className="font-medium">
                        {request.mediaFiles.count || 1} {request.type}
                        {request.mediaFiles.count > 1 ? "s" : ""} uploaded
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel - Chat conversation */}
            <div className="w-full md:w-1/2 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Pet owner request message */}
                <ChatBubble
                  sender={request.petOwnerName}
                  message={request.description}
                  timestamp={request.createdAt}
                  avatar={request.petOwnerName.charAt(0)}
                  isAdmin={false}
                  type={request.type}
                />

                {/* Admin response message */}
                <ChatBubble
                  sender={request.completedBy || "Admin"}
                  message={
                    request.processingNotes || "Request completed successfully."
                  }
                  timestamp={request.completedAt}
                  avatar="A"
                  isAdmin={true}
                />

                {/* Conditional media message from admin */}
                {request.mediaFiles && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={`Here's the ${
                      request.type === "photo"
                        ? request.mediaFiles.count > 1
                          ? "photos"
                          : "photo"
                        : "video"
                    } of ${request.petName} as requested.`}
                    timestamp={request.completedAt}
                    avatar="A"
                    isAdmin={true}
                    media={{
                      url: request.mediaFiles.urls
                        ? request.mediaFiles.urls[0]
                        : "/placeholder.svg?height=300&width=400",
                      type: request.type === "photo" ? "image" : "video",
                      urls: request.mediaFiles.urls,
                      audioUrl: request.mediaFiles.audioUrl,
                      audioName: request.mediaFiles.audioName,
                    }}
                  />
                )}

                {/* Conditional confirmation message for boarding extension */}
                {request.type === "boarding-extension" &&
                  request.newEndDate && (
                    <ChatBubble
                      sender={request.completedBy || "Admin"}
                      message={`The boarding extension has been approved. The new end date is ${formatDate(request.newEndDate)}.`}
                      timestamp={request.completedAt}
                      avatar="A"
                      isAdmin={true}
                    />
                  )}

                {/* Conditional confirmation message for grooming */}
                {request.type === "grooming" && (
                  <ChatBubble
                    sender={request.completedBy || "Admin"}
                    message={`The grooming service (${request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}) has been completed for ${request.petName}.`}
                    timestamp={request.completedAt}
                    avatar="A"
                    isAdmin={true}
                  />
                )}
              </div>

              {/* Removed chat input area - no longer needed */}
              <div className="p-4 border-t">
                <div className="text-center text-sm text-muted-foreground">
                  This conversation is completed
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Enhance the RequestCardSkeleton component with better animation
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

export const getCardBorderColor = (type: string) => {
  if (type === "photo") return "border-blue-200 dark:border-blue-800";
  if (type === "video") return "border-purple-200 dark:border-purple-800";
  if (type === "grooming") return "border-green-200 dark:border-green-800";
  if (type === "boarding-extension")
    return "border-amber-200 dark:border-amber-800";
  if (type === "custom") return "border-gray-200 dark:border-gray-800";
  return "border-border";
};

export const getCardBgColor = (type: string) => {
  if (type === "photo") return "bg-blue-50 dark:bg-blue-950/20";
  if (type === "video") return "bg-purple-50 dark:bg-purple-950/20";
  if (type === "grooming") return "bg-green-50 dark:bg-green-950/20";
  if (type === "boarding-extension") return "bg-amber-50 dark:bg-amber-950/20";
  if (type === "custom") return "bg-gray-50 dark:bg-gray-950/20";
  return "bg-background";
};
