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
    id: string;
    timestamp: string;
    module: "Pet Owner Management" | "Pet Management" | "Boarding Management" | "Request Management";
    action: string;
    description: string;
    performedBy: string;
    petId?: string;
    petName?: string;
    petType?: string;
    petBreed?: string;
    petSize?: string;
    ownerId?: string;
    ownerName?: string;
    ownerEmail?: string;
    ownerPhone?: string;
    ownerAddress?: string;
    amount?: number;
    requestId?: string;
    requestType?: string;
    boardingType?: string;
    boardingDuration?: string;
    boardingStartDate?: string;
    boardingEndDate?: string;
    mediaUrls?: string[];
    mediaTypes?: ("image" | "video")[];
    groomingType?: string;
    // Boarding extension specific fields
    currentEndDate?: string;
    newEndDate?: string;
    currentEndTime?: string;
    newEndTime?: string;
}

export interface MediaEntry {
    id: string;
    timestamp: string;
    petName: string;
    ownerName: string;
    requestId: string;
    requestType: "PHOTO_REQUEST" | "VIDEO_REQUEST"; // Added this if needed "grooming" | "boarding-extension"
    description: string;
    mediaUrls: string[]; // Array of media URLs
    mediaTypes: ("image" | "video")[]; // Array of media types corresponding to each URL
    completedBy: string;
    completedAt: string;
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
    const historyEntries: HistoryEntry[] = [];

    // Pet Owner Management: Adding a new pet owner
    historyEntries.push({
        id: "hist-001",
        timestamp: "2023-11-01T09:30:00Z",
        module: "Pet Owner Management",
        action: "add",
        description: "New pet owner added",
        performedBy: "Admin",
        ownerId: "owner-001",
        ownerName: "Maria Santos",
        ownerEmail: "maria.santos@example.com",
        ownerPhone: "(555) 123-4567",
        ownerAddress: "123 Main St, Quezon City, Metro Manila",
    });

    // Pet Owner Management: Updating pet owner information
    historyEntries.push({
        id: "hist-002",
        timestamp: "2023-11-02T14:15:00Z",
        module: "Pet Owner Management",
        action: "update",
        description: "Pet owner information updated",
        performedBy: "Admin",
        ownerId: "owner-002",
        ownerName: "John Reyes",
        ownerEmail: "john.reyes@example.com",
        ownerPhone: "(555) 234-5678",
        ownerAddress: "456 Park Ave, Makati City, Metro Manila",
    });

    // Pet Management: Adding a new pet
    historyEntries.push({
        id: "hist-003",
        timestamp: "2023-11-03T10:45:00Z",
        module: "Pet Management",
        action: "add",
        description: "New pet added",
        performedBy: "Admin",
        petId: "pet-001",
        petName: "Buddy",
        petType: "Dog",
        petBreed: "Golden Retriever",
        petSize: "Large",
        ownerId: "owner-001",
        ownerName: "Maria Santos",
    });

    // Pet Management: Updating pet information
    historyEntries.push({
        id: "hist-004",
        timestamp: "2023-11-04T11:20:00Z",
        module: "Pet Management",
        action: "update",
        description: "Pet information updated",
        performedBy: "Admin",
        petId: "pet-002",
        petName: "Max",
        petType: "Dog",
        petBreed: "Beagle",
        petSize: "Medium",
        ownerId: "owner-002",
        ownerName: "John Reyes",
    });

    // Boarding Management: Boarding a pet
    historyEntries.push({
        id: "hist-005",
        timestamp: "2023-11-05T08:30:00Z",
        module: "Boarding Management",
        action: "check-in",
        description: "Pet checked in for boarding",
        performedBy: "Admin",
        petId: "pet-001",
        petName: "Buddy",
        petType: "Dog",
        petBreed: "Golden Retriever",
        petSize: "Large",
        ownerId: "owner-001",
        ownerName: "Maria Santos",
        amount: 1200.0,
        boardingType: "LongStay",
        boardingDuration: "5 days",
        boardingStartDate: "2023-11-05T08:30:00Z",
        boardingEndDate: "2023-11-10T08:30:00Z",
    });

