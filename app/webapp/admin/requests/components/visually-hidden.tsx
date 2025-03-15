import type React from "react"
import { cn } from "@/lib/utils"

interface VisuallyHiddenProps {
  children: React.ReactNode
  className?: string
}

/**
 * VisuallyHidden component
 *
 * Hides content visually while keeping it accessible to screen readers.
 * This is useful for providing additional context to screen reader users
 * without affecting the visual layout.
 */
export function VisuallyHidden({ children, className }: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        "clip-[rect(0,0,0,0)] clip-path-[inset(100%)]",
        className,
      )}
    >
      {children}
    </span>
  )
}

