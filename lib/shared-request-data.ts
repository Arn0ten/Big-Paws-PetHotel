/**
 * Shared Request Data Module
 *
 * This module provides a centralized data store for request data
 * that is shared between the Requests and Request Management modules.
 *
 * BACKEND INTEGRATION:
 * In a production environment, this would be replaced with API calls
 * to fetch data from your backend server.
 */

import {
  sampleRequests,
  sampleBoardingData,
} from "@/app/webapp/admin/data/request-management-sample-data";
import { create } from "zustand";

// Define the request types
export type RequestType =
  | "photo"
  | "video"
  | "grooming"
  | "boarding-extension"
  | "custom";
export type RequestStatus = "new" | "in-progress" | "completed" | "rejected";
export type PetSize = "Small" | "Medium" | "Large" | "XLarge";

// Define the extension details interface
export interface ExtensionDetails {
  duration: string;
  unit: "hours" | "days";
  currentEndDate: string;
  newEndDate?: string;
}

// Define the request interface
export interface Request {
  id: string;
  type: RequestType;
  petName: string;
  petId: string;
  petOwnerId: string;
  petOwnerName: string;
  status: RequestStatus;
  createdAt: string;
  description: string;
  petSize: PetSize;
  boardingId: string;

  // Optional fields based on request type and status
  groomingService?: string;
  extensionDetails?: ExtensionDetails;

  // Fields for approved requests
  approvedAt?: string;
  approvedBy?: string;

  // Fields for completed requests
  completedAt?: string;
  completedBy?: string;
  processingNotes?: string;
  mediaFiles?: {
    type: string;
    urls: string[];
    count: number;
  };
  price?: number;

  // Fields for rejected requests
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionReason?: string;

  // Fields for reconsidered requests
  reconsideredAt?: string;
  reconsideredBy?: string;
  reconsiderationReason?: string;
  isReconsidered?: boolean;

  // UI state flags
  isNewlyCompleted?: boolean;
}

// Sample data for demonstration
const initialRequests: Request[] = sampleRequests;

// Define the store interface
interface RequestStore {
  requests: Request[];
  setRequests: (requests: Request[]) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  addRequest: (request: Request) => void;
  removeRequest: (id: string) => void;
  getRequestById: (id: string) => Request | undefined;
  getRequestsByStatus: (status: RequestStatus) => Request[];
  reset: () => void;
}

// Create the store
export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: initialRequests,

  setRequests: (requests) => set({ requests }),

  updateRequest: (id, updates) => {
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, ...updates } : request,
      ),
    }));
  },

  addRequest: (request) => {
    set((state) => ({
      requests: [...state.requests, request],
    }));
  },

  removeRequest: (id) => {
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== id),
    }));
  },

  getRequestById: (id) => {
    return get().requests.find((request) => request.id === id);
  },

  getRequestsByStatus: (status) => {
    return get().requests.filter((request) => request.status === status);
  },

  reset: () => set({ requests: initialRequests }),
}));

// Sample boarding data that matches with the requests
export const boardingData = sampleBoardingData;

// Helper functions for working with boarding data
export const getBoardingDetails = (boardingId: string) => {
  return boardingData.find((boarding) => boarding.id === boardingId);
};
