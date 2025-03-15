// Utility functions for calculating boarding prices

export interface PricingTier {
  size: string
  daycare: number
  accommodation: number
}

export const pricingTiers: PricingTier[] = [
  { size: "Small", daycare: 25, accommodation: 320 },
  { size: "Medium", daycare: 30, accommodation: 400 },
  { size: "Large", daycare: 40, accommodation: 480 },
  { size: "XL", daycare: 50, accommodation: 550 },
]

export const catPricing = {
  standard: {
    kitten: 300,
    adult: 400,
  },
  extraGuest: {
    smallToMedium: 200,
    large: 300,
  },
}

/**
 * Calculate the price for dog daycare
 * @param size Pet size
 * @param hours Number of hours
 * @returns Price in dollars
 */
export function calculateDogDaycarePrice(size: string, hours: number): number {
  const tier = pricingTiers.find((t) => t.size === size) || pricingTiers[1] // Default to Medium if size not found
  return tier.daycare * Math.max(1, hours)
}

/**
 * Calculate the price for dog accommodation (long stay)
 * @param size Pet size
 * @param days Number of days
 * @returns Price in dollars
 */
export function calculateDogAccommodationPrice(size: string, days: number): number {
  const tier = pricingTiers.find((t) => t.size === size) || pricingTiers[1] // Default to Medium if size not found
  return tier.accommodation * Math.max(1, days)
}

/**
 * Calculate the price for cat boarding
 * @param isKitten Whether the cat is a kitten
 * @param isLarge Whether the cat is a large breed
 * @param isExtraGuest Whether the cat is an extra guest
 * @param days Number of days (for long stay)
 * @returns Price in pesos
 */
export function calculateCatBoardingPrice(
  isKitten: boolean,
  isLarge: boolean,
  isExtraGuest: boolean,
  days = 1,
): number {
  let basePrice = 0

  if (isExtraGuest) {
    basePrice = isLarge ? catPricing.extraGuest.large : catPricing.extraGuest.smallToMedium
  } else {
    basePrice = isKitten ? catPricing.standard.kitten : catPricing.standard.adult
  }

  return basePrice * days
}

/**
 * Calculate hours between two time strings
 * @param startTime Start time in format "HH:MM"
 * @param endTime End time in format "HH:MM"
 * @returns Number of hours (including partial hours)
 */
export function calculateHoursBetween(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(":").map(Number)
  const [endHour, endMinute] = endTime.split(":").map(Number)

  let hours = endHour - startHour

  // Adjust for minutes
  if (endMinute > startMinute) hours += 0.5
  else if (endMinute < startMinute) hours -= 0.5

  return Math.max(1, hours) // Minimum 1 hour
}

/**
 * Calculate days between two dates
 * @param startDate Start date
 * @param endDate End date
 * @returns Number of days
 */
export function calculateDaysBetween(startDate: Date, endDate: Date): number {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / millisecondsPerDay)
  return Math.max(1, days) // Minimum 1 day
}

