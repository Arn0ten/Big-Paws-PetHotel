/**
 * Pet Owner Registration Constants
 *
 * This file contains all the constants used in the pet owner registration process.
 */

// Toast message constants
export const TOAST_MESSAGES = {
  VALIDATION_SUCCESS: {
    PERSONAL: {
      title: "Personal information validated",
      description: "Moving to address information",
    },
    ADDRESS: {
      title: "Address information validated",
      description: "Moving to summary",
    },
  },
  VALIDATION_ERROR: {
    title: "Validation Error",
    description: "Please fill in all required fields before proceeding",
  },
  REGISTRATION_SUCCESS: {
    title: "Registration Successful",
    description: "Pet owner has been registered successfully.",
  },
  REGISTRATION_ERROR: {
    title: "Registration Error",
    description: "Failed to register pet owner. Please try again.",
  },
  CREDENTIALS_SENT: {
    title: "Credentials Sent",
    description: "Login credentials have been sent successfully.",
  },
  CREDENTIALS_ERROR: {
    title: "Error Sending Credentials",
    description: "Failed to send credentials. Please try again.",
  },
};

// Constants for the registration process
export const REGISTRATION_CONSTANTS = {
  CREDENTIAL_EXPIRY_HOURS: 24,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIREMENTS: [
    "At least 8 characters",
    "At least one uppercase letter",
    "At least one lowercase letter",
    "At least one number",
    "At least one special character",
  ],
};

// Form validation constants
export const VALIDATION_PATTERNS = {
  EMAIL: /^\S+@\S+\.\S+$/,
  PHONE_PH: /^(09|\+639)\d{9}$/,
};

// API endpoints
export const API_ENDPOINTS = {
  REGISTER_PET_OWNER: "/api/admin/pet-owners",
  SEND_CREDENTIALS: "/api/admin/send-credentials",
  FETCH_PROVINCES: "/api/admin/locations/provinces",
  FETCH_CITIES: "/api/admin/locations/provinces/{provinceCode}/cities",
  LOG_ACTIVITY: "/api/admin/activity-log",
};
