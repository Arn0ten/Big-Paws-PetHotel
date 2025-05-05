export type PetSize = "Small" | "Medium" | "Large" | "XLarge"
export type BoardingType = "Daycare" | "LongStay" | "CatHotel"
export type PaymentStatus = "Paid" | "Pending"
export type BoardingStatus = "Boarding" | "Done Boarding" | "Released"
export type CatRoomType = "Standard" | "ExtraGuest"
export type CatAgeCategory = "Kitten" | "Adult"

// Pricing structure based on the hotel's current rates from the uploaded images
export const DAYCARE_RATES: Record<PetSize, number> = {
  Small: 25,
  Medium: 30,
  Large: 40,
  XLarge: 50,
}

export const LONGSTAY_RATES: Record<PetSize, number> = {
  Small: 320,
  Medium: 400,
  Large: 480,
  XLarge: 550,
}

export const CAT_HOTEL_RATES = {
  Standard: {
    Kitten: 300,
    Adult: 400,
  },
  ExtraGuest: {
    SmallToMedium: 200,
    Large: 300,
  },
}

export interface Pet {
  id: string
  name: string
  type: "Dog" | "Cat"
  breed: string
  size: PetSize
  age: number
  imageUrl?: string
  ownerId: string
  notes?: string
}

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export interface BoardingOrder {
  id: string
  pet: Pet
  owner: Owner
  boardingType: BoardingType
  startDate: string
  endDate: string
  boardingStatus: BoardingStatus
  paymentStatus: PaymentStatus
  totalPrice: number
  baseAmount: number
  additionalServices?: {
    name: string
    price: number
    requestId?: string // ID of the request that triggered this service
    timestamp?: string // When the service was added
  }[]
  discounts?: {
    name: string
    amount: number
  }[]
  notes?: string
  createdAt: string
  updatedAt: string
  releaseTimestamp?: string
  paymentDate?: string
  receiptGenerated?: boolean
  notificationSent?: boolean
  isOverdue?: boolean
  // For cat hotel specific details
  catRoomType?: CatRoomType
  catAgeCategory?: CatAgeCategory
  extraGuests?: number
  // New fields for tracking changes
  lastModifiedBy?: string
  lastModificationReason?: string
  paymentHistory?: {
    status: PaymentStatus
    timestamp: string
    modifiedBy: string
    reason?: string
  }[]
}

// Constants for business hours and policies
export const BUSINESS_HOURS = {
  open: "08:00",
  close: "19:00",
}

export const VACCINATION_REQUIREMENTS = ["Complete Vaccination", "Anti-Rabies"]

// Helper function to calculate pricing
export function calculateBoardingPrice(
  boardingType: BoardingType,
  petSize: PetSize,
  duration: number, // hours for daycare, days for long-stay
  petType: "Dog" | "Cat",
  catDetails?: {
    roomType: CatRoomType
    ageCategory: CatAgeCategory
    extraGuests?: number
  },
): number {
  if (petType === "Cat" && boardingType === "CatHotel") {
    const baseRate = CAT_HOTEL_RATES.Standard[catDetails?.ageCategory || "Adult"]
    const extraGuestCost =
      (catDetails?.extraGuests || 0) *
      (catDetails?.roomType === "ExtraGuest"
        ? petSize === "Large"
          ? CAT_HOTEL_RATES.ExtraGuest.Large
          : CAT_HOTEL_RATES.ExtraGuest.SmallToMedium
        : 0)
    return (baseRate + extraGuestCost) * Math.ceil(duration)
  }

  if (boardingType === "Daycare") {
    // Ensure daycare is only charged for stays less than 24 hours
    if (duration < 24) {
      return DAYCARE_RATES[petSize] * Math.ceil(duration)
    } else {
      // If duration is 24 hours or more, treat it as long-stay
      return LONGSTAY_RATES[petSize] * Math.ceil(duration / 24)
    }
  }

  // Long-stay
  return LONGSTAY_RATES[petSize] * Math.ceil(duration)
}

// Helper function to determine if a booking should be treated as long-stay
export function isLongStay(startDate: Date, endDate: Date): boolean {
  const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
  return durationHours >= 24
}
