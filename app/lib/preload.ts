import { useState, useEffect } from "react";
import type { PetOwnerApiResponse, PetOwnerActive } from "../types/petOwner"; 

// Assuming DOMAIN_HOST is defined correctly
const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN_HOST;

// Preload the pet owner data from the API
export async function preloadActivePetOwnerData(): Promise<PetOwnerActive[]> {
    const apiUrl = `${DOMAIN_HOST}/api/v1/admin/search/pet-owner/all`;

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

// Custom hook to manage the pet owners data and loading state
export function usePetOwners() {
    const [petOwners, setPetOwners] = useState<PetOwnerActive[]>([]);  // Explicitly typed
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);  // To manage any errors

    useEffect(() => {
        const fetchPetOwners = async () => {
            try {
                setIsLoading(true);  // Start loading
                const response = await preloadActivePetOwnerData();
                if (response.length > 0) {
                    setPetOwners(response);  // Set data if it exists
                } else {
                    setError("No pet owners found.");
                }
            } catch (error) {
                setError("Failed to fetch pet owners.");
            } finally {
                setIsLoading(false);  // End loading
            }
        };

        fetchPetOwners();
    }, []); // Run only once after initial render

    return { petOwners, isLoading, error };
}
