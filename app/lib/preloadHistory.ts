import {PreloadHistory, ActivityLog} from "@/types/preloadHistory";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "https://api.bigpawspethotel.me";

export async function preloadActivityHistory(): Promise<ActivityLog[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/history/search/all`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data: PreloadHistory = await response.json();
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