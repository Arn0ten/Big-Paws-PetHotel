export interface PetRegister {
ownerId: string;
petName: string;
animalType: string;
breed: string;
size: string;
age: number;
specialDescription: string;

}

export interface PetOwnerApiResponse {
  status: number;
  requestAt: Date;
  data: PetRegisterResponse;
  message: string | null;
}

export interface PetRegisterResponse {
id: string;
apiUrl: string;
}

