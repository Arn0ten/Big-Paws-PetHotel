// services/petService.ts
import { PetRegister } from "@/types/pet";
import { PetRegisterResponse, PetRegisterPresignUrlResponse } from "@/types/pet";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "http://localhost:8080";

export class PetRegistrationError extends Error {
  constructor(message: string, public response?: any) {
    super(message);
    this.name = 'PetRegistrationError';
  }
}

export const petService = {
  async registerPet(data: PetRegister): Promise<PetRegisterResponse> {
    const response = await fetch(`${apiDomain}/api/v1/admin/pets/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ownerId: data.ownerId,
        petName: data.petName,
        animalType: data.animalType,
        breed: data.breed,
        size: data.size,
        age: data.age,
        specialDescription: data.specialDescription
      }),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.status !== 200) {
      throw new PetRegistrationError(responseData.message || 'Failed to register pet', responseData);
    }

    return responseData;
  },

  async getPresignedUrl(validationUrl: string): Promise<PetRegisterPresignUrlResponse> {
    const response = await fetch(validationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    if (!response.ok || responseData.status !== 200) {
      throw new PetRegistrationError(responseData.message || 'Failed to get presigned URL', responseData);
    }
    console.log('[Server]\n presign url: ', responseData.data.url);
    return responseData;
  },

  async uploadPetPhoto(validationUrl: string, photoFile: File): Promise<void> {
    // Get presigned URL
    const presignedUrlResponse = await this.getPresignedUrl(validationUrl);
    console.log('[Server]\n presign url: ', presignedUrlResponse.data.url);

    // Upload using the presigned URL
    const uploadResponse = await fetch(presignedUrlResponse.data.url, {
      method: 'PUT',
      body: photoFile,
      headers: {
        'Content-Type': photoFile.type,
      },
    });

    if (!uploadResponse.ok) {
      console.error('Failed to upload pet photo', uploadResponse);
      throw new PetRegistrationError('Failed to upload pet photo');
    }
  },
};