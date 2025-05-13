import {PetRequestDTO, PetRequestResponse} from "@/types/preloadRequest";
import {PetOwnerPendingDTO, PetOwnerPendingResponse} from "@/types/petOwner";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "https://api.bigpawspethotel.me";

export async function approveOwner(ownerId: string): Promise<String> {
    const apiUrl = `${apiDomain}/register/pet-owner/` + ownerId + '/approve';

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: string = await response.json();
            console.log("Approving Owner:", data);
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


export async function preloadPendingAll(): Promise<PetOwnerPendingDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/pet-owner/all-pending`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PetOwnerPendingResponse = await response.json();
            console.log("Pending Owner:", data);
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
