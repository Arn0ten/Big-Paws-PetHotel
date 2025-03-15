"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, AlertCircle } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/time-picker"
import { formatDate, calculateNewEndDate } from "@/app/webapp/admin/boarding/utils/helpers"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ExtensionDatePickerProps {
  currentEndDate: string
  extensionDuration: string
  extensionUnit: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  onPriceChange?: (price: number) => void
  petSize: string
}

export function ExtensionDatePicker({
  currentEndDate,
  extensionDuration,
  extensionUnit,
  selectedDate,
  onDateChange,
  onPriceChange,
  petSize,
}: ExtensionDatePickerProps) {
  const [calculatedDate, setCalculatedDate] = useState<Date | null>(null)
  const [timeValue, setTimeValue] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [minDate, setMinDate] = useState<Date>(new Date())

  // Rates based on pet size (moved from the parent component)
  const HOURLY_RATES = {
    Small: 25,
    Medium: 30,
    Large: 40,
    XLarge: 50,
  }

  const DAILY_RATES = {
    Small: 320,
    Medium: 400,
    Large: 480,
    XLarge: 550,
  }

  useEffect(() => {
    // Calculate the new end date based on the extension duration
    const currentEndDateObj = new Date(currentEndDate)
    const now = new Date()

    // Set minimum date to be the greater of current end date or now
    setMinDate(currentEndDateObj > now ? currentEndDateObj : now)

    const newEndDate = calculateNewEndDate(currentEndDate, extensionDuration, extensionUnit)
    setCalculatedDate(newEndDate)

    // Set the initial time value from the calculated date
    setTimeValue(
      `${newEndDate.getHours().toString().padStart(2, "0")}:${newEndDate.getMinutes().toString().padStart(2, "0")}`,
    )

    // Set the selected date to the calculated date
    onDateChange(newEndDate)

    // Calculate and update price
    updatePrice(newEndDate)
  }, [currentEndDate, extensionDuration, extensionUnit, onDateChange])

  // Calculate price based on extension
  const updatePrice = (date: Date | null) => {
    if (!date || !onPriceChange) return

    const currentEndDateObj = new Date(currentEndDate)
    const diffMs = date.getTime() - currentEndDateObj.getTime()

    if (diffMs <= 0) {
      setError("New end date must be after current end date")
      return
    } else {
      setError(null)
    }

    if (extensionUnit === "hours") {
      const diffHours = Math.ceil(diffMs / (1000 * 60 * 60))
      const hourlyRate = HOURLY_RATES[petSize as keyof typeof HOURLY_RATES] || HOURLY_RATES.Medium
      onPriceChange(diffHours * hourlyRate)
    } else {
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
      const dailyRate = DAILY_RATES[petSize as keyof typeof DAILY_RATES] || DAILY_RATES.Medium
      onPriceChange(diffDays * dailyRate)
    }
  }

  // This function is only used for hourly extensions
  const handleTimeChange = (time: string) => {
    setTimeValue(time)

    if (calculatedDate && time) {
      const [hours, minutes] = time.split(":").map(Number)
      const newDate = new Date(calculatedDate)
      newDate.setHours(hours, minutes)

      // Ensure the new time is not in the past
      const now = new Date()
      if (newDate < now) {
        setError("Selected time cannot be in the past")
        return
      } else {
        setError(null)
      }

      onDateChange(newDate)
      updatePrice(newDate)
    }
  }

  // For date selection
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return

    // Keep the same time when changing date
    if (timeValue) {
      const [hours, minutes] = timeValue.split(":").map(Number)
      date.setHours(hours, minutes)
    }

    onDateChange(date)
    updatePrice(date)
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-muted/50 border rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Current End Date:</span>
          <span>{formatDate(currentEndDate)}</span>
        </div>
      </div>

      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
        <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
          <Clock className="h-4 w-4" />
          <span className="font-medium">Extension Requested:</span>
          <span>
            {extensionDuration} {extensionUnit}
          </span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="extension-date">New End Date</Label>
          <DatePicker
            date={selectedDate}
            setDate={handleDateChange}
            disabled={false}
            fromDate={minDate}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="extension-time">New End Time</Label>
          <TimePicker value={timeValue} onChange={handleTimeChange} disabled={false} className="w-full" />
        </div>
      </div>

      <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
        <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
          <Calendar className="h-4 w-4" />
          <span className="font-medium">New End Date:</span>
          <span>{selectedDate ? formatDate(selectedDate.toISOString()) : "Not set"}</span>
        </div>
      </div>
    </div>
  )
}

