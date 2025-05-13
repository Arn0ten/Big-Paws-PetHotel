export interface PetBoardingRequestDTO {

    petId: string;
    ownerId: string,
    boardingType: string, // DAYCARE LONG_STAY
    boardingStart: string,
    boardingEnd: string,
    paymentStatus: string,
    notes: string
}


export interface PetBoardingResponse {
    id: string; // BOARDING IMPORTANT
    petId: string;
    ownerId: string;
    photoId: string;
    photoUrl: string;
    expiredAt: string;
    petName: string;
    petType: string;
    petBreed: string;
    petSize: string;
    age: number;
    ownerName: string;
    ownerEmail: string;
    ownerPhoneNumber: string;
    ownerAddress: string;
    boardingType: string;
    boardingStart: string;
    boardingEnd: string;
    paymentStatus: string;
    notes: string;
    rate: number;
    boardingPrice: number;
    total: number;
    createdAt: Date;
}

export interface PetBoardingResponseDTO extends BaseApiResponse {
    data: PetBoardingResponse;
}

// HISTORICAL BOARDING REQUESTS
export interface BoardingDTO {
    id: string; // BOARDING IMPORTANT
    petId: string;
    ownerId: string;

    photoId: string;
    photoUrl: string;
    expiredAt: string;
    petName: string;
    petType: string;
    petBreed: string;
    petSize: string;
    age: number;

    ownerName: string;
    ownerEmail: string;
    ownerPhoneNumber: string;
    ownerAddress: string;

    boardingStatus: string;
    boardingType: string;
    boardingStart: string;
    boardingEnd: string;
    extensionEnd: string;
    paymentStatus: string;
    releasedAt: string;
    durationDays: number;
    durationHours: number;
    notes: string;

    boardingPrepaidStatus: string;
    rate: number;
    boardingPrice: number;
    requestBreakdown: RequestBreakdown[];
    total: number;

    overdue: boolean;
    createdAt: string;
}


export interface RequestBreakdown {
    id: string;
    requestName: string;
    total: number;
    createdAt: string;
}


export interface BoardingHistoryResponseDTO extends BaseApiResponse {
    data: BoardingDTO[];
}