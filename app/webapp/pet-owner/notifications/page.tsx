"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Bell, Search, CheckCircle, ArrowRight } from "lucide-react"

// Local utility function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  // Check if date is today
  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  if (isToday) {
    return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  }

  // Check if date is yesterday
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()

  if (isYesterday) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  }

  // Otherwise, return full date
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Update the notifications page to focus on request updates and boarding information
  // Improve color contrast and simplify the UI

  // Update the notification types and content to be more focused:
  const [notifications, setNotifications] = useState([
    {
      id: "notif-001",
      type: "request-completed",
      title: "Photo Request Completed",
      message: "Your photo request for Max has been completed. You can view the photos now.",
      timestamp: "2025-03-10T14:45:00Z",
      isRead: false,
      requestId: "req-001",
    },
    {
      id: "notif-002",
      type: "request-in-progress",
      title: "Grooming Request In Progress",
      message: "Your grooming request for Max is now being processed. You'll be notified when it's completed.",
      timestamp: "2025-03-11T09:30:00Z",
      isRead: false,
      requestId: "req-002",
    },
    {
      id: "notif-003",
      type: "payment-reminder",
      title: "Additional Charges Added",
      message:
        "Additional charges of ₱250 have been added for Max's grooming service. Payment will be collected during pickup.",
      timestamp: "2025-03-12T08:15:00Z",
      isRead: true,
    },
    {
      id: "notif-004",
      type: "request-rejected",
      title: "Video Request Rejected",
      message: "Your video request for Max has been rejected. Please check the details for more information.",
      timestamp: "2025-03-07T18:45:00Z",
      isRead: true,
      requestId: "req-004",
    },
    {
      id: "notif-005",
      type: "boarding-update",
      title: "Boarding Pickup Reminder",
      message: "Max's boarding period ends tomorrow. Please prepare for pickup between 8:00 AM and 6:00 PM.",
      timestamp: "2025-03-05T10:30:00Z",
      isRead: true,
    },
  ])

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by tab
    if (activeTab === "unread" && notification.isRead) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!notification.title.toLowerCase().includes(query) && !notification.message.toLowerCase().includes(query)) {
        return false
      }
    }

    return true
  })

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  // Update the notification icon function to be more descriptive:
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "request-completed":
        return <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
      case "request-in-progress":
        return <Bell className="h-5 w-5 text-amber-500 dark:text-amber-400" />
      case "payment-reminder":
        return <Bell className="h-5 w-5 text-red-500 dark:text-red-400" />
      case "request-rejected":
        return <Bell className="h-5 w-5 text-red-500 dark:text-red-400" />
      case "boarding-update":
        return <Bell className="h-5 w-5 text-blue-500 dark:text-blue-400" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your pet's care</p>
          </div>

          {notifications.some((n) => !n.isRead) && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {notifications.filter((n) => !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-4">
            {sortedNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "all"
                    ? "You don't have any notifications yet."
                    : "You don't have any unread notifications."}
                </p>
              </div>
            ) : (
              sortedNotifications.map((notification) => (
                <Link
                  href={
                    notification.requestId
                      ? `/webapp/pet-owner/requests/${notification.requestId}`
                      : `/webapp/pet-owner/notifications/${notification.id}`
                  }
                  key={notification.id}
                >
                  {/* Update the card styling for better visibility in dark mode: */}
                  <Card
                    className={`hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors cursor-pointer ${!notification.isRead ? "border-l-4 border-l-primary dark:border-l-primary" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {/* Update the badge styling: */}
                              {!notification.isRead && (
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30 dark:text-primary-foreground text-xs px-2 py-0 h-5"
                                >
                                  New
                                </Badge>
                              )}
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>

                          <p className="text-sm mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.timestamp)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

