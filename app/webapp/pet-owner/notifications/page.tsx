"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Bell, Search, CheckCircle, Loader2 } from "lucide-react"
import { notifications } from "@/app/webapp/data/sample-data"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

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
  const [notificationsList, setNotificationsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletedNotificationIds, setDeletedNotificationIds] = useState<string[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null)
  const [showDeleteAllReadConfirm, setShowDeleteAllReadConfirm] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()

  // Fetch notifications on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchNotifications = async () => {
    //   try {
    //     const response = await fetch('/api/notifications');
    //     const data = await response.json();
    //     setNotificationsList(data);
    //   } catch (error) {
    //     console.error('Error fetching notifications:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // For demo, use the sample data
    const fetchNotifications = () => {
      setIsLoading(true)
      // Simulate API delay
      setTimeout(() => {
        setNotificationsList(notifications)
        setIsLoading(false)
      }, 500)
    }

    fetchNotifications()
  }, [])

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  // Mark all as read
  const markAllAsRead = () => {
    // In a real app, this would be an API call to mark all notifications as read
    // const markAllRead = async () => {
    //   try {
    //     await fetch('/api/notifications/mark-all-read', { method: 'POST' });
    //     setNotificationsList(prev => prev.map(notif => ({ ...notif, isRead: true })));
    //   } catch (error) {
    //     console.error('Error marking notifications as read:', error);
    //   }
    // };

    // For demo, just update the local state
    setNotificationsList(notificationsList.map((notif) => ({ ...notif, isRead: true })))
  }

  // Mark notification as read when clicked
  const handleNotificationClick = (notificationId: string) => {
    setNotificationsList((prev) =>
      prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)),
    )
  }

  // Delete a notification
  const deleteNotification = (notificationId: string) => {
    // In a real app, this would be an API call
    setDeletedNotificationIds((prev) => [...prev, notificationId])
    setNotificationToDelete(null)

    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
      duration: 3000,
    })
  }

  // Delete all read notifications
  const deleteAllReadNotifications = () => {
    const readNotificationIds = notificationsList.filter((n) => n.isRead).map((n) => n.id)

    setDeletedNotificationIds((prev) => [...prev, ...readNotificationIds])
    setShowDeleteAllReadConfirm(false)

    toast({
      title: "Notifications deleted",
      description: `${readNotificationIds.length} read notifications have been removed.`,
      duration: 3000,
    })
  }

  // Filter out deleted notifications
  const displayedNotifications = notificationsList.filter(
    (notification) => !deletedNotificationIds.includes(notification.id),
  )

  // Filter notifications based on active tab and search query
  const filteredNotifications = displayedNotifications.filter((notification) => {
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

          {notificationsList.some((n) => !n.isRead) && (
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
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          placeholder="Search notifications..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value
            setSearchQuery(query)
            setIsSearching(true)

            // Clear any existing timeout
            if (searchTimeoutRef.current) {
              clearTimeout(searchTimeoutRef.current)
            }

            // Set a new timeout for the search
            searchTimeoutRef.current = setTimeout(() => {
              // Apply search filter
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false)
                setIsSearching(false)
              }, 400)
            }, 300)
          }}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
            onClick={() => {
              setSearchQuery("")
              setIsSearching(false)
              // Simulate clearing search results
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false)
              }, 300)
            }}
            aria-label="Clear search"
          >
            Clear
          </Button>
        )}
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
              {notificationsList.filter((n) => !n.isRead).length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {notificationsList.filter((n) => !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-4">
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-muted"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-1/3 bg-muted rounded"></div>
                          <div className="h-3 w-full bg-muted rounded"></div>
                          <div className="h-3 w-1/4 bg-muted rounded"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredNotifications.length === 0 ? (
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
              <>
                {/* Delete all read notifications button */}
                {activeTab === "all" && displayedNotifications.some((n) => n.isRead) && (
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteAllReadConfirm(true)}
                      className="text-xs"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Read Notifications
                    </Button>
                  </div>
                )}

                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors ${
                      !notification.isRead ? "border-l-4 border-l-primary dark:border-l-primary" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div
                              className="flex-1 cursor-pointer"
                              onClick={() => {
                                handleNotificationClick(notification.id)
                                if (notification.requestId) {
                                  router.push(`/webapp/pet-owner/requests/${notification.requestId}`)
                                } else {
                                  router.push(`/webapp/pet-owner/notifications/${notification.id}`)
                                }
                              }}
                            >
                              <h3 className="font-medium">{notification.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Updated badge styling for consistency */}
                              {!notification.isRead && <Badge className="bg-blue-600 text-white">New</Badge>}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setNotificationToDelete(notification.id)
                                  setShowDeleteConfirm(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              handleNotificationClick(notification.id)
                              if (notification.requestId) {
                                router.push(`/webapp/pet-owner/requests/${notification.requestId}`)
                              } else {
                                router.push(`/webapp/pet-owner/notifications/${notification.id}`)
                              }
                            }}
                          >
                            <p className="text-sm mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Delete Notification Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => notificationToDelete && deleteNotification(notificationToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Read Notifications Confirmation Dialog */}
      <AlertDialog open={showDeleteAllReadConfirm} onOpenChange={setShowDeleteAllReadConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Read Notifications</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all read notifications? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAllReadNotifications}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete All Read
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

