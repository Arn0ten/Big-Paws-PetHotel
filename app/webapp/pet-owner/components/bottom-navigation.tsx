"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Bell, User, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUnreadNotificationsCount } from "@/app/webapp/data/sample-data"

/**
 * BottomNavigation Component
 *
 * This component provides a mobile-friendly bottom navigation bar.
 *
 * API Integration Points:
 * 1. Notification count - GET /api/notifications/unread/count
 *
 * @returns {JSX.Element} The bottom navigation component
 */
export default function BottomNavigation() {
  const pathname = usePathname()

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
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border dark:border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3",
                isActive
                  ? "text-primary"
                  : "text-foreground/70 dark:text-foreground/60 hover:text-foreground dark:hover:text-foreground",
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
              <span className="text-[10px] font-medium mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

