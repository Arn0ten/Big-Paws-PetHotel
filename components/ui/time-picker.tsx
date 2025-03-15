"use client"

import type * as React from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function TimePicker({ value, onChange, disabled = false }: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative">
      <Input type="time" value={value} onChange={handleChange} disabled={disabled} className="pl-10" />
      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  )
}

