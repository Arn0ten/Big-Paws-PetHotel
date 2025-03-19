// Pet owner type
export interface PetOwner {
  id: string
  name: string
  email: string
  phone: string
  address: string
  avatar: string
}

// Pet type
export interface Pet {
  id: string
  name: string
  ownerId: string
  type: "Dog" | "Cat"
  breed: string
  age: number
  size: "Small" | "Medium" | "Large" | "XL"
  isBoarding: boolean
  notes?: string
  image?: string
}

// Form errors type
export interface FormErrors {
  [key: string]: boolean
}

// Filter options type
export interface FilterOptions {
  searchQuery?: string
  type?: "Dog" | "Cat"
  status?: boolean
}

