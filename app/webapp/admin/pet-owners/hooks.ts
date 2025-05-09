"use client";

import {useState, useEffect, useCallback} from "react";
import {preloadActivePetOwnerData} from "@/lib/preload";
import type {PetOwner, Pet, FormErrors, PetFormState} from "./utils/types";
import {PetOwnerApiResponse, PetRegister, PresignedUrlResponse} from "@/types/pet";
import {petService} from "@/lib/add-pet";

/**
 * Custom hook for managing pet owners data (integrated with backend)
 */
export function usePetOwners() {
    const [petOwners, setPetOwners] = useState<PetOwner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchPetOwners = useCallback(async () => {
        setIsRefreshing(true);
        setIsError(false);
        try {
            const response = await preloadActivePetOwnerData();
            console.log("API Response:", response);

            if (response && Array.isArray(response)) {
                setPetOwners(response);
            } else {
                console.error("API response does not contain expected data format.");
                setIsError(true);
            }
        } catch (error) {
            console.error("Error fetching pet owners:", error);
            setIsError(true);
        } finally {
            setIsRefreshing(false);
            setIsLoading(false);
        }
    }, []); // Empty dependency array since it doesn't use any external values

    useEffect(() => {
        console.log("Calling fetchPetOwners...");
        fetchPetOwners();
    }, []); // Remove fetchPetOwners from dependencies since it's memoized

    // Placeholder methods for backend-managed actions
    const addPetOwner = useCallback(async () => {
        console.warn("Backend-managed: Adding pet owners not supported via UI");
    }, []);

    const updatePetOwner = useCallback(async () => {
        console.warn("Backend-managed: Updating pet owners not supported via UI");
    }, []);

    const removePetOwner = useCallback(async () => {
        console.warn("Backend-managed: Removing pet owners not supported via UI");
    }, []);

    return {
        petOwners,
        isError,
        setPetOwners,
        isLoading,
        isRefreshing,
        refreshPetOwners: fetchPetOwners,
        addPetOwner,
        updatePetOwner,
        removePetOwner,
    };
}

/**
 * Custom hook for managing pet form state and validation
 */
export function usePetForm(initialState: PetFormState = {animal: "Dog", size: "Medium"}) {
    const [formState, setFormState] = useState<PetFormState>(initialState);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = useCallback(
        (field: keyof Pet, value: any) => {
            setFormState((prev) => ({
                ...prev,
                [field]: value,
                ...(field === "animal" && {breed: undefined}), // Reset breed if animal is changed
            }));

            if (formErrors[field]) {
                setFormErrors((prev) => {
                    const newErrors = {...prev};
                    delete newErrors[field];
                    return newErrors;
                });
            }
        },
        [formErrors]
    );

    const validateForm = useCallback(() => {
        const errors: FormErrors = {};
        const requiredFields: (keyof Pet)[] = ["name", "animal", "breed", "age", "size"];

        requiredFields.forEach((field) => {
            if (!formState[field]) {
                errors[field] = true;
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formState]);

    const resetForm = useCallback(() => {
        setFormState({animal: "Dog", size: "Medium"});
        setFormErrors({});
        setIsSubmitting(false);
    }, []);

    return {
        formState,
        formErrors,
        isSubmitting,
        setIsSubmitting,
        updateField,
        validateForm,
        resetForm,
    };
}

/**
 * Custom hook for pagination
 */
export function usePagination({totalItems, itemsPerPage = 5}: { totalItems: number; itemsPerPage?: number }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    return {
        currentPage,
        totalPages,
        goToPage,
        resetPage,
    };
}


// Manual call registration of a pet
interface RegisterPetState {
    isRegistering: boolean;
    isUploadingPhoto: boolean;
    error: string | null;
    response: PetOwnerApiResponse | null;
}

export function useRegisterPet() {
    const [state, setState] = useState<RegisterPetState>({
        isRegistering: false,
        isUploadingPhoto: false,
        error: null,
        response: null,
    });
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const registerPet = useCallback(async (petData: PetRegister) => {
        setState(prev => ({
            ...prev,
            isRegistering: true,
            error: null,
            response: null,
        }));

        try {
            // Step 1: Register pet
            const registrationResponse = await petService.registerPet(petData);
            setState(prev => ({
                ...prev,
                isRegistering: false,
                response: registrationResponse,
            }));

            // Step 2 & 3: Handle photo upload if exists
            if (photoFile && registrationResponse.data.apiUrl) {
                setState(prev => ({
                    ...prev,
                    isUploadingPhoto: true,
                }));

                try {
                    await petService.uploadPetPhoto(
                        registrationResponse.data.apiUrl,
                        photoFile
                    );
                } catch (uploadError) {
                    console.error('Photo upload failed:', uploadError);
                    // Just log the error but don't affect the return value
                } finally {
                    setState(prev => ({
                        ...prev,
                        isUploadingPhoto: false,
                    }));
                }
            }

            // Return true regardless of photo upload success/failure
            return true;
            
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            setState(prev => ({
                ...prev,
                isRegistering: false,
                isUploadingPhoto: false,
                error: errorMessage,
            }));
            return false;
        }
    }, [photoFile]);

    return {
        registerPet,
        loading: state.isRegistering || state.isUploadingPhoto,
        isRegistering: state.isRegistering,
        isUploadingPhoto: state.isUploadingPhoto,
        error: state.error,
        response: state.response,
        setPhotoFile,
        photoFile
    };
}