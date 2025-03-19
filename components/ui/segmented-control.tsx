"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: {
    value: string
    label: string
    icon?: React.ReactNode
  }[]
  value: string
  onValueChange: (value: string) => void
  size?: "sm" | "md" | "lg"
}

export function SegmentedControl({
  segments,
  value,
  onValueChange,
  size = "md",
  className,
  ...props
}: SegmentedControlProps) {
  const sizeClasses = {
    sm: "p-0.5 text-xs",
    md: "p-1 text-sm",
    lg: "p-1.5 text-base",
  }

  const buttonSizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-1.5",
    lg: "px-4 py-2",
  }

  return (
    <div className={cn("inline-flex rounded-md border bg-background", sizeClasses[size], className)} {...props}>
      {segments.map((segment) => (
        <button
          key={segment.value}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-sm font-medium transition-all",
            buttonSizeClasses[size],
            value === segment.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
          onClick={() => onValueChange(segment.value)}
          type="button"
        >
          {segment.icon}
          {segment.label}
        </button>
      ))}
    </div>
  )
}

