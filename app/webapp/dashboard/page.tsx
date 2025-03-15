"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PawPrint, Calendar, Clock, Package } from "lucide-react"
import Logo from "../components/Logo"

// Mock data for demonstration
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  pets: [
    { name: "Buddy", type: "Dog", breed: "Golden Retriever", age: 3 },
    { name: "Whiskers", type: "Cat", breed: "Siamese", age: 2 },
  ],
  upcomingBookings: [
    { id: 1, petName: "Buddy", service: "Boarding", date: "2023-06-15" },
    { id: 2, petName: "Whiskers", service: "Grooming", date: "2023-06-20" },
  ],
}

export default function DashboardPage() {
  const [userData, setUserData] = useState(mockUserData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      setUserData(mockUserData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <PawPrint className="w-16 h-16 text-[#2e3357] animate-bounce mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Loading your pet dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo size="medium" />
          <Button variant="outline" className="text-[#2e3357]">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#2e3357] mb-8">Welcome, {userData.name}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pets</CardTitle>
                <PawPrint className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.pets.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.upcomingBookings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 days ago</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pets" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pets">My Pets</TabsTrigger>
              <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="pets">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.pets.map((pet, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center space-x-4 p-6">
                      <div className="flex-shrink-0">
                        <Image
                          src={`/images/${pet.type.toLowerCase()}.png`}
                          alt={pet.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{pet.name}</h3>
                        <p className="text-sm text-gray-500">{pet.breed}</p>
                        <p className="text-sm text-gray-500">{pet.age} years old</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="bookings">
              <div className="space-y-4">
                {userData.upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Package className="h-10 w-10 text-[#2e3357]" />
                        <div>
                          <h3 className="text-lg font-semibold">
                            {booking.service} for {booking.petName}
                          </h3>
                          <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

