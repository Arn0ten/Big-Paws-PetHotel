// Define types for the Pet Owner Management module

export interface Pet {
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

export interface PetOwner {
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
  pets?: Pet[];
}

export interface FormErrors {
  [key: string]: boolean;
}

export interface PetFormState extends Partial<Pet> {
  errors?: FormErrors;
}

export interface BoardingDetails {
  petIds: string[];
  type: "Daycare" | "LongStay";
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  notes?: string;
}
