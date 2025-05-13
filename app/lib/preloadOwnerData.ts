import {PreloadHistory, ActivityLog} from "@/types/preloadHistory";
import {PetBoardingRequestDTO, PetBoardingResponseDTO, BoardingHistoryResponseDTO, BoardingDTO} from "@/types/boarding";
import type {PetDetailsApiResponse, PetDetailsDTO} from "@/types/preloadPet";
import {PetRequestResponse, PetRequestDTO} from "@/types/preloadRequest";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "https://api.bigpawspethotel.me";

export async function preloadRequestAllOwner(ownerId: string): Promise<PetRequestDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/request/search/all/` + ownerId;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PetRequestResponse = await response.json();
            console.log("Activity History for Owner:", data);
            return data.data;
        } else {
            console.error("Error fetching activity history", response.status);
            return [];
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];
    }
}


export async function preloadPetAllByOwner(ownerId: string): Promise<PetDetailsDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/pet/all/` + ownerId;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PetRequestResponse = await response.json();
            console.log("Activity History for Owner:", data);
            return data.data;
        } else {
            console.error("Error fetching activity history", response.status);
            return [];
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];
    }
}


export async function preloadNotificationAllByOwner(ownerId: string): Promise<PetDetailsDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/pet-owner/notifications/` + ownerId + '/all';

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PetRequestResponse = await response.json();
            console.log("Activity History for Owner:", data);
            return data.data;
        } else {
            console.error("Error fetching activity history", response.status);
            return [];
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];
    }
}







