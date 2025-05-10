import {PetOwnerRegister, PetOwnerRegisterResponse} from "@/types/petOwner";

const API_BASE_URL = process.env.API_DOMAIN_HOST;


export class PetRegistrationError extends Error {
    constructor(message: string, public response?: any) {
        super(message);
        this.name = 'PetOwnerRegistrationError';
    }
}

export const petService = {
    async registerPetOwner(data: PetOwnerRegister): Promise<PetOwnerRegisterResponse> {
        const response = await fetch(`${API_BASE_URL}/api/v1/admin/register/pet-owner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                phoneNumber: data.phoneNumber,
                fullName: data.fullName,
                streetAddress: data.streetAddress,
                cityAddress: data.cityAddress,
                stateAddress: data.stateAddress,
                emergencyPhoneNumber: data.emergencyPhoneNumber
            }),
        });

        const responseData = await response.json();

        if (!response.ok || responseData.status !== 200) {
            throw new PetRegistrationError(responseData.message || 'Failed to register pet owner', responseData);
        }

        return responseData;
    },
}
