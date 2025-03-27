import { Camera, Video, Scissors, Clock, FileText } from "lucide-react";

/**
 * UI Helper Functions for Request Management
 *
 * These functions provide consistent UI elements and styling across
 * both the admin and pet owner interfaces.
 *
 * BACKEND INTEGRATION:
 * - No direct API integration needed for these helper functions
 * - Ensure that the request types used in the API match these constants
 */

/**
 * Get the icon component for a request type
 * @param type The request type
 * @returns The icon component
 */
export const getRequestTypeIcon = (type: string) => {
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

/**
 * Get the display label for a request type
 * @param type The request type
 * @returns The display label
 */
export const getRequestTypeLabel = (type: string) => {
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

/**
 * Get the border color class for a request card
 * @param type The request type
 * @returns The Tailwind CSS class for the border color
 */
export const getCardBorderColor = (type: string) => {
  switch (type) {
    case "photo":
      return "border-blue-200 dark:border-blue-800";
    case "video":
      return "border-purple-200 dark:border-purple-800";
    case "grooming":
      return "border-green-200 dark:border-green-800";
    case "boarding-extension":
      return "border-amber-200 dark:border-amber-800";
    case "custom":
      return "border-gray-200 dark:border-gray-700";
    case "dog":
      return "border-blue-200 dark:border-blue-800";
    case "cat":
      return "border-purple-200 dark:border-purple-800";
    default:
      return "";
  }
};

/**
 * Get the background color class for a request card
 * @param type The request type
 * @returns The Tailwind CSS class for the background color
 */
export const getCardBgColor = (type: string) => {
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
    case "dog":
      return "bg-blue-50 dark:bg-blue-950/20";
    case "cat":
      return "bg-purple-50 dark:bg-purple-950/20";
    default:
      return "";
  }
};

/**
 * Get the icon background color class for a request type
 * @param type The request type
 * @returns The Tailwind CSS class for the icon background
 */
export const getIconBgColorClass = (type: string) => {
  switch (type) {
    case "photo":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "video":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "grooming":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "boarding-extension":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
    case "custom":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
  }
};

/**
 * Format a date string for display
 * @param dateString The ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/**
 * Format a currency value for display
 * @param amount The amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get time ago in words
 * @param date ISO date string
 * @returns Time ago in words
 */
export const getTimeAgo = (date: string) => {
  try {
    const now = new Date();
    const pastDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - pastDate.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  } catch (error) {
    console.error("Error calculating time ago:", error);
    return "N/A";
  }
};
