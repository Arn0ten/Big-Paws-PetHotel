/**
 * Pet Owner Registration Types
 *
 * This file contains all the type definitions used in the pet owner registration process.
 */

// Form values interface
export interface FormValues {
  // Basic Information
  fullName: string;
  email: string;
  contactNumber: string;

  // Address Information
  streetAddress: string;
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
}

// Location data interfaces
export interface Province {
  code: any;
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  provinceId: string;
}

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
export const CONSTANTS = {
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
