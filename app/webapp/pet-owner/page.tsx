"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Video,
  Scissors,
  Clock,
  FileText,
  Plus,
  ArrowRight,
  Calendar,
  DollarSign,
  Info,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { formatDate } from "../utils/date-helpers";
import { requests, notifications, getPetOwnerPets } from "../data/sample-data";
import type { JSX } from "react/jsx-runtime";

// Add these interfaces at the top of the file, before the component

interface BoardingInfo {
  status: string;
  startDate: string;
  endDate: string;
  package: string;
  totalPrice: number;
  remainingAmount?: number;
}

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  size?: string;
  avatar: string;
  boarding?: BoardingInfo;
}

interface Request {
  id: string;
  type: string;
  status: string;
  petName: string;
  description: string;
  createdAt: string;
  completedAt?: string;
  rejectedAt?: string;
  updatedAt?: string;
  price?: number;
  extensionDetails?: {
    duration: number;
    unit: "hours" | "days";
  };
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: string;
  requestId?: string;
}

/**
 * Pet Owner Dashboard Page
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace static data imports with API calls:
 *    - GET /api/pets - To fetch the pet owner's pets
 *    - GET /api/requests?limit=3 - To fetch recent requests
 *    - GET /api/notifications?unread=true&limit=2 - To fetch unread notifications
 *
 * 2. Add proper loading states and error handling for API calls
 *
 * 3. Implement real-time updates for notifications using WebSockets or polling
 *    - This would allow notifications to appear without page refresh
 */
