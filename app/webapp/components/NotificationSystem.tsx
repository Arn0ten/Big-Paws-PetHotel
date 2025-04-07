"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NOTIFICATION_TYPES } from "@/app/webapp/constants"

/**
 * Notification System Component
 *
 * This component provides a notification system for the pet owner interface.
 * It displays notifications, allows marking them as read, and configuring
 * notification preferences.
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace the mock notifications with real-time notifications from the backend
 *    - Endpoint: GET /api/notifications
 *    - This should return all notifications for the current user
 *    - Implement WebSocket or Server-Sent Events for real-time updates
 *
 * 2. Implement notification marking as read
 *    - Endpoint: PUT /api/notifications/:id/read
 *    - This should mark a notification as read
 *
 * 3. Implement notification preferences
 *    - Endpoint: PUT /api/users/notification-preferences
 *    - This should update the user's notification preferences
 *
 * 4. Implement push notifications
 *    - Use a service worker to handle push notifications
 *    - Register the device for push notifications
 *    - Handle notification clicks to navigate to the relevant page
 */
export function NotificationSystem() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
    sms: false,
  })

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        setError("")

        // BACKEND INTEGRATION:
        // Replace this with an actual API call to fetch notifications
        // Example:
        // const response = await fetch('/api/notifications');
        // if (!response.ok) throw new Error('Failed to fetch notifications');
        // const notificationsData = await response.json();

        // For demo, we'll use mock data
        const mockNotifications = [
          {
            id: "notif_1",
            type: NOTIFICATION_TYPES.REQUEST_STATUS_CHANGE,
            title: "Request Approved",
            message: "Your photo request for Max has been approved",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            isRead: false,
            data: {
              requestId: "req_123",
              requestType: "photo",
              status: "approved",
            },
          },
          {
            id: "notif_2",
            type: NOTIFICATION_TYPES.NEW_MESSAGE,
            title: "New Message",
            message: "You have a new message regarding your grooming request",
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
            isRead: true,
            data: {
              requestId: "req_456",
              messageId: "msg_789",
            },
          },
          {
            id: "notif_3",
            type: NOTIFICATION_TYPES.MEDIA_ADDED,
            title: "New Photos Added",
            message: "5 new photos of Bella have been added",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
            isRead: false,
            data: {
              requestId: "req_789",
              mediaCount: 5,
              mediaType: "photo",
            },
          },
        ]

        setNotifications(mockNotifications)
        setUnreadCount(mockNotifications.filter((notif) => !notif.isRead).length)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        setError("Failed to load notifications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()

    // Set up real-time updates
    // BACKEND INTEGRATION:
    // Replace this with actual WebSocket or SSE implementation
    const interval = setInterval(fetchNotifications, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      // BACKEND INTEGRATION:
      // Replace this with an actual API call to mark notification as read
      // Example:
      // const response = await fetch(`/api/notifications/${notificationId}/read`, {
      //   method: 'PUT',
      // });
      // if (!response.ok) throw new Error('Failed to mark notification as read');

      // For demo, we'll update the local state
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)),
      )

      // Update unread count
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // BACKEND INTEGRATION:
      // Replace this with an actual API call to mark all notifications as read
      // Example:
      // const response = await fetch('/api/notifications/read-all', {
      //   method: 'PUT',
      // });
      // if (!response.ok) throw new Error('Failed to mark all notifications as read');

      // For demo, we'll update the local state
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))

      // Update unread count
      setUnreadCount(0)
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  // Update notification preferences
  const updateNotificationPreferences = async (key: string, value: boolean) => {
    try {
      // BACKEND INTEGRATION:
      // Replace this with an actual API call to update notification preferences
      // Example:
      // const response = await fetch('/api/users/notification-preferences', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ [key]: value }),
      // });
      // if (!response.ok) throw new Error('Failed to update notification preferences');

      // For demo, we'll update the local state
      setNotificationPreferences((prev) => ({
        ...prev,
        [key]: value,
      }))
    } catch (error) {
      console.error("Error updating notification preferences:", error)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case NOTIFICATION_TYPES.REQUEST_STATUS_CHANGE:
        return <Badge className="bg-blue-600 text-white">Status</Badge>
      case NOTIFICATION_TYPES.NEW_MESSAGE:
        return <Badge className="bg-green-600 text-white">Message</Badge>
      case NOTIFICATION_TYPES.MEDIA_ADDED:
        return <Badge className="bg-purple-600 text-white">Media</Badge>
      case NOTIFICATION_TYPES.APPOINTMENT_REMINDER:
        return <Badge className="bg-amber-600 text-white">Reminder</Badge>
      default:
        return <Badge className="bg-gray-600 text-white">System</Badge>
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                  Mark all as read
                </Button>
              )}
            </div>
            <CardDescription>Stay updated on your requests</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread" disabled={unreadCount === 0}>
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-2 space-y-2">
                {isLoading ? (
                  <div className="text-center p-4">
                    <p className="text-sm text-muted-foreground">Loading notifications...</p>
                  </div>
                ) : error ? (
                  <div className="text-center p-4">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center p-4">
                    <BellOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-md ${
                        notification.isRead ? "bg-muted/30" : "bg-primary/5 dark:bg-primary/10"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getNotificationIcon(notification.type)}
                            <p className="text-sm font-medium">{notification.title}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                        </div>
                        {!notification.isRead && <Badge className="bg-blue-600 text-white">New</Badge>}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              <TabsContent value="unread" className="mt-2 space-y-2">
                {notifications.filter((n) => !n.isRead).length === 0 ? (
                  <div className="text-center p-4">
                    <Check className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No unread notifications</p>
                  </div>
                ) : (
                  notifications
                    .filter((notification) => !notification.isRead)
                    .map((notification) => (
                      <div key={notification.id} className="p-3 rounded-md bg-primary/5 dark:bg-primary/10">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(notification.type)}
                              <p className="text-sm font-medium">{notification.title}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Switch
                  checked={notificationPreferences.email}
                  onCheckedChange={(checked) => updateNotificationPreferences("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <Switch
                  checked={notificationPreferences.push}
                  onCheckedChange={(checked) => updateNotificationPreferences("push", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Notifications</span>
                <Switch
                  checked={notificationPreferences.sms}
                  onCheckedChange={(checked) => updateNotificationPreferences("sms", checked)}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

