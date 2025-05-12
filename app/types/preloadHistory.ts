

// Union type for all activity logs
export interface ActivityLog {
    // Base fields
    id: string;
    activityType: string;
    description: string;
    performedBy: string;
    timestamp: string; // Instant in Java

    // Pet information
    petName: string;
    animalType?: string;  // Optional since some DTOs use 'type' instead
    type?: string;        // Optional alternative to animalType
    breed?: string;
    size?: string;

    // Owner information
    ownerName: string;
    email?: string;
    phoneNumber?: string;
    address?: string;

    // Boarding and Extension fields
    boardingType?: string;
    duration?: number;
    price?: number;
    startDate?: string;
    endDate?: string;

    // Extension specific fields
    requestType?: string;
    durationType?: string;
    currentEnd?: string;  // Instant in Java
    newEnd?: string;      // Instant in Java

    // Grooming specific field
    groomingType?: string;

}

// Update the PreloadHistory interface
export interface PreloadHistory extends BaseApiResponse {
    data: ActivityLog[];
}