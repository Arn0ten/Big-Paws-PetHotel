import type {PetDetailsApiResponse, PetDetailsDTO} from "@/types/preloadPet";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "http://localhost:8080";

export async function recentPetDetails(): Promise<PetDetailsDTO | Error> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/pet/recent`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const responseData: PetDetailsApiResponse = await response.json();
            if (Array.isArray(responseData.data)) {
                return responseData.data;
            }
            return new Error("Invalid response data format");
        } else {
            console.error("Error fetching pet", response.status);
            return new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Network error:", error);
        return new Error("Network error occurred");
    }
}