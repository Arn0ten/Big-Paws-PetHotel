/**
 * HISTORY MODULE SAMPLE DATA
 *
 * This file contains centralized sample data for the History module.
 *
 * IMPORTANT: This module only logs successful/completed events from admin interface modules.
 * Unsuccessful or pending events are not tracked in this history log.
 */

// Types for history module
export interface HistoryEntry {
  id: string
  timestamp: string
  module: "pet-owner" | "pet" | "boarding" | "request" | "request-management" | "registration"
  action: string
  description: string
  performedBy: string
  status: "completed" | "succeeding" // Only completed or succeeding statuses
  petId?: string
  petName?: string
  ownerId?: string
  ownerName?: string
  amount?: number
  requestId?: string
  requestType?: string
  mediaUrls?: string[] // Updated to support multiple media URLs
  mediaTypes?: ("image" | "video")[] // Updated to track media types for each URL
}

export interface MediaEntry {
  id: string
  timestamp: string
  petName: string
  ownerName: string
  requestId: string
  requestType: "photo" | "video"
  description: string
  mediaUrls: string[] // Array of media URLs
  mediaTypes: ("image" | "video")[] // Array of media types corresponding to each URL
  completedBy: string
  completedAt: string
}

/**
 * BACKEND INTEGRATION GUIDE:
 *
 * To implement real-time event logging for successful admin actions:
 *
 * 1. Create a centralized logging service that can be called from any admin module
 * 2. Each module should call this service after a successful operation
 * 3. Only log events that have completed successfully - do not log failed attempts
 * 4. Implement the following in each module:
 *
 *    Pet Management Module:
 *    - After successfully adding a pet: logAdminEvent('pet', 'add', 'New pet added', adminUser, 'completed', {petDetails})
 *    - After successfully updating a pet: logAdminEvent('pet', 'update', 'Pet information updated', adminUser, 'completed', {petDetails})
 *
 *    Pet Owner Management Module:
 *    - After successfully adding an owner: logAdminEvent('pet-owner', 'add', 'New pet owner added', adminUser, 'completed', {ownerDetails})
 *    - After successfully updating an owner: logAdminEvent('pet-owner', 'update', 'Pet owner information updated', adminUser, 'completed', {ownerDetails})
 *
 *    Registration Module:
 *    - After successfully registering an owner: logAdminEvent('registration', 'register', 'New pet owner registered', adminUser, 'completed', {ownerDetails})
 *
 *    Boarding Module:
 *    - After successfully boarding a pet: logAdminEvent('boarding', 'check-in', 'Pet checked in for boarding', adminUser, 'completed', {boardingDetails})
 *    - After successfully releasing a pet: logAdminEvent('boarding', 'check-out', 'Pet released from boarding', adminUser, 'completed', {boardingDetails})
 *
 *    Request Management Module:
 *    - After successfully processing a request: logAdminEvent('request-management', 'complete', 'Request completed', adminUser, 'completed', {requestDetails, mediaDetails})
 *
 *    Requests Module:
 *    - After successfully approving a request: logAdminEvent('request', 'approve', 'Request approved', adminUser, 'completed', {requestDetails})
 *
 * 5. The logging service should store these events in a dedicated history collection/table
 * 6. Include timestamps and the admin user who performed the action
 * 7. For media-related events, store references to the media files
 */

