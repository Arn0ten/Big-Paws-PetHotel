"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { notifications } from "../../data/sample-data"

export default function BottomNavigation() {
  const pathname = usePathname()

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length

  const navItems = [
    {
      name: "Home",
      href: "/webapp/pet-owner",
      icon: Home,
      isActive: pathname === "/webapp/pet-owner",
    },
    {
      name: "Requests",
      href: "/webapp/pet-owner/requests",
      icon: FileText,
      isActive: pathname.includes("/webapp/pet-owner/requests"),
    },
    {
      name: "Notifications",
      href: "/webapp/pet-owner/notifications",
      icon: Bell,
      isActive: pathname.includes("/webapp/pet-owner/notifications"),
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      name: "Profile",
      href: "/webapp/pet-owner/profile",
      icon: User,
      isActive: pathname.includes("/webapp/pet-owner/profile"),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              "text-xs font-medium transition-colors",
              item.isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            <div className="relative">
              <item.icon className="h-5 w-5 mb-1" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

