import {PetBoardingRequestDTO, PetBoardingResponseDTO, BoardingHistoryResponseDTO, BoardingDTO} from "@/types/boarding";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "https://api.bigpawspethotel.me";

export class BoardPetError extends Error {
    constructor(message: string, public response?: any) {
        super(message);
        this.name = 'BoardPetError';
    }
}

export const boardingService = {
    async boardPet(data: PetBoardingRequestDTO): Promise<PetBoardingResponseDTO> {
        const response = await fetch(`${apiDomain}/api/v1/admin/manage/boarding/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                petId: data.petId,
                ownerId: data.ownerId,
                boardingType: data.boardingType,
                boardingStart: data.boardingStart,
                boardingEnd: data.boardingEnd,
                paymentStatus: data.paymentStatus,
                notes: data.notes
            }),
        });

        const responseData = await response.json();

        if (!response.ok || responseData.status !== 200) {
            throw new BoardPetError(responseData.message || 'Failed to board pet', responseData);
        }

        return responseData;
    },
}


// Preload the pet owner data from the API
export async function preloadActiveBoarding(): Promise<BoardingDTO[]> {
    const apiUrl = `${apiDomain}/api/v1/admin/search/boarding/all`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const responseData: BoardingHistoryResponseDTO = await response.json();
            return Array.isArray(responseData.data) ? responseData.data : [];
        } else {
            console.error("Error fetching active boarding", response.status);
            return [];  // Return an empty array if there's an error
        }
    } catch (error) {
        console.error("Network error:", error);
        return [];  // Return an empty array if there's a network error
    }
}