// Generate sample history data with only successful events
// BACKEND INTEGRATION: Replace this with actual API calls to fetch history data
export const generateSampleHistoryData = (): HistoryEntry[] => {
  const historyEntries: HistoryEntry[] = []

  // Pet Owner Management: Adding a new pet owner
  historyEntries.push({
    id: "hist-001",
    timestamp: "2023-11-01T09:30:00Z",
    module: "pet-owner",
    action: "add",
    description: "New pet owner added",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  })

  // Pet Owner Management: Updating pet owner information
  historyEntries.push({
    id: "hist-002",
    timestamp: "2023-11-02T14:15:00Z",
    module: "pet-owner",
    action: "update",
    description: "Pet owner information updated",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-002",
    ownerName: "John Reyes",
  })

  // Pet Management: Adding a new pet
  historyEntries.push({
    id: "hist-003",
    timestamp: "2023-11-03T10:45:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  })

  // Pet Management: Updating pet information
  historyEntries.push({
    id: "hist-004",
    timestamp: "2023-11-04T11:20:00Z",
    module: "pet",
    action: "update",
    description: "Pet information updated",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
  })

  // Boarding Management: Boarding a pet
  historyEntries.push({
    id: "hist-005",
    timestamp: "2023-11-05T08:30:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    amount: 1200.0,
  })

  // Boarding Management: Releasing a pet
  historyEntries.push({
    id: "hist-006",
    timestamp: "2023-11-10T16:45:00Z",
    module: "boarding",
    action: "check-out",
    description: "Pet released from boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    amount: 1200.0,
  })

  // Requests: Approving a request
  historyEntries.push({
    id: "hist-007",
    timestamp: "2023-11-12T09:15:00Z",
    module: "request",
    action: "approve",
    description: "Photo request approved",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-001",
    requestType: "photo",
  })

  // Request Management: Successful request processing (photo)
  historyEntries.push({
    id: "hist-008",
    timestamp: "2023-11-13T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-001",
    requestType: "photo",
    mediaUrls: [
      "/images/pet-photos/sample-1.png",
      "/images/pet-photos/sample-2.png",
      "/images/pet-photos/sample-3.png",
    ],
    mediaTypes: ["image", "image", "image"],
  })

  // Requests: Approving a video request
  historyEntries.push({
    id: "hist-009",
    timestamp: "2023-11-14T13:45:00Z",
    module: "request",
    action: "approve",
    description: "Video request approved",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-002",
    requestType: "video",
  })

  // Request Management: Successful request processing (video)
  historyEntries.push({
    id: "hist-010",
    timestamp: "2023-11-15T14:20:00Z",
    module: "request-management",
    action: "complete",
    description: "Video request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-002",
    requestType: "video",
    mediaUrls: ["/videos/pet-videos/sample-video-1.mp4"],
    mediaTypes: ["video"],
  })

  // Pet Owner Registration: Successful registration
  historyEntries.push({
    id: "hist-011",
    timestamp: "2023-11-16T09:00:00Z",
    module: "registration",
    action: "register",
    description: "New pet owner registered through admin interface",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-003",
    ownerName: "Ana Lim",
  })

  // Pet Management: Adding another pet
  historyEntries.push({
    id: "hist-012",
    timestamp: "2023-11-17T10:15:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Lim",
  })

  // Boarding Management: Boarding another pet
  historyEntries.push({
    id: "hist-013",
    timestamp: "2023-11-18T08:45:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Lim",
    amount: 900.0,
  })

  // Pet Owner Management: Adding another pet owner
  historyEntries.push({
    id: "hist-014",
    timestamp: "2023-11-19T11:30:00Z",
    module: "pet-owner",
    action: "add",
    description: "New pet owner added",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
  })

  // Pet Management: Adding a pet for the new owner
  historyEntries.push({
    id: "hist-015",
    timestamp: "2023-11-20T13:20:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
  })

  // Boarding Management: Forced release of a pet
  historyEntries.push({
    id: "hist-016",
    timestamp: "2023-11-21T15:10:00Z",
    module: "boarding",
    action: "forced-check-out",
    description: "Pet released from boarding (forced)",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-003",
    petName: "Luna",
    ownerId: "owner-003",
    ownerName: "Ana Lim",
    amount: 900.0,
  })

  // Pet Management: Updating pet information
  historyEntries.push({
    id: "hist-017",
    timestamp: "2023-11-22T09:45:00Z",
    module: "pet",
    action: "update",
    description: "Pet information updated",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
  })

  // Requests: Approving another photo request
  historyEntries.push({
    id: "hist-018",
    timestamp: "2023-11-23T10:30:00Z",
    module: "request",
    action: "approve",
    description: "Photo request approved",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-003",
    requestType: "photo",
  })

  // Request Management: Successful request processing
  historyEntries.push({
    id: "hist-019",
    timestamp: "2023-11-24T11:15:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-003",
    requestType: "photo",
    mediaUrls: ["/images/pet-photos/sample-4.png", "/images/pet-photos/sample-5.png"],
    mediaTypes: ["image", "image"],
  })

  // Pet Owner Management: Updating owner information
  historyEntries.push({
    id: "hist-020",
    timestamp: "2023-11-25T14:00:00Z",
    module: "pet-owner",
    action: "update",
    description: "Pet owner information updated",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  })

  // Request Management: Another successful photo request
  historyEntries.push({
    id: "hist-021",
    timestamp: "2023-11-26T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-004",
    requestType: "photo",
    mediaUrls: [
      "/images/pet-photos/sample-6.png",
      "/images/pet-photos/sample-7.png",
      "/images/pet-photos/sample-8.png",
    ],
    mediaTypes: ["image", "image", "image"],
  })

  // Boarding Management: Another pet boarding
  historyEntries.push({
    id: "hist-022",
    timestamp: "2023-11-27T09:15:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    amount: 1500.0,
  })

  // Pet Owner Registration: Another successful registration
  historyEntries.push({
    id: "hist-023",
    timestamp: "2023-11-28T11:45:00Z",
    module: "registration",
    action: "register",
    description: "New pet owner registered through admin interface",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-005",
    ownerName: "Elena Cruz",
  })

  // Pet Management: Adding a pet for the new owner
  historyEntries.push({
    id: "hist-024",
    timestamp: "2023-11-29T13:30:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-005",
    petName: "Rocky",
    ownerId: "owner-005",
    ownerName: "Elena Cruz",
  })

  // Boarding Management: Another pet release
  historyEntries.push({
    id: "hist-025",
    timestamp: "2023-11-30T16:00:00Z",
    module: "boarding",
    action: "check-out",
    description: "Pet released from boarding",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    amount: 1500.0,
  })

  // Requests: Approving a video request
  historyEntries.push({
    id: "hist-026",
    timestamp: "2023-12-01T10:15:00Z",
    module: "request",
    action: "approve",
    description: "Video request approved",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-005",
    petName: "Rocky",
    ownerId: "owner-005",
    ownerName: "Elena Cruz",
    requestId: "req-005",
    requestType: "video",
  })

  // Request Management: Successful video request processing
  historyEntries.push({
    id: "hist-027",
    timestamp: "2023-12-02T15:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Video request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-005",
    petName: "Rocky",
    ownerId: "owner-005",
    ownerName: "Elena Cruz",
    requestId: "req-005",
    requestType: "video",
    mediaUrls: ["/videos/pet-videos/sample-video-2.mp4", "/videos/pet-videos/sample-video-3.mp4"],
    mediaTypes: ["video", "video"],
  })

  return historyEntries.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

// Generate sample media entries based on history data
// BACKEND INTEGRATION: Replace this with actual API calls to fetch media data
export const generateSampleMediaData = (historyData: HistoryEntry[]): MediaEntry[] => {
  const mediaEntries: MediaEntry[] = []

  // Filter history entries for completed media requests
  const completedMediaRequests = historyData.filter(
    (entry) =>
      entry.module === "request-management" &&
      entry.action === "complete" &&
      (entry.requestType === "photo" || entry.requestType === "video") &&
      entry.mediaUrls &&
      entry.mediaUrls.length > 0,
  )

  // Create media entries from completed requests
  completedMediaRequests.forEach((entry) => {
    if ((entry.requestType === "photo" || entry.requestType === "video") && entry.mediaUrls && entry.mediaTypes) {
      mediaEntries.push({
        id: entry.id,
        timestamp: entry.timestamp,
        petName: entry.petName || "",
        ownerName: entry.ownerName || "",
        requestId: entry.requestId || "",
        requestType: entry.requestType as "photo" | "video",
        description: entry.description,
        mediaUrls: entry.mediaUrls,
        mediaTypes: entry.mediaTypes,
        completedBy: entry.performedBy,
        completedAt: entry.timestamp,
      })
    }
  })

  return mediaEntries.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

export const sampleHistoryData = generateSampleHistoryData()
export const sampleMediaData = generateSampleMediaData(sampleHistoryData)
