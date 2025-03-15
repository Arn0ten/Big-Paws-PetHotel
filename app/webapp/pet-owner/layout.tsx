"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Topbar } from "./components/topbar"
import { BottomNavbar } from "./components/bottom-navbar"
import { cn } from "@/lib/utils"

export default function PetOwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Don't hide navbar on mobile - we'll make it fixed instead
      if (window.innerWidth <= 768) {
        setShowNavbar(true)
        return
      }

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Check if we're on the login page
  const isLoginPage = pathname === "/webapp/pet-owner/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <div
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border transition-transform duration-300",
          !showNavbar && "translate-y-full",
        )}
      >
        <BottomNavbar />
      </div>
    </div>
  )
}

