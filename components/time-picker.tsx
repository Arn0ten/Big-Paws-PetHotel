"use client"

import type React from "react"

import { useState } from "react"
import { PopoverContent } from "@/components/ui/popover"

interface TimePickerProps {
  value: string
  onChange: (time: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState(value)

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value)
    onChange(event.target.value)
  }

  return (
    <PopoverContent className="w-auto p-4">
      <div className="grid gap-2">
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-full rounded-md border shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </PopoverContent>
  )
}

