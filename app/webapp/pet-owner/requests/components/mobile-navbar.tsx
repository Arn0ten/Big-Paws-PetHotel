"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Bell, User, FileText } from "lucide-react"

export default function MobileNavbar() {
  const [activeTab, setActiveTab] = useState("requests")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center h-16">
        <Link
          href="/webapp/pet-owner/dashboard"
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("home")}
        >
          <Home className={`h-5 w-5 ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`} />
          <span
            className={`text-xs mt-1 ${activeTab === "home" ? "text-primary font-medium" : "text-muted-foreground"}`}
          >
            Home
          </span>
        </Link>

        <Link
          href="/webapp/pet-owner/requests"
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("requests")}
        >
          <FileText className={`h-5 w-5 ${activeTab === "requests" ? "text-primary" : "text-muted-foreground"}`} />
          <span
            className={`text-xs mt-1 ${activeTab === "requests" ? "text-primary font-medium" : "text-muted-foreground"}`}
          >
            Requests
          </span>
        </Link>

        <Link
          href="/webapp/pet-owner/notifications"
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className={`h-5 w-5 ${activeTab === "notifications" ? "text-primary" : "text-muted-foreground"}`} />
          <span
            className={`text-xs mt-1 ${activeTab === "notifications" ? "text-primary font-medium" : "text-muted-foreground"}`}
          >
            Notifications
          </span>
        </Link>

        <Link
          href="/webapp/pet-owner/profile"
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={() => setActiveTab("profile")}
        >
          <User className={`h-5 w-5 ${activeTab === "profile" ? "text-primary" : "text-muted-foreground"}`} />
          <span
            className={`text-xs mt-1 ${activeTab === "profile" ? "text-primary font-medium" : "text-muted-foreground"}`}
          >
            Profile
          </span>
        </Link>
      </div>
    </motion.div>
  )
}

