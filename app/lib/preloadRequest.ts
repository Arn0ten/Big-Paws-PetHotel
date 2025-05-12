import {PetRequestResponse, PetRequestDTO} from "@/types/preloadRequest";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "https://api.bigpawspethotel.me";


export async function preloadRequestPending(): Promise<PetRequestDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/request/search/all-pending`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PetRequestResponse = await response.json();
            console.log("Activity History:", data);
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



export async function preloadRequestCompleted(): Promise<PetRequestDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/request/search/all-completed`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PetRequestResponse = await response.json();
            console.log("Completed Requests:", data);
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