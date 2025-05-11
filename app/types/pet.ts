export interface PetRegister {
    ownerId: string;
    petName: string;
    animalType: string;
    breed: string;
    size: string;
    age: number;
    specialDescription: string;
}

export interface PetRegisterResponse extends BaseApiResponse {
    data: {
        petId: string;
        apiUrl: string;
    };

}

export interface PetRegisterPresignUrlResponse extends BaseApiResponse {
    data: {
        id: string;
        url: string;
        expiredAt: Date;
    };
}



