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