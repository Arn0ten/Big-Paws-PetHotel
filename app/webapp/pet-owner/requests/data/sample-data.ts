/**
 * PET OWNER REQUESTS MODULE - SAMPLE DATA
 *
 * This file contains sample data for the Pet Owner Requests module.
 * In a production environment, this data would be fetched from the backend API.
 *
 * BACKEND INTEGRATION NOTES:
 *
 * 1. API Endpoints Required:
 *    - GET /api/pet-owner/requests - Fetch all requests for the logged-in pet owner
 *      Parameters: status, type, page, limit
 *    - POST /api/pet-owner/requests - Create a new request
 *      Payload: { type, petId, description, isUrgent, extensionDetails?, groomingService? }
 *    - GET /api/pet-owner/requests/:id - Fetch a single request by ID
 *
 * 2. Data Models:
 *    - Request: id, type, petId, petName, status, createdAt, description,
 *      completedAt, rejectionReason, mediaUrls, inProgress
 *
 * 3. Data Transformation:
 *    - Convert ISO date strings to Date objects if needed
 *    - Format status values to display-friendly labels
 */

// Sample data for demonstration
export const sampleRequests = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    status: "pending",
    createdAt: "2025-03-10T10:30:00Z",
    description: "Would love to see how Max is doing today!",
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Bella",
    status: "approved",
    createdAt: "2025-03-09T14:15:00Z",
    description: "Please give Bella a bath and trim her nails.",
    inProgress: true,
  },
  {
    id: "req-003",
    type: "boarding-extension",
    petName: "Charlie",
    status: "completed",
    createdAt: "2025-03-08T09:45:00Z",
    description: "Need to extend Charlie's stay by 2 more days.",
    completedAt: "2025-03-08T11:30:00Z",
  },
  {
    id: "req-004",
    type: "video",
    petName: "Luna",
    status: "rejected",
    createdAt: "2025-03-07T16:20:00Z",
    description: "Would like a short video of Luna playing.",
    rejectionReason: "Staff unavailable for video at the moment.",
  },
]

// Sample pet data for the pet owner
export const samplePets = [
  {
    id: "pet-001",
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    isBoarding: true,
  },
  {
    id: "pet-002",
    name: "Bella",
    type: "Cat",
    breed: "Siamese",
    age: 2,
    isBoarding: true,
  },
  {
    id: "pet-003",
    name: "Charlie",
    type: "Dog",
    breed: "Beagle",
    age: 4,
    isBoarding: true,
  },
  {
    id: "pet-004",
    name: "Luna",
    type: "Cat",
    breed: "Maine Coon",
    age: 1,
    isBoarding: false,
  },
]

