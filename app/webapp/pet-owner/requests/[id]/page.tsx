"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoIosArrowBack } from "react-icons/io";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Camera,
  Video,
  Scissors,
  CheckCircle2,
  X,
  AlertCircle,
  XCircle,
  Info,
  Loader2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TbClockPlus } from "react-icons/tb";
import { IoVideocam } from "react-icons/io5";
import { BsFillCameraFill } from "react-icons/bs";
import { FaCut } from "react-icons/fa";
import { requests, getPricingData } from "@/app/webapp/data/sample-data";
import { formatDate } from "@/app/webapp/utils/date-utils";

// Add the necessary imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { JSX } from "react/jsx-runtime";

// Define interfaces for our data structures
interface MediaFiles {
  urls: string[];
}

interface ConversationMessage {
  id: string;
  sender: "owner" | "admin";
  content: string;
  timestamp: string;
}

interface ExtensionDetails {
  duration: number;
  unit: string;
}

interface PetRequest {
  id: string;
  type: "photo" | "video" | "grooming" | "boarding-extension" | string;
  title?: string;
  status:
    | "pending"
    | "new"
    | "approved"
    | "in-progress"
    | "completed"
    | "rejected"
    | "cancelled"
    | string;
  description: string;
  petName: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  processingNotes?: string;
  rejectionReason?: string;
  mediaFiles?: MediaFiles;
  groomingService?: string;
  newEndDate?: string;
  extensionDetails?: ExtensionDetails;
  price?: number;
  conversation?: ConversationMessage[];
}

// Add a function to calculate price based on pet size and service type
// Add this after the interface definitions but before the component
const calculatePrice = (
  type: string,
  petSize = "medium",
  service?: string,
  duration?: number,
  unit?: string,
): number => {
  const pricing = getPricingData();

  switch (type) {
    case "grooming":
      if (!service) return 0;

      // Convert service string to pricing key
      const serviceKey =
        service === "basic-wash"
          ? "basicWash"
          : service === "premium-wash"
            ? "premiumWash"
            : service === "premium-wash-and-cut"
              ? "premiumWashAndCut"
              : "fullGrooming";

      // Get price based on pet size
      const sizeKey = petSize.toLowerCase() as
        | "small"
        | "medium"
        | "large"
        | "xlarge";
      return pricing.grooming.dogs[serviceKey][sizeKey];

    case "boarding-extension":
      if (!duration || !unit) return 0;

      // Get daily rate based on pet size
      const dailyRate =
        pricing.boarding.dogs[
          petSize.toLowerCase() as "small" | "medium" | "large" | "xlarge"
        ];

      // Calculate total based on duration and unit
      if (unit === "days") {
        return dailyRate * duration;
      } else {
        // For hours, use hourly rate
        return pricing.boarding.daycare.hourly * duration;
      }

    default:
      return 0;
  }
};

/**
 * Request Detail Page
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace the static data with an API call to fetch the request details
 *    - Endpoint: GET /api/pet-owner/requests/:id
 *
 * 2. Add proper error handling and loading states
 */
