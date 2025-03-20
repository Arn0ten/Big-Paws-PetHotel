// Types for request management module
export type RequestType =
  | "photo"
  | "video"
  | "grooming"
  | "boarding-extension"
  | "custom";

export type RequestStatus = "in-progress" | "completed";

export type PaymentStatus = "Paid" | "Not Paid" | "Pending";

export type PetSize = "Small" | "Medium" | "Large" | "XLarge";

export interface MediaPreview {
  file: File;
  url: string;
  type: "image" | "video";
}

export interface BoardingExtension {
  duration: string;
  unit: "hours" | "days";
  currentEndDate: string;
  newEndDate?: string;
}

export interface GroomingService {
  type: string;
  price: number;
}

export interface Request {
  id: string;
  type: RequestType;
  petName: string;
  petSize: PetSize;
  petOwnerId: string;
  petOwnerName: string;
  status: RequestStatus;
  createdAt: string;
  description: string;
  isUrgent: boolean;
  completedAt?: string;
  completedBy?: string;
  processingNotes?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  groomingService?: string;
  extensionDetails?: BoardingExtension;
  price?: number;
  fileUploaded?: boolean;
  extensionApproved?: boolean;
  newEndDate?: string;
  isNew?: boolean;
  mediaFiles?: {
    urls: string[];
    types: ("image" | "video")[];
  };
}

// Pricing constants based on uploaded images
export const BOARDING_RATES = {
  hourly: {
    Small: 25,
    Medium: 30,
    Large: 40,
    XLarge: 50,
  },
  daily: {
    Small: 320,
    Medium: 400,
    Large: 480,
    XLarge: 550,
  },
};

export const GROOMING_RATES = {
  "basic-wash": {
    Small: 180,
    Medium: 220,
    Large: 280,
    XLarge: 320,
  },
  "premium-wash": {
    Small: 300,
    Medium: 450,
    Large: 650,
    XLarge: 850,
  },
  "premium-wash-cut": {
    Small: 450,
    Medium: 600,
    Large: 700,
    XLarge: 850,
  },
  "full-grooming": {
    Small: 500,
    Medium: 650,
    Large: 700,
    XLarge: 800,
  },
};
