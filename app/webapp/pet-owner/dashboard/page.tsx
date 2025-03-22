"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Calendar, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Default pet avatars
const DEFAULT_DOG_AVATAR =
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop";
const DEFAULT_CAT_AVATAR =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop";

// Mock data for demonstration
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  pets: [
    { id: "1", name: "Buddy", type: "Dog", breed: "Golden Retriever", age: 3 },
    { id: "2", name: "Whiskers", type: "Cat", breed: "Siamese", age: 2 },
  ],
  upcomingBookings: [
    {
      id: 1,
      petName: "Buddy",
      petType: "Dog",
      service: "Boarding",
      date: "2023-06-15",
    },
    {
      id: 2,
      petName: "Whiskers",
      petType: "Cat",
      service: "Grooming",
      date: "2023-06-20",
    },
  ],
};

export default function DashboardPage() {
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user data
    // COMMENT: This should be replaced with an actual API call in production
    setTimeout(() => {
      setUserData(mockUserData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Helper function to get pet avatar based on type
  const getPetAvatar = (petName: string, petType: string) => {
    if (petType.toLowerCase() === "cat") return DEFAULT_CAT_AVATAR;
    return DEFAULT_DOG_AVATAR;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground">
            Loading your pet dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Welcome, {userData.name}!
        </h1>

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
              <CardTitle className="text-sm font-medium">
                Upcoming Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userData.upcomingBookings.length}
              </div>
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
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={
                            pet.type.toLowerCase() === "cat"
                              ? DEFAULT_CAT_AVATAR
                              : DEFAULT_DOG_AVATAR
                          }
                          alt={pet.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {pet.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{pet.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pet.breed}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pet.age} years old
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <Button variant="ghost" asChild>
                    <Link
                      href="/webapp/pet-owner/pets/add"
                      className="flex flex-col items-center"
                    >
                      <PawPrint className="h-8 w-8 mb-2" />
                      <span>Add New Pet</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="bookings">
            <div className="space-y-4">
              {userData.upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={getPetAvatar(booking.petName, booking.petType)}
                          alt={booking.petName}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {booking.petName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {booking.service} for {booking.petName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center p-6">
                  <Button variant="ghost" asChild>
                    <Link
                      href="/webapp/pet-owner/bookings/new"
                      className="flex flex-col items-center"
                    >
                      <Calendar className="h-8 w-8 mb-2" />
                      <span>Book New Service</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
