import {PetOwnerRegister, PetOwnerRegisterResponse} from "@/types/petOwner";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "http://localhost:8080";


export class PetRegistrationError extends Error {
    constructor(message: string, public response?: any) {
        super(message);
        this.name = 'PetOwnerRegistrationError';
    }
}

export const petService = {
    async registerPetOwner(data: PetOwnerRegister): Promise<PetOwnerRegisterResponse> {
        const response = await fetch(`${apiDomain}/api/v1/admin/register/pet-owner`, {
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
