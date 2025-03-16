/**
 * Pricing data for services
 *
 * BACKEND INTEGRATION NOTES:
 * - Replace with actual pricing data from your database
 * - API Endpoint: GET /api/pricing
 * - Response format: Object with pricing categories and rates
 */

// Pricing data for services
export const PRICING = {
  grooming: {
    // For dogs
    "basic-wash": {
      Small: 180,
      Medium: 220,
      Large: 280,
      XLarge: 320,
    },
    "premium-wash": {
      Small: 300,
      Medium: 450,
      Large: 550,
      XLarge: 850,
    },
    "premium-wash-and-cut": {
      Small: 450,
      Medium: 600,
      Large: 650,
      XLarge: 850,
    },
    "full-grooming": {
      Small: 500,
      Medium: 650,
      Large: 700,
      XLarge: 800,
    },
    // For cats
    "cat-basic-wash": {
      Small: 150,
      Medium: 200,
      Large: 250,
      XLarge: 280,
    },
    "cat-premium-wash": {
      Small: 200,
      Medium: 250,
      Large: 300,
      XLarge: 350,
    },
  },
  boarding: {
    hourly: {
      Small: 25,
      Medium: 30,
      Large: 40,
      XLarge: 50,
    },
    daily: {
      Small: 320,
      Medium: 400,
      Large: 480,
      XLarge: 550,
    },
  },
  catHotel: {
    standard: {
      Kitten: 300,
      Adult: 400,
    },
    extraGuest: {
      SmallToMedium: 200,
      Large: 300,
    },
  },
}

// Calculate boarding extension cost
export const calculateExtensionCost = (duration: string, unit: string, petSize: string): number => {
  const durationNum = Number.parseInt(duration)

  if (!petSize || !PRICING.boarding) return 0

  switch (unit) {
    case "hours":
      return durationNum * PRICING.boarding.hourly[petSize as keyof typeof PRICING.boarding.hourly]
    case "days":
      return durationNum * PRICING.boarding.daily[petSize as keyof typeof PRICING.boarding.daily]
    case "weeks":
      return durationNum * 7 * PRICING.boarding.daily[petSize as keyof typeof PRICING.boarding.daily]
    default:
      return 0
  }
}