export default function RequestDetailPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;

  const [request, setRequest] = useState<PetRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Add state for the confirmation dialog
  const { toast } = useToast();
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [showCancelSuccess, setShowCancelSuccess] = useState<boolean>(false);

  const [fullscreenMedia, setFullscreenMedia] = useState<string | null>(null);
  const [fullscreenType, setFullscreenType] = useState<"image" | "video">(
    "image",
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from") || "requests";
  const fromTab = searchParams.get("tab") || "pending";

  useEffect(() => {
    const fetchRequest = async (): Promise<void> => {
      try {
        // In production, replace with actual API call
        // const response = await fetch(`/api/pet-owner/requests/${requestId}`)
        // if (!response.ok) throw new Error('Request not found')
        // const data = await response.json()

        // For demo, we'll use the local data
        const foundRequest = requests.find((r) => r.id === requestId) as
          | PetRequest
          | undefined;
        if (!foundRequest) {
          console.log("Request not found for id:", requestId); // Log the request ID for debugging
          setError("Request not found");
          setLoading(false);
          return;
        }

        setRequest(foundRequest);
      } catch (error) {
        console.error("Error fetching request:", error);
        setError("Request not found or could not be loaded");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId, searchParams]);

  // Get request type icon
  const getRequestTypeIcon = (type: string): JSX.Element => {
    switch (type) {
      case "photo":
        return <BsFillCameraFill className="h-5 w-5" />;
      case "video":
        return <IoVideocam className="h-5 w-5" />;
      case "grooming":
        return <FaCut className="h-5 w-5" />;
      case "boarding-extension":
        return <TbClockPlus className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case "pending":
      case "new":
        return (
          <div className="self-start">
            <Badge className="bg-yellow-600 text-white inline-flex whitespace-nowrap">
              Pending
            </Badge>
          </div>
        );
      case "approved":
      case "in-progress":
        return (
          <div className="self-start">
            <Badge className="bg-blue-600 hover:bg-blue-600 text-white inline-flex whitespace-nowrap">
              In Progress
            </Badge>
          </div>
        );
      case "completed":
        return (
          <div className="self-start">
            <Badge className="bg-green-600 hover:bg-green-600 text-white inline-flex whitespace-nowrap">
              Completed
            </Badge>
          </div>
        );
      case "rejected":
        return (
          <div className="self-start">
            <Badge className="bg-red-600 hover:bg-red-600 text-white inline-flex whitespace-nowrap">
              Rejected
            </Badge>
          </div>
        );
      default:
        return (
          <div className="self-start">
            <Badge className="bg-gray-600 hover:bg-gray-600 text-white inline-flex whitespace-nowrap">
              <AlertCircle className="h-3 w-3 mr-1" /> {status}
            </Badge>
          </div>
        );
    }
  };

  // Get request type title
  const getRequestTypeTitle = (type: string): string => {
    switch (type) {
      case "photo":
        return "Photo Update";
      case "video":
        return "Video Request";
      case "grooming":
        return "Grooming Service";
      case "boarding-extension":
        return "Boarding Extension";
      default:
        return "Service Request";
    }
  };

  // Add a function to handle cancellation
  const handleCancelRequest = (): void => {
    setIsCancelling(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would call an API to cancel the request
      setIsCancelling(false);
      setShowCancelConfirm(false);
      setShowCancelSuccess(true);
    }, 1500);
  };

  // Add a function to handle success dialog close
  const handleSuccessClose = (): void => {
    setShowCancelSuccess(false);

    // Update the local request state to show it's cancelled
    if (request) {
      setRequest({
        ...request,
        status: "cancelled",
      });
    }

    toast({
      title: "Request Cancelled",
      description: "Your request has been successfully cancelled.",
      duration: 5000,
    });

    // Navigate back to the requests page with the correct tab
    router.push(`/webapp/pet-owner/requests?activeTab=${fromTab}`);
  };

  // Function to handle back button click
  const handleBackClick = () => {
    if (fromPage === "notifications") {
      router.push("/webapp/pet-owner/notifications");
    } else {
      // Ensure we're using the correct tab parameter
      router.push(`/webapp/pet-owner/requests?activeTab=${fromTab}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading request details...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className="mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Request not found"}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button
            onClick={() =>
              router.push(`/webapp/pet-owner/requests?activeTab=${fromTab}`)
            }
          >
            Return to Requests
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        {/* Use the handleBackClick function for the back button  */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className="mr-4 border border-gray-300 dark:border-gray-600"
        >
          <IoIosArrowBack className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">
            Request Details
          </h1>
          <p className="text-base text-muted-foreground dark:text-muted-foreground/90">
            View details of your service request
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  {getRequestTypeIcon(request.type)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                    {request.title || getRequestTypeTitle(request.type)}
                  </h2>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                    Request ID: {request.id}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                {getStatusBadge(request.status)}
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                  Submitted: {formatDate(request.createdAt)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {request.status === "pending" && (
              <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 mb-4">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-800 dark:text-blue-300">
                  Cancellation Policy
                </AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400">
                  You can cancel this request while it remains in "Pending"
                  status. Once our staff begins processing your request, it can
                  no longer be cancelled.
                </AlertDescription>
              </Alert>
            )}
            {request.status === "rejected" && request.rejectionReason && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-200 dark:bg-red-400/10 dark:border-red-400/30"
              >
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-300" />
                <AlertTitle className="text-red-800 dark:text-red-200">
                  Request Rejected
                </AlertTitle>
                <AlertDescription className="text-red-600 dark:text-red-200">
                  {request.rejectionReason}
                </AlertDescription>
              </Alert>
            )}

            {/*    Section - Moved to the top */}
            <div>
              <h3 className="text-base font-medium mb-2">Conversation</h3>
              <Card className="bg-muted/50 dark:bg-muted/20">
                <CardContent className="p-4 space-y-4">
                  {/* Initial request message */}
                  <div className="flex gap-3 justify-end">
                    <div className="max-w-[80%] rounded-xl p-5 bg-primary text-primary-foreground ml-auto shadow-lg border border-primary/30 dark:border-primary/40 transition-colors">
                      <p className="text-lg font-semibold whitespace-pre-wrap text-primary-foreground dark:text-primary-foreground">
                        {request.description}
                      </p>
                      <p className="text-xs opacity-70 mt-2 text-right text-primary-foreground/80 dark:text-primary-foreground/70">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Owner request message */}
                  {/* {request.conversation &&
                    request.conversation.length > 0 &&
                    request.conversation.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "owner" ? "justify-end" : ""}`}
                      >
                        {message.sender !== "owner" && (
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                            A
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3
                            ${
                              message.sender === "owner"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-gray-100 dark:bg-gray-800 text-foreground dark:text-foreground"
                            }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))} */}
                  {/* Admin response with media for photo/video requests */}
                  {request.status === "completed" && (
                    <>
                      {/* Admin text response
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                          A
                        </div>
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-foreground dark:text-foreground">
                          <p className="text-sm whitespace-pre-wrap">
                            {request.processingNotes ||
                              "Your request has been completed."}
                          </p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {formatDate(request.completedAt || "")}
                          </p>
                        </div>
                      </div> */}

                      {/* Media response for photo/video requests */}
                      {(request.type === "photo" || request.type === "video") &&
                        request.mediaFiles &&
                        request.mediaFiles.urls &&
                        request.mediaFiles.urls.length > 0 && (
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                              A
                            </div>
                            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-foreground dark:text-foreground">
                              {/* Auto Build og chatbubble for informing petowner sa update*/}
                              <p className="text-lg font-semibold text-foreground whitespace-pre-wrap">
                                Here's the{" "}
                                {request.type === "photo"
                                  ? request.mediaFiles.urls.length > 1
                                    ? "photos"
                                    : "photo"
                                  : "video"}{" "}
                                of {request.petName} as requested.
                              </p>

                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {request.mediaFiles.urls.map((url, index) => (
                                  <div
                                    key={index}
                                    className="rounded-md overflow-hidden border relative group"
                                  >
                                    {request.type === "photo" ? (
                                      <>
                                        <img
                                          src={url || "/placeholder.svg"}
                                          alt={`${request.petName} photo ${index + 1}`}
                                          className="object-cover w-full h-32"
                                        />
                                        <div
                                          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                          onClick={() => {
                                            setFullscreenType("image");
                                            setFullscreenMedia(url);
                                            setCurrentMediaIndex(index);
                                          }}
                                        >
                                          <Eye className="h-6 w-6 text-white" />
                                        </div>
                                      </>
                                    ) : (
                                      <div className="relative">
                                        <video
                                          src={url}
                                          controls
                                          className="w-full h-32"
                                        />
                                        <div
                                          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                          onClick={() => {
                                            setFullscreenType("video");
                                            setFullscreenMedia(url);
                                            setCurrentMediaIndex(index);
                                          }}
                                        >
                                          <Eye className="h-6 w-6 text-white" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>

                              <p className="text-xs opacity-70 mt-1 text-right">
                                {formatDate(request.completedAt || "")}
                              </p>
                            </div>
                          </div>
                        )}

                      {/* Specific response for grooming service */}
                      {request.type === "grooming" && (
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                            A
                          </div>
                          <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-foreground dark:text-foreground">
                            <p className="text-lg font-semibold text-foreground whitespace-pre-wrap">
                              The grooming service (
                              {request.groomingService
                                ?.replace(/-/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                              ) has been completed for {request.petName}.
                            </p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {formatDate(request.completedAt || "")}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Add conditional for displaying grooming photos */}
                      {/* Specific response for boarding extension */}
                      {request.type === "boarding-extension" &&
                        request.newEndDate && (
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                              A
                            </div>
                            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-foreground dark:text-foreground">
                              <p className="text-lg font-semibold text-foreground whitespace-pre-wrap">
                                The boarding extension has been approved. The
                                new end date is {formatDate(request.newEndDate)}
                                .
                              </p>
                              <p className="text-xs opacity-70 mt-1 text-right">
                                {formatDate(request.completedAt || "")}
                              </p>
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {request.status === "pending" && (
              <div className="flex justify-end mt-6">
                <Button
                  variant="destructive"
                  onClick={() => setShowCancelConfirm(true)}
                  className="w-full sm:w-auto"
                >
                  Cancel Request
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-2">Request Details</h3>
                <Card className="bg-muted/50 dark:bg-muted/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      {/* Left Section */}
                      <div className="space-y-3 w-full md:w-1/2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Request Type
                          </p>
                          <p className="text-sm text-foreground dark:text-foreground font-semibold">
                            {getRequestTypeTitle(request.type)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Pet
                          </p>
                          <p className="text-sm text-foreground dark:text-foreground font-semibold">
                            {request.petName}
                          </p>
                        </div>
                        {request.type === "grooming" &&
                          request.groomingService && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                Grooming Service
                              </p>
                              <p className="text-sm text-foreground dark:text-foreground font-semibold">
                                {request.groomingService
                                  .replace(/-/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </p>
                            </div>
                          )}
                      </div>

                      {/* Right Section */}
                      <div className="space-y-3 w-full md:w-1/2">
                        {request.type === "boarding-extension" &&
                          request.extensionDetails && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                Extension Details
                              </p>
                              <p className="text-sm text-foreground dark:text-foreground font-semibold">
                                {request.extensionDetails.duration}{" "}
                                {request.extensionDetails.unit}
                              </p>
                            </div>
                          )}
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Price
                          </p>
                          <p className="text-lg text-primary font-bold">
                            ₱{" "}
                            {request.price ||
                              calculatePrice(
                                request.type,
                                "medium", // Ideally get pet size
                                request.groomingService,
                                request.extensionDetails?.duration
                                  ? Number.parseInt(
                                      request.extensionDetails.duration.toString(),
                                    )
                                  : undefined,
                                request.extensionDetails?.unit,
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">Status Timeline</h3>
                <Card className="bg-muted/50 dark:bg-muted/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white">
                        <Calendar className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground dark:text-foreground">
                          Request Submitted
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    {request.status === "in-progress" && (
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-600 text-white flex-shrink-0 flex-grow-0">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-foreground">
                            In Progress
                          </p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                            Your request is being processed
                          </p>
                        </div>
                      </div>
                    )}

                    {(request.status === "pending" ||
                      request.status === "new") && (
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-600 text-white  flex-shrink-0 flex-grow-0">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground dark:text-foreground">
                            Completed
                          </p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                            {formatDate(request.completedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {request.status === "rejected" && (
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-white flex-shrink-0 flex-grow-0">
                          <XCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-foreground">
                            Rejected
                          </p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                            {formatDate(request.updatedAt || request.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Fullscreen Media Viewer */}
      {fullscreenMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setFullscreenMedia(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10 rounded-full bg-black/40"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenMedia(null);
              }}
            >
              <X className="h-6 w-6" />
            </Button>

            {fullscreenType === "image" &&
              request?.mediaFiles?.urls &&
              request.mediaFiles.urls.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 rounded-full bg-black/40"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex =
                        currentMediaIndex > 0
                          ? currentMediaIndex - 1
                          : request.mediaFiles!.urls.length - 1;
                      setCurrentMediaIndex(newIndex);
                      setFullscreenMedia(request.mediaFiles!.urls[newIndex]);
                    }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 rounded-full bg-black/40"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex =
                        currentMediaIndex < request.mediaFiles!.urls.length - 1
                          ? currentMediaIndex + 1
                          : 0;
                      setCurrentMediaIndex(newIndex);
                      setFullscreenMedia(request.mediaFiles!.urls[newIndex]);
                    }}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}

            {fullscreenType === "image" ? (
              <img
                src={fullscreenMedia || "/placeholder.svg"}
                alt="Fullscreen view"
                className="max-h-[90vh] max-w-full object-contain mx-auto"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <video
                src={fullscreenMedia}
                controls
                autoPlay
                className="max-h-[90vh] max-w-full mx-auto"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {fullscreenType === "image" &&
              request?.mediaFiles?.urls &&
              request.mediaFiles.urls.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full">
                  <p className="text-white text-sm">
                    {currentMediaIndex + 1} / {request.mediaFiles.urls.length}
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this request? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Request</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelRequest}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel Request"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showCancelSuccess} onOpenChange={setShowCancelSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Request Cancelled Successfully
            </DialogTitle>
            <DialogDescription>
              Your request has been successfully cancelled.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSuccessClose} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
