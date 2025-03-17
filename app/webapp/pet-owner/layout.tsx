"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, FileText, Bell, User, Menu, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import ThemeToggle from "./components/theme-toggle"
import BottomNavigation from "./components/bottom-navigation"
import { getUnreadNotificationsCount } from "../data/sample-data"

/**
 * PetOwnerLayout Component
 *
 * This component provides the layout for the pet owner interface.
 *
 * API Integration Points:
 * 1. User profile data - GET /api/users/me
 * 2. Notification count - GET /api/notifications/unread/count
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The pet owner layout component
 */
export default function PetOwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Get unread notifications count
  // In a real implementation, this would be fetched from an API
  const unreadCount = getUnreadNotificationsCount()

  const navItems = [
    {
      name: "Home",
      href: "/webapp/pet-owner",
      icon: Home,
    },
    {
      name: "Requests",
      href: "/webapp/pet-owner/requests",
      icon: FileText,
    },
    {
      name: "Notifications",
      href: "/webapp/pet-owner/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
      badgeColor: "bg-amber-500 text-amber-50",
    },
    {
      name: "Pricing",
      href: "/webapp/pet-owner/pricing",
      icon: DollarSign,
      iconColor: "text-emerald-600 dark:text-emerald-500",
    },
    {
      name: "Profile",
      href: "/webapp/pet-owner/profile",
      icon: User,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border dark:border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground dark:text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] border-r border-border dark:border-border/50">
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground dark:text-foreground">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                          "hover:bg-accent hover:text-accent-foreground",
                          "text-foreground dark:text-foreground/90 dark:hover:bg-accent/90 dark:hover:text-foreground",
                        )}
                      >
                        <div className="relative">
                          <item.icon className={cn("h-5 w-5", item.iconColor)} />
                          {item.badge && (
                            <span
                              className={cn(
                                "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                                item.badgeColor || "bg-primary text-primary-foreground",
                              )}
                            >
                              {item.badge > 9 ? "9+" : item.badge}
                            </span>
                          )}
                        </div>
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/webapp/pet-owner" className="flex items-center gap-2">
              <span className="font-bold text-xl text-foreground dark:text-foreground">PetCare</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isMounted && <ThemeToggle />}

            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Sidebar (desktop only) */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:w-60 md:flex md:flex-col md:border-r md:border-border dark:md:border-border/50 md:bg-background/95 md:pt-16">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2 px-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground dark:text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  "hover:bg-accent hover:text-accent-foreground",
                  "text-foreground dark:text-foreground/90 dark:hover:bg-accent/90 dark:hover:text-foreground",
                )}
              >
                <div className="relative">
                  <item.icon className={cn("h-5 w-5", item.iconColor)} />
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                        item.badgeColor || "bg-primary text-primary-foreground",
                      )}
                    >
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:pl-60">
        <div className="container max-w-screen-md mx-auto p-4 sm:p-6 pb-20 md:pb-6">{children}</div>
      </main>

      {/* Bottom navigation (mobile only) */}
      <BottomNavigation />
    </div>
  )
}

