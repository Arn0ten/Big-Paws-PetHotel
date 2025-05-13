// Define types for the Pet Owner Management module
import { PetOwnerActive } from "@/types/petOwner"; 
import { PetDTO } from "@/types/petOwner"; 


export type PetOwner = PetOwnerActive;
export type Pet = PetDTO;


export interface LegacyPet {
  id: string;
  name: string;
  type: "Dog" | "Cat";
  breed: string;
  age?: number;
  size?: "Small" | "Medium" | "Large" | "XL";
  isBoarding?: boolean;
  image?: string;
  notes?: string;
}

export interface LegacyPetOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  notes?: string;
  avatar?: string;
  pets?: LegacyPet[];
}


export interface FormErrors {
  [key: string]: boolean;
}

export interface PetFormState extends Partial<Pet> {
  errors?: FormErrors;
}

export interface BoardingDetails {
  petIds: string[];
  ownerId: string
  type: "DAYCARE" | "LONG_STAY";
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  notes?: string;
}
export const ITEMS_PER_PAGE = 6;