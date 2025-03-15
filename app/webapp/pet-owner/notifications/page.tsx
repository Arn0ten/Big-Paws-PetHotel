"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PetOwnerHeader } from "../../components/pet-owner/Header"
import { PetOwnerFooter } from "../../components/pet-owner/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle2, XCircle, Clock8, Trash2, Camera, Video, Scissors, Clock, FileText } from "lucide-react"
import MobileNavbar from "../requests/components/mobile-navbar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { formatDistanceToNow } from "date-fns"

// Sample data for demonstration
const sampleNotifications = [
  {
    id: "notif-001",
    type: "request-approved",
    requestType: "photo",
    petName: "Max",
    message: "Your request for a photo update of Max has been approved.",
    createdAt: "2025-03-10T11:30:00Z",
    isRead: false,
  },
  {
    id: "notif-002",
    type: "request-completed",
    requestType: "photo",
    petName: "Max",
    message: "Your request for a photo update of Max has been completed. Check it out!",
    createdAt: "2025-03-10T14:15:00Z",
    isRead: false,
    actionUrl: "/webapp/pet-owner/requests",
  },
  {
    id: "notif-003",
    type: "request-rejected",
    requestType: "video",
    petName: "Luna",
    message: "Your request for a video of Luna has been rejected. Staff unavailable for video at the moment.",
    createdAt: "2025-03-09T16:20:00Z",
    isRead: true,
  },
  {
    id: "notif-004",
    type: "boarding-reminder",
    petName: "Charlie",
    message: "Reminder: Charlie's boarding ends tomorrow. Please make arrangements for pickup.",
    createdAt: "2025-03-08T09:45:00Z",
    isRead: true,
  },
  {
    id: "notif-005",
    type: "system",
    message: "Welcome to Big Paws Pet Hotel! We're excited to have you and your pets with us.",
    createdAt: "2025-03-07T10:30:00Z",
    isRead: true,
  },
]

const getNotificationIcon = (type: string, requestType?: string) => {
  if (type === "request-approved" || type === "request-completed" || type === "request-rejected") {
    switch (requestType) {
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "grooming":
        return <Scissors className="h-5 w-5" />
      case "boarding-extension":
        return <Clock className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  switch (type) {
    case "request-approved":
      return <CheckCircle2 className="h-5 w-5" />
    case "request-completed":
      return <CheckCircle2 className="h-5 w-5" />
    case "request-rejected":
      return <XCircle className="h-5 w-5" />
    case "boarding-reminder":
      return <Clock8 className="h-5 w-5" />
    case "system":
      return <Bell className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "request-approved":
      return "bg-green-100 text-green-700"
    case "request-completed":
      return "bg-blue-100 text-blue-700"
    case "request-rejected":
      return "bg-red-100 text-red-700"
    case "boarding-reminder":
      return "bg-amber-100 text-amber-700"
    case "system":
      return "bg-purple-100 text-purple-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    return "some time ago"
  }
}

export default function PetOwnerNotificationsPage() {
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return true
  })

  return (
    <div className="min-h-screen flex flex-col">
      <PetOwnerHeader />

      <main className="flex-1 container py-6 px-4 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated on your pet's activities and service requests</p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              onClick={handleMarkAllAsRead}
              disabled={!notifications.some((n) => !n.isRead)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter((n) => !n.isRead).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            {notifications.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDeleteNotification}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            {filteredNotifications.length === 0 ? (
              <EmptyState message="No unread notifications" />
            ) : (
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDeleteNotification}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {isMobile && <MobileNavbar />}
      <PetOwnerFooter />
    </div>
  )
}

interface NotificationItemProps {
  notification: any
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className={`w-full ${!notification.isRead ? "border-l-4 border-l-primary" : ""}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
              {getNotificationIcon(notification.type, notification.requestType)}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.createdAt)}</p>
                </div>

                <div className="flex gap-1 ml-4">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>

              {notification.actionUrl && (
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href={notification.actionUrl}>View Details</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EmptyState({ message = "No notifications found" }: { message?: string }) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{message}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Notifications about your pets and requests will appear here
        </p>
      </CardContent>
    </Card>
  )
}

