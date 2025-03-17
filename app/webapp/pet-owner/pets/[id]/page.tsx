"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit, Trash2, AlertCircle, PawPrint, Heart, Info } from "lucide-react"
import { formatDate } from "../../../utils/date-helpers"

// Sample pet data - in a real app, this would come from an API
const samplePet = {
  id: "pet-1",
  name: "Max",
  type: "Dog",
  breed: "Golden Retriever",
  age: 3,
  size: "Large",
  avatar: "/placeholder.svg?height=128&width=128",
  color: "Golden",
  gender: "Male",
  neutered: true,
  vaccinated: true,
  medicalConditions: ["Allergies to chicken"],
  specialNeeds: ["Needs daily joint supplement"],
  boarding: {
    status: "active",
    startDate: "2023-11-15T08:00:00Z",
    endDate: "2023-11-22T17:00:00Z",
    package: "Premium Boarding",
    totalPrice: 5250,
    remainingAmount: 2625,
  },
  boardingHistory: [
    {
      id: "bh-1",
      startDate: "2023-08-10T09:00:00Z",
      endDate: "2023-08-15T16:00:00Z",
      package: "Standard Boarding",
      totalPrice: 2500,
    },
    {
      id: "bh-2",
      startDate: "2023-05-22T10:00:00Z",
      endDate: "2023-05-29T15:00:00Z",
      package: "Premium Boarding",
      totalPrice: 4900,
    },
  ],
}

export default function PetDetailPage() {
  const params = useParams()
  const petId = params.id as string
  const pet = samplePet // In a real app, fetch the pet by ID

  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="text-foreground dark:text-foreground">
          <Link href="/webapp/pet-owner">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">Pet Profile</h1>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={pet.avatar} alt={pet.name} />
                  <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-foreground dark:text-foreground">{pet.name}</CardTitle>
                  <CardDescription className="text-base">
                    {pet.breed} • {pet.size} size • {pet.age} {pet.age === 1 ? "year" : "years"} old
                  </CardDescription>

                  {pet.boarding ? (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                    >
                      Currently Boarding
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                    >
                      Not Boarding
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="icon" className="text-foreground dark:text-foreground">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details" className="text-foreground dark:text-foreground">
                  Details
                </TabsTrigger>
                <TabsTrigger value="boarding" className="text-foreground dark:text-foreground">
                  Boarding History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                    <p className="text-base font-medium text-foreground dark:text-foreground">{pet.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Breed</h3>
                    <p className="text-base font-medium text-foreground dark:text-foreground">{pet.breed}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
                    <p className="text-base font-medium text-foreground dark:text-foreground">
                      {pet.age} {pet.age === 1 ? "year" : "years"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                    <p className="text-base font-medium text-foreground dark:text-foreground">{pet.size}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Color</h3>
                    <p className="text-base font-medium text-foreground dark:text-foreground">{pet.color}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
                    <p className="text-base font-medium text-foreground dark:text-foreground">{pet.gender}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border dark:border-border/50">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Health Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={pet.vaccinated ? "outline" : "secondary"}
                        className={
                          pet.vaccinated
                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                            : ""
                        }
                      >
                        {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
                      </Badge>
                      <Badge
                        variant={pet.neutered ? "outline" : "secondary"}
                        className={
                          pet.neutered
                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                            : ""
                        }
                      >
                        {pet.neutered ? "Neutered/Spayed" : "Not Neutered/Spayed"}
                      </Badge>
                    </div>

                    {pet.medicalConditions && pet.medicalConditions.length > 0 && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                        <h4 className="text-sm font-medium text-amber-700 dark:text-amber-400">Medical Conditions</h4>
                        <ul className="mt-1 text-sm text-amber-600 dark:text-amber-300 space-y-1">
                          {pet.medicalConditions.map((condition, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pet.specialNeeds && pet.specialNeeds.length > 0 && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                        <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Special Needs</h4>
                        <ul className="mt-1 text-sm text-blue-600 dark:text-blue-400 space-y-1">
                          {pet.specialNeeds.map((need, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Heart className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{need}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md mt-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Suggested next steps:</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {pet.boarding
                          ? "Your pet is currently boarding with us. You can make a request for photos, videos, or other services."
                          : "Schedule a boarding appointment for your pet or update their information if needed."}
                      </p>
                      <div className="mt-2">
                        <Link href="/webapp/pet-owner/pricing">
                          <Button size="sm" variant="outline" className="text-xs">
                            View Pricing
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="boarding" className="mt-4 space-y-4">
                {pet.boarding && (
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Calendar className="h-5 w-5" />
                        Current Boarding
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-green-600/70 dark:text-green-400/70 uppercase tracking-wide">
                            Check-in
                          </p>
                          <p className="font-medium text-green-700 dark:text-green-300">
                            {formatDate(pet.boarding.startDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600/70 dark:text-green-400/70 uppercase tracking-wide">
                            Check-out
                          </p>
                          <p className="font-medium text-green-700 dark:text-green-300">
                            {formatDate(pet.boarding.endDate)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md border border-green-200 dark:border-green-800/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-green-600/70 dark:text-green-400/70 uppercase tracking-wide">
                              Package
                            </p>
                            <p className="font-medium text-green-700 dark:text-green-300">{pet.boarding.package}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-600/70 dark:text-green-400/70 uppercase tracking-wide">
                              Total Price
                            </p>
                            <p className="font-medium text-green-600 dark:text-green-400">
                              ₱{pet.boarding.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {pet.boarding.remainingAmount && (
                          <div className="mt-3 pt-3 border-t border-green-100 dark:border-green-800/30">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                                  Remaining Balance
                                </p>
                                <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                                  (To be paid during pickup)
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-amber-600 dark:text-amber-400">
                                  ₱{pet.boarding.remainingAmount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/webapp/pet-owner/requests/new" className="w-full">
                        <Button variant="default" className="w-full">
                          Make a Request for {pet.name}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )}

                <h3 className="text-lg font-medium text-foreground dark:text-foreground mt-6">Boarding History</h3>

                {pet.boardingHistory && pet.boardingHistory.length > 0 ? (
                  <div className="space-y-4">
                    {pet.boardingHistory.map((history) => (
                      <Card key={history.id} className="border-border/50 dark:border-border/30">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-foreground dark:text-foreground">{history.package}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(history.startDate)} - {formatDate(history.endDate)}
                              </p>
                            </div>
                            <p className="font-medium text-green-600 dark:text-green-400">
                              ₱{history.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg bg-muted/20 dark:bg-muted/10 dark:border-muted/30">
                    <PawPrint className="h-12 w-12 mx-auto text-muted-foreground dark:text-muted-foreground/80 mb-3" />
                    <h3 className="text-lg font-medium text-foreground dark:text-foreground">No boarding history</h3>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground/90 mt-1 max-w-md mx-auto">
                      {pet.name} hasn't stayed with us before. Book your first boarding appointment today!
                    </p>
                  </div>
                )}

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md mt-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Suggested next steps:</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {!pet.boarding
                          ? "Schedule a new boarding appointment for your pet."
                          : "View your current boarding details or make a service request."}
                      </p>
                      <div className="mt-2">
                        <Link href="/webapp/pet-owner/pricing">
                          <Button size="sm" variant="outline" className="text-xs">
                            View Pricing
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800/50 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Pet Profile
        </Button>
        <Button variant="outline" asChild className="text-foreground dark:text-foreground">
          <Link href="/webapp/pet-owner/pets/edit">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      </div>
    </div>
  )
}

