import {useState} from "react";
import {
    PetBoardingRequestDTO,
    BoardingDTO,
    PetBoardingResponse
} from "@/types/boarding";
import {boardingService, preloadActiveBoarding} from "@/lib/boardingManagement";


export function useCreateBoarding() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentBoarding, setCurrentBoarding] = useState<PetBoardingResponse | null>(null);

    const createBoarding = async (boardingData: PetBoardingRequestDTO): Promise<PetBoardingResponse> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await boardingService.boardPet(boardingData);
            setCurrentBoarding(response.data);
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to create boarding";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetError = () => setError(null);

    return {
        isLoading,
        error,
        currentBoarding,
        createBoarding,
        resetError
    };
}

export function useFetchActiveBoarding() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeBoarding, setActiveBoarding] = useState<BoardingDTO[]>([]);

    const fetchActiveBoarding = async (): Promise<BoardingDTO[]> => {
        setIsLoading(true);
        setError(null);
        try {
            const boardingList = await preloadActiveBoarding();
            setActiveBoarding(boardingList);
            return boardingList;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch active boarding";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetError = () => setError(null);

    return {
        isLoading,
        error,
        activeBoarding,
        fetchActiveBoarding,
        resetError
    };
}
