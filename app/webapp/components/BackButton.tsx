"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  href?: string
  label?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  onClick?: () => void
}

export default function BackButton({ href, label = "Back", variant = "outline", onClick }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant={variant} onClick={handleClick} className="flex items-center gap-2">
      <ArrowLeft size={16} />
      {label}
    </Button>
  )
}