    // Boarding Management: Releasing a pet
    historyEntries.push({
        id: "hist-006",
        timestamp: "2023-11-10T16:45:00Z",
        module: "Boarding Management",
        action: "check-out",
        description: "Pet released from boarding",
        performedBy: "Admin",
        petId: "pet-001",
        petName: "Buddy",
        petType: "Dog",
        petBreed: "Golden Retriever",
        petSize: "Large",
        ownerId: "owner-001",
        ownerName: "Maria Santos",
        amount: 1200.0,
        boardingType: "LongStay",
        boardingDuration: "5 days",
        boardingStartDate: "2023-11-05T08:30:00Z",
        boardingEndDate: "2023-11-10T08:30:00Z",
    });

    // Request Management: Successful request processing (photo)
    historyEntries.push({
        id: "hist-008",
        timestamp: "2023-11-13T10:30:00Z",
        module: "Request Management",
        action: "complete",
        description: "Photo request completed",
        performedBy: "Admin",
        petId: "pet-001",
        petName: "Buddy",
        petType: "Dog",
        petBreed: "Golden Retriever",
        ownerId: "owner-001",
        ownerName: "Maria Santos",
        requestId: "req-001",
        requestType: "PHOTO_REQUEST",
        mediaUrls: ["/pet-hotel-1.jpg", "/pet-hotel-2.jpg", "/pet-hotel-3.jpg"],
        mediaTypes: ["image", "image", "image"],
    });

    // Request Management: Successful request processing (video)
    historyEntries.push({
        id: "hist-010",
        timestamp: "2023-11-15T14:20:00Z",
        module: "Request Management",
        action: "complete",
        description: "Video request completed",
        performedBy: "Admin",
        petId: "pet-002",
        petName: "Max",
        petType: "Dog",
        petBreed: "Beagle",
        ownerId: "owner-002",
        ownerName: "John Reyes",
        requestId: "req-002",
        requestType: "VIDEO_REQUEST",
        mediaUrls: ["/video-montage.mp4"],
        mediaTypes: ["video"],
    });

    // Pet Management: Adding another pet
    historyEntries.push({
        id: "hist-012",
        timestamp: "2023-11-17T10:15:00Z",
        module: "Pet Management",
        action: "add",
        description: "New pet added",
        performedBy: "Admin",
        petId: "pet-003",
        petName: "Luna",
        petType: "Cat",
        petBreed: "Siamese",
        petSize: "Small",
        ownerId: "owner-003",
        ownerName: "Ana Lim",
    });


    // Filter out entries from "request" and "registration" modules
    return historyEntries
        .filter(
            (entry) =>
                (entry.module as string) !== "request" &&
                (entry.module as string) !== "registration",
        )
        .sort((a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
};

// Generate sample media entries based on history data
// BACKEND INTEGRATION: Replace this with actual API calls to fetch media data
export const generateSampleMediaData = (
    historyData: HistoryEntry[],
): MediaEntry[] => {
    const mediaEntries: MediaEntry[] = [];

    // Filter history entries for completed media requests
    const completedMediaRequests = historyData.filter(
        (entry) =>
            entry.module === "Request Management" &&
            (entry.requestType === "PHOTO_REQUEST" ||
                entry.requestType === "VIDEO_REQUEST" ||
                entry.requestType === "GROOMING_SERVICE" ||
                entry.requestType === "BOARDING_EXTENSION") &&
            entry.mediaUrls &&
            entry.mediaUrls.length > 0,
    );

    // Create media entries from completed requests
    completedMediaRequests.forEach((entry) => {
        if (entry.mediaUrls && entry.mediaTypes) {
            mediaEntries.push({
                id: entry.id,
                timestamp: entry.timestamp,
                petName: entry.petName || "",
                ownerName: entry.ownerName || "",
                requestId: entry.requestId || "",
                requestType: entry.requestType as "PHOTO_REQUEST" | "VIDEO_REQUEST",
                description: entry.description,
                mediaUrls: entry.mediaUrls,
                mediaTypes: entry.mediaTypes,
                completedBy: entry.performedBy,
                completedAt: entry.timestamp,
            });
        }
    });

    return mediaEntries.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
};

export const sampleHistoryData = generateSampleHistoryData();
export const sampleMediaData = generateSampleMediaData(sampleHistoryData);