export default function PetOwnerHomePage() {
  // Update the useState declarations with proper types
  const [activeTab, setActiveTab] = useState("boarding");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [petsList, setPetsList] = useState<Pet[]>([]);
  const [requestsList, setRequestsList] = useState<Request[]>([]);
  const [notificationsList, setNotificationsList] = useState<Notification[]>(
    [],
  );

  useEffect(() => {
    // BACKEND INTEGRATION:
    // Replace this with actual API calls to fetch data
    // Example:
    // const fetchData = async () => {
    //   try {
    //     const [petsResponse, requestsResponse, notificationsResponse] = await Promise.all([
    //       fetch('/api/pets'),
    //       fetch('/api/requests?limit=3'),
    //       fetch('/api/notifications?unread=true&limit=2')
    //     ]);
    //
    //     if (!petsResponse.ok || !requestsResponse.ok || !notificationsResponse.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //
    //     const petsData = await petsResponse.json();
    //     const requestsData = await requestsResponse.json();
    //     const notificationsData = await notificationsResponse.json();
    //
    //     // Update state with fetched data
    //     setPets(petsData);
    //     setRequests(requestsData);
    //     setNotifications(notificationsData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     // Handle error state
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    //
    // fetchData();

    // Simulate API loading
    const fetchData = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo, use the sample data
      setPetsList(getPetOwnerPets());
      setRequestsList(requests.slice(0, 3));
      setNotificationsList(notifications.filter((n) => !n.isRead).slice(0, 2));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Get the active boarding pet
  const activeBoardingPet = petsList.find(
    (pet) => pet.boarding?.status === "active",
  );

  // Get recent requests (limit to 3)
  const recentRequests = requestsList;

  // Get unread notifications (limit to 2)
  const unreadNotifications = notificationsList;

  // Get request type icon
  // Update the getRequestTypeIcon function with proper typing
  const getRequestTypeIcon = (type: string): JSX.Element => {
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
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Get request type label
  // Update the getRequestTypeLabel function with proper typing
  const getRequestTypeLabel = (type: string): string => {
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
      default:
        return "Request";
    }
  };

  // Get request status badge
  // Update the getRequestStatusBadge function with proper typing
  const getRequestStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case "new":
      case "pending":
        return (
          <Badge className="bg-yellow-600 text-white">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-600 text-white">
            <CheckCircle2 className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-600 text-white">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-600 text-white">
            <AlertCircle className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-3/4 bg-muted animate-pulse rounded-md"></div>
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md"></div>

        <div className="h-64 bg-muted animate-pulse rounded-md"></div>

        <div className="h-10 bg-muted animate-pulse rounded-md"></div>

        <div className="space-y-4">
          <div className="h-24 bg-muted animate-pulse rounded-md"></div>
          <div className="h-24 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground">
          Check on your pets and manage your requests.
        </p>

        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-medium">Suggested next steps:</span> Check
                your pet's boarding status, make a new request, or view our
                pricing page for service rates.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Boarding Section */}
      {activeBoardingPet && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-foreground dark:text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Active Boarding
              </CardTitle>
              <CardDescription>
                {activeBoardingPet.name}'s current boarding details
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={activeBoardingPet.avatar}
                    alt={activeBoardingPet.name}
                  />
                  <AvatarFallback>
                    {activeBoardingPet.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-foreground dark:text-foreground">
                    {activeBoardingPet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {activeBoardingPet.breed}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Check-in
                  </p>
                  <p className="font-medium text-foreground dark:text-foreground">
                    {formatDate(activeBoardingPet.boarding?.startDate || "")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Check-out
                  </p>
                  <p className="font-medium text-foreground dark:text-foreground">
                    {formatDate(activeBoardingPet.boarding?.endDate || "")}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-md border border-border dark:border-border/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Package
                    </p>
                    <p className="font-medium text-foreground dark:text-foreground">
                      {activeBoardingPet.boarding?.package}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Total Price
                    </p>
                    <p className="font-medium text-green-600 dark:text-green-400">
                      ₱
                      {(
                        activeBoardingPet.boarding?.totalPrice || 0
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                {activeBoardingPet.boarding?.remainingAmount ? (
                  <div className="mt-3 pt-3 border-t border-border dark:border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/90 uppercase tracking-wide">
                          Remaining Balance
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                          (To be paid during pickup)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-amber-600 dark:text-amber-400">
                          ₱
                          {(
                            activeBoardingPet.boarding?.remainingAmount || 0
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Additional Charges Section - Only shown for in-progress requests */}
              {requestsList.some(
                (req) =>
                  req.status === "in-progress" &&
                  (req.type === "grooming" ||
                    req.type === "boarding-extension"),
              ) && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <h4 className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    Additional Charges
                  </h4>
                  <ul className="mt-1 text-xs text-amber-600 dark:text-amber-300 space-y-1">
                    {requestsList
                      .filter(
                        (req) =>
                          req.status === "in-progress" &&
                          req.type === "grooming",
                      )
                      .map((req, index) => (
                        <li key={`grooming-${index}`}>
                          • Grooming service for {req.petName}:
                          {req.price ? ` ₱${req.price}` : " ₱250-550"}
                          {!req.price && " (based on pet size and service)"}
                        </li>
                      ))}
                    {requestsList
                      .filter(
                        (req) =>
                          req.status === "in-progress" &&
                          req.type === "boarding-extension",
                      )
                      .map((req, index) => (
                        <li key={`extension-${index}`}>
                          • Boarding extension for {req.petName}:
                          {req.price
                            ? ` ₱${req.price}`
                            : req.extensionDetails?.unit === "hours"
                              ? " ₱50-75/hour"
                              : " ₱500-750/day"}
                        </li>
                      ))}
                  </ul>
                  <p className="text-xs text-amber-600 dark:text-amber-300 mt-1 font-medium">
                    All charges will be collected during pickup.
                  </p>
                  <div className="mt-2">
                    <Link
                      href="/webapp/pet-owner/pricing"
                      className="text-xs text-primary hover:underline inline-flex items-center dark:text-primary"
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      View full pricing details
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link
                href={`/webapp/pet-owner/requests/new?petId=${activeBoardingPet.id}`}
                className="w-full"
              >
                <Button variant="default" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Make a Request for {activeBoardingPet.name}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {/* Tabs for Pets and Requests */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs
          defaultValue="boarding"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="boarding"
              className="text-foreground dark:text-foreground"
            >
              My Pets
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="text-foreground dark:text-foreground"
            >
              Recent Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="boarding" className="mt-4 space-y-4">
            {petsList.map((pet) => (
              <Link href={`/webapp/pet-owner/pets/${pet.id}`} key={pet.id}>
                <Card className="hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={pet.avatar} alt={pet.name} />
                        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground dark:text-foreground">
                          {pet.name}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                          {pet.breed} • {pet.size || "Medium"} size • {pet.age}{" "}
                          years old
                        </p>

                        {pet.boarding ? (
                          <Badge className="mt-2 bg-green-600 text-white">
                            Currently Boarding
                          </Badge>
                        ) : (
                          <Badge className="mt-2 bg-gray-600 text-white">
                            Not Boarding
                          </Badge>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground dark:text-muted-foreground/80" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <div className="text-center text-muted-foreground p-4 border border-dashed rounded-md">
              Please contact the administrator to add or modify pets
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-4 space-y-4">
            {recentRequests.length > 0 ? (
              <>
                {recentRequests.map((request) => (
                  <Link
                    href={`/webapp/pet-owner/requests/${request.id}`}
                    key={request.id}
                  >
                    <Card className="hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`
                            p-2 rounded-full flex-shrink-0
                            ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                            ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                            ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""}
                            ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" : ""}
                            ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" : ""}
                          `}
                          >
                            {getRequestTypeIcon(request.type)}
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-foreground dark:text-foreground">
                                {getRequestTypeLabel(request.type)}
                              </h3>
                              {getRequestStatusBadge(request.status)}
                            </div>

                            <p className="text-sm text-muted-foreground dark:text-muted-foreground/90 mt-1">
                              For {request.petName}
                            </p>
                            <p className="text-sm line-clamp-1 mt-1 text-foreground/80 dark:text-foreground/80">
                              {request.description}
                            </p>

                            <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 mt-2">
                              {request.status === "completed"
                                ? `Completed ${formatDate(request.completedAt || "")}`
                                : request.status === "rejected"
                                  ? `Rejected ${formatDate(request.rejectedAt || "")}`
                                  : `Requested ${formatDate(request.createdAt)}`}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-muted/20 dark:bg-muted/10 dark:border-muted/30">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground dark:text-muted-foreground/80 mb-3" />
                <h3 className="text-lg font-medium text-foreground dark:text-foreground">
                  No requests yet
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/90 mt-1 max-w-md mx-auto">
                  You haven't made any requests for your pets. Create a request
                  to ask for photos, videos, grooming services, or boarding
                  extensions.
                </p>
              </div>
            )}

            <Link href="/webapp/pet-owner/requests/new">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Notifications Preview */}
      {unreadNotifications.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
              Recent Notifications
            </h2>
            <Link
              href="/webapp/pet-owner/notifications"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {unreadNotifications.map((notification) => (
              <Link
                href={
                  notification.requestId
                    ? `/webapp/pet-owner/requests/${notification.requestId}`
                    : `/webapp/pet-owner/notifications/${notification.id}`
                }
                key={notification.id}
              >
                <Card className="hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors cursor-pointer border-l-4 border-l-primary dark:border-l-primary">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-foreground dark:text-foreground">
                        {notification.title}
                      </h3>
                      <Badge className="bg-blue-600 text-white">New</Badge>
                    </div>
                    <p className="text-sm mt-1 line-clamp-1 text-foreground/80 dark:text-foreground/80">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 mt-1">
                      {formatDate(notification.timestamp)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
