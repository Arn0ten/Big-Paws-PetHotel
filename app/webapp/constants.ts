/**
 * Application Constants
 *
 * This file contains constants used throughout the application.
 *
 * BACKEND INTEGRATION NOTES:
 * 1. These constants should be used consistently across both pet owner and admin interfaces
 * 2. Some of these values might come from the backend API in a real implementation
 * 3. Consider moving dynamic values to API endpoints
 */

// Request statuses
export const REQUEST_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

// Request status labels
export const REQUEST_STATUS_LABELS = {
  [REQUEST_STATUS.PENDING]: "Pending",
  [REQUEST_STATUS.APPROVED]: "Approved",
  [REQUEST_STATUS.IN_PROGRESS]: "In Progress",
  [REQUEST_STATUS.COMPLETED]: "Completed",
  [REQUEST_STATUS.REJECTED]: "Rejected",
  [REQUEST_STATUS.CANCELLED]: "Cancelled",
};

// Request types
export const REQUEST_TYPES = {
  PHOTO: "photo",
  VIDEO: "video",
  GROOMING: "grooming",
  BOARDING_EXTENSION: "boarding-extension",
  // CUSTOM: "custom",
};

// Request type labels
export const REQUEST_TYPE_LABELS = {
  [REQUEST_TYPES.PHOTO]: "Photo Updates",
  [REQUEST_TYPES.VIDEO]: "Video Request",
  [REQUEST_TYPES.GROOMING]: "Grooming Service",
  [REQUEST_TYPES.BOARDING_EXTENSION]: "Boarding Extension",
  // [REQUEST_TYPES.CUSTOM]: "Custom Request",
};

// Pet types
export const PET_TYPES = {
  DOG: "dog",
  CAT: "cat",
  BIRD: "bird",
  SMALL_ANIMAL: "small-animal",
  REPTILE: "reptile",
  OTHER: "other",
};

// Pet sizes
export const PET_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  EXTRA_LARGE: "extra-large",
};

// Notification types
export const NOTIFICATION_TYPES = {
  REQUEST_CREATED: "request-created",
  REQUEST_UPDATED: "request-updated",
  REQUEST_APPROVED: "request-approved",
  REQUEST_REJECTED: "request-rejected",
  REQUEST_COMPLETED: "request-completed",
  NEW_MESSAGE: "new-message",
  MEDIA_ADDED: "media-added",
};

// Notification channels
export const NOTIFICATION_CHANNELS = {
  EMAIL: "email",
  SMS: "sms",
  IN_APP: "in-app",
  PUSH: "push",
};

// API endpoints
export const API_ENDPOINTS = {
  PETS: "/api/pets",
  REQUESTS: "/api/requests",
  MESSAGES: "/api/messages",
  MEDIA: "/api/media",
  NOTIFICATIONS: "/api/notifications",
  USER: "/api/users",
};

// Media types
export const MEDIA_TYPES = {
  PHOTO: "photo",
  VIDEO: "video",
  DOCUMENT: "document",
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};
