import {PetOwnerApiResponse, PetOwnerActive, PetOwnerListResponse, PetOwnerListDTO} from "../types/petOwner";
import type {PetDetailsApiResponse, PetDetailsDTO} from "@/types/preloadPet";

// Assuming DOMAIN_HOST is defined correctly
export const apiDomain = process.env.REACT_APP_DOMAIN ?? "http://localhost:8080";

// Preload the pet owner data from the API
export async function preloadActivePetOwnerData(): Promise<PetOwnerActive[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/pet-owner/all`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const responseData: PetOwnerApiResponse = await response.json();
            return Array.isArray(responseData.data) ? responseData.data : [];
        } else {
            console.error("Error fetching pet owners", response.status);
            return [];  // Return an empty array if there's an error
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];  // Return an empty array if there's a network error
    }
}


export async function preloadPetDetails(): Promise<PetDetailsDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/pet/all`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const responseData: PetDetailsApiResponse = await response.json();
            return Array.isArray(responseData.data) ? responseData.data : [];
        } else {
            console.error("Error fetching pet", response.status);
            return [];  // Return an empty array if there's an error
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];  // Return an empty array if there's a network error
    }
}


export async function preloadPetOwnerList(): Promise<PetOwnerListDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/pet-owner/all-list`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const responseData: PetOwnerListResponse = await response.json();
            return Array.isArray(responseData.data) ? responseData.data : [];
        } else {
            console.error("Error fetching pet", response.status);
            return [];  // Return an empty array if there's an error
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];  // Return an empty array if there's a network error
    }
}
