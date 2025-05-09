// Define the structure of our form data
import {PetOwnerRegister} from "@/types/petOwner";

export interface PetOwnerFormData {
  // Basic Information
  fullName: string;
  email: string;
  contactNumber: string;

  // Address Information
  streetAddress: string;
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
}

// Response types
export interface RegistrationResponse {
  success: boolean;
  petOwnerId: string;
  message?: string;
  error?: string;
}

export interface CredentialResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Activity log interface
export interface ActivityLogParams {
  module: string;
  action: string;
  description: string;
  status: string;
  entityId: string;
  relatedEntityId?: string;
  metadata?: Record<string, any>;
}

/**
 * Register a new pet owner in the system
 *
 * @param data The pet owner data collected from the registration form
 * @returns A promise that resolves to the registration response
 */
export async function registerPetOwner(
  data: PetOwnerFormData,
): Promise<RegistrationResponse> {
  try {
    // Make the API call to register the pet owner
    const response = await fetch("/api/admin/pet-owners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register pet owner");
    }

    const result = await response.json();

    // Log the successful registration
    await logAdminActivity({
      module: "pet-owner",
      action: "register",
      description: `Registered new pet owner: ${data.fullName}`,
      status: "completed",
      entityId: result.petOwnerId,
      metadata: {
        email: data.email,
        contactNumber: data.contactNumber,
        province: data.province,
        city: data.city,
      },
    });

    return {
      success: true,
      petOwnerId: result.petOwnerId,
      message: "Pet owner registered successfully",
    };
  } catch (error) {
    console.error("Error registering pet owner:", error);

    // Log the failed registration attempt
    await logAdminActivity({
      module: "pet-owner",
      action: "register",
      description: `Failed to register pet owner: ${data.fullName}`,
      status: "failed",
      entityId: "N/A",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });

    return {
      success: false,
      petOwnerId: "",
      error:
        error instanceof Error ? error.message : "Failed to register pet owner",
    };
  }
}

/**
 * Send temporary login credentials to the pet owner
 *
 * @param method The method to send credentials (email or phone)
 * @param contactValue The email address or phone number to send credentials to
 * @param petOwnerId The ID of the pet owner
 * @returns A promise that resolves to the credential response
 */
export async function sendCredentials(
  method: "email" | "phone",
  contactValue: string,
  petOwnerId: string,
): Promise<CredentialResponse> {
  try {
    // Make the API call to send credentials
    const response = await fetch("/api/admin/send-credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method,
        contactValue,
        petOwnerId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to send credentials via ${method}`,
      );
    }

    const result = await response.json();

    // Log the successful credential sending
    await logAdminActivity({
      module: "pet-owner",
      action: "send-credentials",
      description: `Sent login credentials to pet owner via ${method}`,
      status: "completed",
      entityId: petOwnerId,
      metadata: {
        method,
        contactValue,
      },
    });

    return {
      success: true,
      message: `Credentials sent successfully via ${method}`,
    };
  } catch (error) {
    console.error(`Error sending credentials via ${method}:`, error);

    // Log the failed credential sending attempt
    await logAdminActivity({
      module: "pet-owner",
      action: "send-credentials",
      description: `Failed to send login credentials via ${method}`,
      status: "failed",
      entityId: petOwnerId,
      metadata: {
        method,
        contactValue,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : `Failed to send credentials via ${method}`,
    };
  }
}




/**
 * Log admin activity
 *
 * @param params The activity log parameters
 * @returns A promise that resolves when the activity is logged
 */
export async function logAdminActivity(
  params: ActivityLogParams,
): Promise<void> {
  try {
    const response = await fetch("/api/admin/activity-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
        timestamp: new Date().toISOString(),
        // In a real implementation, this would come from the auth context
        performedBy: "Current Admin User",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to log admin activity");
    }
  } catch (error) {
    console.error("Error logging admin activity:", error);
    // We don't want to throw here as this is a non-critical operation
  }
}

/**
 * Mock implementation for development and testing
 * This simulates the API calls and returns mock responses
 */
export const mockRegistrationApi = {
  registerPetOwner: async (
    data: PetOwnerRegister,
  ): Promise<RegistrationResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a mock pet owner ID
    const mockPetOwnerId = `PO-${Math.floor(Math.random() * 10000)}`;

    // Log to console for development
    console.log("Mock API - Register Pet Owner:", data);
    console.log("Generated Pet Owner ID:", mockPetOwnerId);

    return {
      success: true,
      petOwnerId: mockPetOwnerId,
      message: "Pet owner registered successfully (MOCK)",
    };
  },

  sendCredentials: async (
    method: "email" | "phone",
    contactValue: string,
    petOwnerId: string,
  ): Promise<CredentialResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log to console for development
    console.log(`Mock API - Send Credentials via ${method}:`, {
      contactValue,
      petOwnerId,
    });

    return {
      success: true,
      message: `Credentials sent successfully via ${method} (MOCK)`,
    };
  },

  

  logAdminActivity: async (params: ActivityLogParams): Promise<void> => {
    // Log to console for development
    console.log("Mock API - Log Admin Activity:", {
      ...params,
      timestamp: new Date().toISOString(),
      performedBy: "Current Admin User",
    });
  },
};
