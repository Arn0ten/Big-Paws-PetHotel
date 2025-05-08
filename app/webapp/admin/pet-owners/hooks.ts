"use client";

import { useState, useEffect, useCallback } from "react";
import { preloadActivePetOwnerData } from "@/lib/preload";
import type { PetOwner, Pet, FormErrors, PetFormState } from "./utils/types";

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
  }, []);

  useEffect(() => {
    console.log("Calling fetchPetOwners...");
    fetchPetOwners(); // Fetch owners when the component is mounted
  }, [fetchPetOwners]);

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
export function usePetForm(initialState: PetFormState = { animal: "Dog", size: "Medium" }) {
  const [formState, setFormState] = useState<PetFormState>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    (field: keyof Pet, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "animal" && { breed: undefined }), // Reset breed if animal is changed
      }));

      if (formErrors[field]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
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
    setFormState({ animal: "Dog", size: "Medium" });
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
export function usePagination({ totalItems, itemsPerPage = 5 }: { totalItems: number; itemsPerPage?: number }) {
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

const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN_HOST;

// Manual call registration of a pet
export function useRegisterPet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [photoFile, setPhotoFile] = useState(null);

  const registerPet = async (petData: Pet) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("${DOMAIN_HOST}/api/v1/admin/pets/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(petData)
      });

      const registerJson = await res.json();
      if (!registerJson.ok)  throw new Error(registerJson.message || "Failed to register pet.");
      

      if (photoFile && registerJson.data?.apiUrl) {
        const tokenRes  = await fetch(registerJson.data.apiUrl, {
          method: "POST",
        });

        const tokenJson = await tokenRes.json();
        if (!tokenRes.ok) throw new Error(tokenJson.message || "Failed to get upload URL.");

        const uploadUrl = tokenJson.data?.uploadUrl;
        if (!uploadUrl) throw new Error("Upload URL not received.");

        // Step 3: Upload to presigned URL
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": photoFile.type
          },
          body: photoFile
        });

        if (!uploadRes.ok) throw new Error("Photo upload failed.");
        registerJson.photoUpload = { success: true };
      }

      setResponse(registerJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    registerPet,
    loading,
    error,
    response,
  };
}
