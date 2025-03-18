/**
 * Application Constants
 *
 * This file contains all the constants used across the application.
 * Centralizing constants helps maintain consistency and makes updates easier.
 *
 * BACKEND INTEGRATION NOTE:
 * When implementing the backend, you may need to adjust these constants
 * to match your API endpoints and data structures.
 */

// Request Types
export const REQUEST_TYPES = {
  PHOTO: "photo",
  VIDEO: "video",
  GROOMING: "grooming",
  BOARDING_EXTENSION: "boarding-extension",
  CUSTOM: "custom",
} as const

// Request Status
export const REQUEST_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  REJECTED: "rejected",
} as const

// Pet Sizes
export const PET_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  EXTRA_LARGE: "extra-large",
} as const

// Pet Size Descriptions
export const PET_SIZE_DESCRIPTIONS = {
  [PET_SIZES.SMALL]: "Small (up to 10kg)",
  [PET_SIZES.MEDIUM]: "Medium (10-25kg)",
  [PET_SIZES.LARGE]: "Large (25-40kg)",
  [PET_SIZES.EXTRA_LARGE]: "Extra Large (40kg+)",
}

// Pet Size Examples
export const PET_SIZE_EXAMPLES = {
  [PET_SIZES.SMALL]: "Chihuahua, Shih Tzu, Cat",
  [PET_SIZES.MEDIUM]: "Beagle, Cocker Spaniel",
  [PET_SIZES.LARGE]: "Labrador, German Shepherd",
  [PET_SIZES.EXTRA_LARGE]: "Great Dane, Saint Bernard",
}

// API Endpoints
// BACKEND INTEGRATION NOTE: Replace these with your actual API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",

  // Pet Owner
  PET_OWNER_PROFILE: "/api/pet-owners/profile",
  PET_OWNER_PETS: "/api/pet-owners/pets",

  // Pets
  PETS: "/api/pets",
  PET_DETAILS: (petId: string) => `/api/pets/${petId}`,

  // Requests
  REQUESTS: "/api/requests",
  REQUEST_DETAILS: (requestId: string) => `/api/requests/${requestId}`,
  CREATE_REQUEST: "/api/requests",
  UPDATE_REQUEST: (requestId: string) => `/api/requests/${requestId}`,

  // Notifications
  NOTIFICATIONS: "/api/notifications",
  NOTIFICATION_COUNT: "/api/notifications/unread/count",
  MARK_NOTIFICATION_READ: (notificationId: string) => `/api/notifications/${notificationId}/read`,
  MARK_ALL_NOTIFICATIONS_READ: "/api/notifications/read-all",

  // Boarding
  BOARDING: "/api/boarding",
  BOARDING_DETAILS: (boardingId: string) => `/api/boarding/${boardingId}`,

  // Pricing
  PRICING: "/api/pricing",
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "big_paws_auth_token",
  USER_DATA: "big_paws_user_data",
  THEME: "big_paws_theme",
}

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  API: "yyyy-MM-dd",
  TIME: "hh:mm a",
  DATETIME: "MMM dd, yyyy hh:mm a",
}

// Currency
export const CURRENCY = {
  CODE: "PHP",
  SYMBOL: "₱",
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
}

// Request Type Icons (for reference)
export const REQUEST_TYPE_ICONS = {
  [REQUEST_TYPES.PHOTO]: "Camera",
  [REQUEST_TYPES.VIDEO]: "Video",
  [REQUEST_TYPES.GROOMING]: "Scissors",
  [REQUEST_TYPES.BOARDING_EXTENSION]: "Clock",
  [REQUEST_TYPES.CUSTOM]: "FileText",
}

// Request Type Labels
export const REQUEST_TYPE_LABELS = {
  [REQUEST_TYPES.PHOTO]: "Photo Update",
  [REQUEST_TYPES.VIDEO]: "Video Request",
  [REQUEST_TYPES.GROOMING]: "Grooming Service",
  [REQUEST_TYPES.BOARDING_EXTENSION]: "Boarding Extension",
  [REQUEST_TYPES.CUSTOM]: "Custom Request",
}

