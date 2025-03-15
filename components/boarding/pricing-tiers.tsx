import { Card } from "@/components/ui/card"
import { Clock, Home, Cat } from "lucide-react"

interface PricingTier {
  size: string
  daycare: number
  accommodation: number
}

const pricingTiers: PricingTier[] = [
  { size: "Small", daycare: 25, accommodation: 320 },
  { size: "Medium", daycare: 30, accommodation: 400 },
  { size: "Large", daycare: 40, accommodation: 480 },
  { size: "XLarge", daycare: 50, accommodation: 550 },
]

const catPricing = {
  kitten: 300,
  adult: 400,
  extraSmallMedium: 200,
  extraLarge: 300,
}

export function PricingTiers() {
  return (
    <div className="w-full space-y-6 py-8">
      {/* Day Care Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Clock className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Day Care</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">8:00 AM to 7:00 PM</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div key={tier.size} className="rounded-lg border p-4 shadow-sm">
              <p className="font-medium">{tier.size}</p>
              <p className="mt-2 text-2xl font-bold">
                ${tier.daycare}
                <span className="text-sm font-normal text-muted-foreground">/hr</span>
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Accommodation Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <Home className="h-5 w-5" />
          <h3 className="text-xl font-semibold">24Hrs Accommodation</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Flexible Booking</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div key={tier.size} className="rounded-lg border p-4 shadow-sm">
              <p className="font-medium">{tier.size}</p>
              <p className="mt-2 text-2xl font-bold">${tier.accommodation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Cat Hotel Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
          <Cat className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Cat Hotel</h3>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border p-4 shadow-sm">
              <p className="font-medium">Standard Room</p>
              <div className="mt-2 space-y-2">
                <p className="text-lg">
                  Kitten: <span className="font-bold">₱{catPricing.kitten}</span>
                </p>
                <p className="text-lg">
                  Adult: <span className="font-bold">₱{catPricing.adult}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 shadow-sm">
              <p className="font-medium">Extra Guest</p>
              <div className="mt-2 space-y-2">
                <p className="text-lg">
                  Small to Medium: <span className="font-bold">₱{catPricing.extraSmallMedium}</span>
                </p>
                <p className="text-lg">
                  Large Breed: <span className="font-bold">₱{catPricing.extraLarge}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Note! Pets must have complete vaccination and anti-rabies shots
        </p>
      </div>
    </div>
  )
}

