/**
 * TYPE DEFINITIONS
 *
 * This file contains all type definitions used throughout the pet owner interface.
 * Backend developers should update these types to match the actual data model.
 */

/**
 * Pet Type
 * Represents a pet in the system
 */
export interface Pet {
  id: string;
  name: string;
  type: string; // "Dog" | "Cat" | etc.
  breed: string;
  age: string | number;
  weight?: string;
  gender?: string;
  microchip?: string;
  avatar: string;
  boarding: {
    status: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    package?: string;
    totalPrice?: number;
    paidAmount?: number;
    remainingAmount?: number;
  } | null;
  size?: string;
  medicalInfo?: string;
  vaccinations?: Array<{
    name: string;
    date: string;
    expiry: string;
  }>;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  dietaryRestrictions?: string;
  behavioralNotes?: string;
}

/**
 * Request Type
 * Represents a service request made by a pet owner
 */
export interface Request {
  id: string;
  title?: string;
  type: string; // "photo" | "video" | "grooming" | "boarding-extension" | "custom"
  petName: string;
  petId: string;
  status: string; // "new" | "in-progress" | "completed" | "rejected"
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  completedAt?: string; // ISO date string
  rejectedAt?: string; // ISO date string
  description: string;
  mediaFiles?: {
    type: string;
    urls: string[];
    count: number;
  };
  groomingService?: string;
  price?: number;
  extensionDetails?: {
    duration: string;
    unit: string; // "hours" | "days"
  };
  currentEndDate?: string; // ISO date string
  rejectedBy?: string;
  rejectionReason?: string;
  conversation?: Message[];
  newEndDate?: string; // ISO date string
  processingNotes?: string;
}

/**
 * Message Type
 * Represents a message in a conversation
 */
export interface Message {
  id: string;
  sender: string; // "owner" | "admin"
  timestamp: string; // ISO date string
  content: string;
}

/**
 * Notification Type
 * Represents a notification for a pet owner
 */
export interface Notification {
  id: string;
  type: string; // "request-completed" | "request-in-progress" | "payment-reminder" | etc.
  title: string;
  message: string;
  timestamp: string; // ISO date string
  isRead: boolean;
  requestId?: string;
}

/**
 * Pricing Type
 * Represents pricing information for services
 */
export interface Pricing {
  boarding: {
    dogs: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    cats: number;
    daycare: {
      hourly: number;
      daily: number;
    };
  };
  grooming: {
    dogs: {
      basicWash: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
      };
      premiumWash: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
      };
      premiumWashAndCut: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
      };
      fullGrooming: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
      };
    };
    cats: {
      basicWash: number;
      premiumWash: number;
    };
  };
  additionalServices: {
    tickAndFleaRemoval: number;
    nailCut: number;
    earCleaning: number;
    analSacCleaning: number;
    blowDry: number;
    woundTreatment: number;
  };
}

/**
 * MediaItem Type
 * Represents a media item in the media archive
 */
export interface MediaItem {
  id: string;
  timestamp: Date;
  petName: string;
  requestType: "photo" | "video";
  description: string;
  mediaUrls: string[];
}
