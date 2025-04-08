"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, CheckCircle2, Clock, Info } from "lucide-react";
import { formatDate } from "@/app/webapp/utils/date-helpers";
import { notifications } from "@/app/webapp/data/sample-data";

export default function NotificationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [notification, setNotification] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchNotification = async () => {
    //   try {
    //     const response = await fetch(`/api/notifications/${params.id}`);
    //     if (!response.ok) throw new Error('Failed to fetch notification');
    //     const data = await response.json();
    //     setNotification(data);
    //   } catch (error) {
    //     console.error('Error fetching notification:', error);
    //     setError('Failed to load notification. Please try again later.');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // For demo, use the sample data
    const fetchNotification = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const notif = notifications.find((n) => n.id === params.id);
        if (notif) {
          setNotification(notif);
        } else {
          setError("Notification not found");
        }
        setIsLoading(false);
      }, 500);
    };

    fetchNotification();
  }, [params.id]);

  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "request-completed":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
        );
      case "request-in-progress":
        return <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      case "payment-reminder":
        return <Bell className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case "request-rejected":
        return <Bell className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case "boarding-update":
        return <Bell className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    router.push("/webapp/pet-owner/notifications");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-6 w-40 bg-muted animate-pulse rounded-md"></div>
        </div>

        <Card>
          <CardHeader>
            <div className="h-7 w-3/4 bg-muted animate-pulse rounded-md"></div>
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded-md"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="h-8 w-8 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">Notification Details</h1>
        </div>

        <Card>
          <CardContent className="p-6 text-center">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-medium mb-2">Notification Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The notification you're looking for doesn't exist or has been
              deleted.
            </p>
            <Button onClick={handleBackClick}>Back to Notifications</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className="h-8 w-8 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-foreground dark:text-foreground">
          Notification Details
        </h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <CardTitle className="text-xl text-foreground dark:text-foreground">
                  {notification.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(notification.timestamp)}
                </p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white">
              {notification.isRead ? "Read" : "New"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-foreground dark:text-foreground">
              {notification.message}
            </p>

            {notification.type === "request-completed" && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                  Request Completed
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Your request has been completed. You can view the details by
                  clicking the button below.
                </p>
              </div>
            )}

            {notification.type === "request-in-progress" && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-900/20 dark:border-amber-800">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">
                  Request In Progress
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Your request is now being processed. You'll receive another
                  notification when it's completed.
                </p>
              </div>
            )}

            {notification.type === "payment-reminder" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                  Payment Reminder
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400">
                  Please ensure your payment is made before the due date to
                  avoid any service interruptions.
                </p>
              </div>
            )}

            {notification.type === "request-rejected" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                  Request Rejected
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400">
                  Unfortunately, your request could not be processed. Please
                  check the details for more information.
                </p>
              </div>
            )}

            {notification.type === "boarding-update" && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Boarding Update
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  There's an update regarding your pet's boarding. Please review
                  the details for more information.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBackClick}>
            Back to Notifications
          </Button>
          {notification.requestId && (
            <Button asChild>
              <Link
                href={`/webapp/pet-owner/requests/${notification.requestId}?from=notifications&tab=pending`}
              >
                View Request
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
