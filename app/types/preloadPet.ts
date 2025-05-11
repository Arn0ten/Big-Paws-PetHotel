import {PetOwnerApiResponse} from "@/types/petOwner";

export interface PetDetailsDTO {
    id: string;
    ownerId: string;
    name: string;
    ownerName: string;
    animal: string;
    breed: string;
    size: string;
    description: string;
    age: number;
    boarding: boolean;

    photoId: string;
    photoUrl: string;
    expireAt: Date;

    boardingHistory: PetBoardingHistoryDTO[];
    requestHistory: PetRequestHistoryDTO[];
}

export interface PetBoardingHistoryDTO {
    id: string;
    boardingType: string;
    duration: string;
    notes: string;
    price: number;
    paymentStatus: string;
    checkIn: string;
    checkOut: string;
}

export interface PetRequestHistoryDTO {
    id: string;
    requestType: string;
    dateRequest: string;
    description: string;
    price: number;
    paymentStatus: string;
    status: string;
}


export interface PetDetailsApiResponse extends BaseApiResponse {
    data: PetDetailsDTO;
}