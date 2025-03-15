import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriceBreakdownItem {
  petName: string
  price: number
  details?: string
}

interface PriceDisplayProps {
  total: number
  breakdown?: PriceBreakdownItem[]
  currency?: string
  className?: string
  showDetails?: boolean
  boardingType: "Daycare" | "LongStay"
  duration: {
    days?: number
    hours?: number
  }
}

export function PriceDisplay({
  total,
  breakdown = [],
  currency = "$",
  className,
  showDetails = true,
  boardingType,
  duration,
}: PriceDisplayProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            <DollarSign className="h-3 w-3 mr-1" />
            Pricing
          </Badge>

          {boardingType === "Daycare" && duration.hours && (
            <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <Clock className="h-3 w-3 mr-1" />
              {duration.hours} {duration.hours === 1 ? "hour" : "hours"}
            </Badge>
          )}

          {boardingType === "LongStay" && duration.days && (
            <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <Calendar className="h-3 w-3 mr-1" />
              {duration.days} {duration.days === 1 ? "day" : "days"}
            </Badge>
          )}
        </div>
      </div>

      {showDetails && breakdown.length > 0 && (
        <div className="space-y-1.5">
          {breakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.petName}
                {item.details && <span className="text-xs ml-1 opacity-70">({item.details})</span>}
              </span>
              <span className="font-medium">
                {currency}
                {item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-2 border-t">
        <span className="font-medium">Total</span>
        <span className="text-lg font-bold text-primary">
          {currency}
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

