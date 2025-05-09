import { useState } from 'react';
import { petService } from '@/lib/add-pet-owner';
import type { PetOwnerRegister } from '@/types/petOwner';

export function usePetOwnerRegistration() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerPetOwner = async (data: PetOwnerRegister) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await petService.registerPetOwner(data);
            return response;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Unknown registration error';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { registerPetOwner, isLoading, error };
}
