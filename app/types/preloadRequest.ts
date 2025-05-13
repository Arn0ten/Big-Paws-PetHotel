export interface MediaIdUrlExpire {
    id: string;
    mediaUrl: string;
    expireAt: string; // ISO string for frontend handling
}

export interface PetRequestDTO {
    // Identifiers
    id: string;                 // Could be request ID or media ID
    requestId?: string;         // For media/video
    ownerId: string;
    petId?: string;
    boardingId?: string;

    // Basic Info
    ownerName: string;
    petName: string;
    petSize?: string;
    requestType: string;        // "BOARDING" | "GROOMING" | "PHOTO" | "VIDEO" | etc.

    // Duration (for boarding)
    duration?: number;
    unit?: string;

    // Grooming
    price?: number;
    groomingType?: string;

    // Media
    photo?: MediaIdUrlExpire[];
    mediaId?: string;
    url?: string;
    expiredAt?: string;

    // Request Details
    requestStatus: string;
    description: string;
    adminResponse?: string;

    // Timestamps
    requestAt: string;         // format: "M, dd, yy at HH:mm:ss"
    completedAt?: string;      // same format or undefined
}


export interface PetRequestResponse extends BaseApiResponse {
    data: PetRequestDTO[];
}

