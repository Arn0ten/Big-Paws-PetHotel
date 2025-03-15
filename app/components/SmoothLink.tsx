"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface SmoothLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function SmoothLink({ href, children, className }: SmoothLinkProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await router.push(href)
    setIsLoading(false)
  }

  return (
    <Link href={href} onClick={handleClick} className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <Loader2 className="h-5 w-5 animate-spin text-[#2e3357]" />
        </div>
      )}
    </Link>
  )
}

