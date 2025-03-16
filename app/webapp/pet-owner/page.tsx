"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Video, Scissors, Clock, FileText, Plus, ArrowRight, Calendar, DollarSign } from "lucide-react"
import { formatCurrency, formatDate } from "../utils/date-helpers"
import { pets, requests, notifications } from "../data/sample-data"

export default function PetOwnerHomePage() {
  const [activeTab, setActiveTab] = useState("boarding")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get the active boarding pet
  const activeBoardingPet = pets.find((pet) => pet.boarding?.status === "active")

  // Get recent requests (limit to 3)
  const recentRequests = requests.slice(0, 3)

  // Get unread notifications (limit to 2)
  const unreadNotifications = notifications.filter((n) => !n.isRead).slice(0, 2)

  // Get request type icon
  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "grooming":
        return <Scissors className="h-5 w-5" />
      case "boarding-extension":
        return <Clock className="h-5 w-5" />
      case "custom":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Get request type label
  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "photo":
        return "Photo Update"
      case "video":
        return "Video Request"
      case "grooming":
        return "Grooming Service"
      case "boarding-extension":
        return "Boarding Extension"
      case "custom":
        return "Custom Request"
      default:
        return "Request"
    }
  }

  // Get request status badge
  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            New
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-3/4 bg-muted animate-pulse rounded-md"></div>
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md"></div>

        <div className="h-64 bg-muted animate-pulse rounded-md"></div>

        <div className="h-10 bg-muted animate-pulse rounded-md"></div>

        <div className="space-y-4">
          <div className="h-24 bg-muted animate-pulse rounded-md"></div>
          <div className="h-24 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="text-muted-foreground">Check on your pets and manage your requests.</p>
      </motion.div>

      {/* Active Boarding Section */}
      {activeBoardingPet && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Active Boarding
              </CardTitle>
              <CardDescription>{activeBoardingPet.name}'s current boarding details</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={activeBoardingPet.avatar} alt={activeBoardingPet.name} />
                  <AvatarFallback>{activeBoardingPet.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{activeBoardingPet.name}</h3>
                  <p className="text-sm text-muted-foreground">{activeBoardingPet.breed}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Check-in</p>
                  <p className="font-medium">{formatDate(activeBoardingPet.boarding?.startDate || "")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Check-out</p>
                  <p className="font-medium">{formatDate(activeBoardingPet.boarding?.endDate || "")}</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Package</p>
                    <p className="font-medium">{activeBoardingPet.boarding?.package}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Price</p>
                    <p className="font-medium">{formatCurrency(activeBoardingPet.boarding?.totalPrice || 0, "PHP")}</p>
                  </div>
                </div>

                {activeBoardingPet.boarding?.remainingAmount ? (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Remaining Balance</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-amber-600">
                          {formatCurrency(activeBoardingPet.boarding?.remainingAmount || 0, "PHP")}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay Balance
                </Button>
                <Button variant="default" className="flex-1">
                  Make Request
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {/* Tabs for Pets and Requests */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="boarding" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="boarding">My Pets</TabsTrigger>
            <TabsTrigger value="requests">Recent Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="boarding" className="mt-4 space-y-4">
            {pets.map((pet) => (
              <Link href={`/webapp/pet-owner/pets/${pet.id}`} key={pet.id}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={pet.avatar} alt={pet.name} />
                        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} • {pet.age}
                        </p>

                        {pet.boarding ? (
                          <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/20">
                            Currently Boarding
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="mt-2">
                            Not Boarding
                          </Badge>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <Link href="/webapp/pet-owner/pets/add">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Pet
              </Button>
            </Link>
          </TabsContent>

          <TabsContent value="requests" className="mt-4 space-y-4">
            {recentRequests.map((request) => (
              <Link href={`/webapp/pet-owner/requests/${request.id}`} key={request.id}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                        p-2 rounded-full flex-shrink-0
                        ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                        ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                        ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                        ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                        ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
                      `}
                      >
                        {getRequestTypeIcon(request.type)}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{getRequestTypeLabel(request.type)}</h3>
                          {getRequestStatusBadge(request.status)}
                        </div>

                        <p className="text-sm text-muted-foreground mt-1">For {request.petName}</p>
                        <p className="text-sm line-clamp-1 mt-1">{request.description}</p>

                        <p className="text-xs text-muted-foreground mt-2">
                          {request.status === "completed"
                            ? `Completed ${formatDate(request.completedAt || "")}`
                            : `Requested ${formatDate(request.createdAt)}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <Link href="/webapp/pet-owner/requests/new">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Notifications Preview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
          <Link href="/webapp/pet-owner/notifications" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {unreadNotifications.map((notification) => (
            <Link href={`/webapp/pet-owner/notifications/${notification.id}`} key={notification.id}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-l-4 border-l-primary">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{notification.title}</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm mt-1 line-clamp-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.timestamp)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

