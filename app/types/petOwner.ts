export interface PetOwnerApiResponse {
    status: number;
    requestAt: string;
    data: PetOwnerActive;
    message: string | null;
}


export interface PetOwnerActive {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    petDTOList: PetDTO[];
    customerSince: string;
    currentlyBoarding: number;
}


export interface PetDTO {
    id: string;
    name: string;
    animal: string;
    breed: string;
    size: string;
    age: number;
    boarding: boolean;
    description: string;
    photoUrl: string;
}

export interface PetOwnerRegister {
    email: string;
    phoneNumber: string;
    fullName: string;
    streetAddress: string;
    cityAddress: string;
    stateAddress: string;
    emergencyPhoneNumber: string;
}

export interface PetListDTO {
    id: string;
    petName: string;
    animal: string;
    boarding: boolean;
}


export interface PetOwnerListDTO {
    id: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    address: string;
    pets: PetListDTO[];
}

export interface PetOwnerListResponse extends BaseApiResponse {
    data: PetOwnerListDTO[];
}


export interface PetOwnerRegisterResponse extends BaseApiResponse {
    data: {
        clientId: string;
        username: string;
        email: string;
        phoneNumber: string;
        smsMessage: string;
    };
}

export interface PetOwnerPendingDTO {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    registrationDate: string;
}


export interface PetOwnerPendingResponse extends BaseApiResponse {
    data: PetOwnerPendingDTO[];
}