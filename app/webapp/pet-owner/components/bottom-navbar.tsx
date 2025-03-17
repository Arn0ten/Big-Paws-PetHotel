"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Calendar, MessageSquare, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavbar() {
  const pathname = usePathname()
  const [hasNotifications, setHasNotifications] = useState(false)

  // Simulate checking for notifications
  useEffect(() => {
    // This would be replaced with an actual API call
    const checkNotifications = () => {
      // Simulate having notifications 50% of the time
      setHasNotifications(Math.random() > 0.5)
    }

    checkNotifications()

    // Check for new notifications every 5 minutes
    const interval = setInterval(checkNotifications, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const navItems = [
    {
      name: "Home",
      href: "/webapp/pet-owner/dashboard",
      icon: Home,
    },
    {
      name: "Bookings",
      href: "/webapp/pet-owner/bookings",
      icon: Calendar,
    },
    {
      name: "Messages",
      href: "/webapp/pet-owner/messages",
      icon: MessageSquare,
    },
    {
      name: "Notifications",
      href: "/webapp/pet-owner/notifications",
      icon: Bell,
      hasNotification: hasNotifications,
    },
    {
      name: "Profile",
      href: "/webapp/pet-owner/profile",
      icon: User,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full h-16 px-2 bg-background border-t z-40">
      <div className="h-full flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full relative",
                isActive
                  ? "text-primary dark:text-primary"
                  : "text-muted-foreground dark:text-muted-foreground/80 hover:text-foreground dark:hover:text-foreground",
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.hasNotification && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 dark:bg-red-400 rounded-full"
                  />
                )}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-0 h-1 w-10 bg-primary dark:bg-primary rounded-t-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

