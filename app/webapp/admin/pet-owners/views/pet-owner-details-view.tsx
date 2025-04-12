"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Edit,
  Trash,
  Plus,
  Mail,
  Phone,
  MapPin,
  Hotel,
  Dog,
  Cat,
  Calendar,
  Users,
  CalendarDays,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PetOwner, Pet } from "../utils/types"

interface PetOwnerDetailsViewProps {
  owner: PetOwner | null
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onAddPet: () => void
  onBoardPet: () => void
  onPetClick: (pet: Pet) => void
}

export default function PetOwnerDetailsView({
  owner,
  onBack,
  onEdit,
  onDelete,
  onAddPet,
  onBoardPet,
  onPetClick,
}: PetOwnerDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("pets")

  if (!owner) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Pet owner not found</h2>
          <p className="text-muted-foreground mt-2">The requested pet owner could not be found.</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Count active boardings
  const activeBoardings = owner.pets.filter((pet) => pet.isBoarding).length

  const boardingHistory = [
    {
      id: "bh1",
      petName: "Max",
      petType: "Dog",
      startDate: "2023-12-15",
      endDate: "2023-12-20",
      checkInTime: "10:00 AM",
      checkOutTime: "5:00 PM",
      duration: "5 days",
      status: "completed",
      type: "LongStay",
      notes: "Regular diet, daily walks, no issues reported",
      totalPrice: 2400,
      paymentStatus: "Paid",
    },
    {
      id: "bh2",
      petName: "Bella",
      petType: "Cat",
      startDate: "2023-10-03",
      endDate: "2023-10-10",
      checkInTime: "9:30 AM",
      checkOutTime: "4:00 PM",
      duration: "7 days",
      status: "completed",
      type: "LongStay",
      notes: "Special diet required, medication administered twice daily",
      totalPrice: 3360,
      paymentStatus: "Paid",
    },
    {
      id: "bh3",
      petName: "Charlie",
      petType: "Dog",
      startDate: "2023-11-25",
      endDate: "2023-11-25",
      checkInTime: "8:00 AM",
      checkOutTime: "4:00 PM",
      duration: "8 hours",
      status: "completed",
      type: "Daycare",
      notes: "Socialized well with other pets, enjoyed playtime",
      totalPrice: 240,
      paymentStatus: "Paid",
    },
    {
      id: "bh4",
      petName: "Luna",
      petType: "Cat",
      startDate: "2024-01-05",
      endDate: "2024-01-12",
      checkInTime: "11:00 AM",
      checkOutTime: "3:00 PM",
      duration: "7 days",
      status: "completed",
      type: "LongStay",
      notes: "Preferred quiet spaces, enjoyed window perches",
      totalPrice: 3150,
      paymentStatus: "Paid",
    },
  ]

  const actions = (
    <>
      <Button variant="outline" onClick={onEdit}>
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>
      <Button onClick={onBoardPet} className="bg-amber-600 hover:bg-amber-700 text-white">
        <Hotel className="mr-2 h-4 w-4" />
        Board Pet
      </Button>
    </>
  )

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Pet Owner Details</h1>
        </div>
        <div className="flex gap-2">{actions}</div>
      </div>

      {/* Owner details and status */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {owner.avatar ? (
              <img src={owner.avatar || "/placeholder.svg"} alt={owner.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Users className="h-16 w-16 mb-2" />
                <span>No image available</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          {/* Owner name and primary info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{owner.name}</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <Users className="h-3 w-3" />
                {owner.pets.length} {owner.pets.length === 1 ? "Pet" : "Pets"}
              </Badge>
              {activeBoardings > 0 && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1"
                >
                  <Hotel className="h-3 w-3" />
                  {activeBoardings} Boarding
                </Badge>
              )}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Customer since {formatDate(owner.createdAt)}</span>
            </div>
          </div>

          {/* Contact details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="border rounded-lg p-3 flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="font-semibold flex items-center">
                <Mail className="h-4 w-4 mr-1 text-blue-500" />
                {owner.email}
              </div>
            </div>
            <div className="border rounded-lg p-3 flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">Phone</div>
              <div className="font-semibold flex items-center">
                <Phone className="h-4 w-4 mr-1 text-green-500" />
                {owner.phone}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-4 p-4 border rounded-md bg-muted/20">
            <h3 className="font-semibold mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Address:
            </h3>
            <p className="text-muted-foreground">{owner.address}</p>
          </div>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="pets" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pets">
            Pets ({owner.pets.length})
            {activeBoardings > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                {activeBoardings} Boarding
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">Boarding History</TabsTrigger>
        </TabsList>

        {/* Pets Tab */}
        <TabsContent value="pets" className="pt-4">
          {owner.pets.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">No pets registered</h3>
              <p className="text-muted-foreground mt-1">This owner doesn't have any pets registered yet.</p>
              <Button onClick={onAddPet} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Pet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {owner.pets.map((pet) => (
                  <Card
                    key={pet.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      pet.isBoarding ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20" : ""
                    }`}
                    onClick={() => onPetClick(pet)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{pet.name}</CardTitle>
                        {pet.isBoarding && <Badge className="bg-green-500 text-white">Boarding</Badge>}
                      </div>
                      <CardDescription>
                        {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"} old
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              pet.type === "Dog"
                                ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                                : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600"
                            }
                          >
                            {pet.type === "Dog" ? <Dog className="mr-1 h-3 w-3" /> : <Cat className="mr-1 h-3 w-3" />}
                            {pet.type}
                          </Badge>
                          <Badge variant="outline">{pet.size}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Boarding History Tab */}
        <TabsContent value="history" className="pt-4">
          {boardingHistory.length > 0 ? (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Boarding Date</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Pet</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Check In/Out</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Boarding Type</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Duration</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Notes</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Price</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Payment Status</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardingHistory.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="font-medium">{record.startDate}</div>
                          {record.startDate !== record.endDate && (
                            <div className="text-xs text-muted-foreground">to {record.endDate}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{record.petName}</div>
                          <div className="text-xs text-muted-foreground">{record.petType}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs">In: {record.checkInTime}</div>
                          <div className="text-xs">Out: {record.checkOutTime}</div>
                        </td>
                        <td className="px-4 py-3">
                          {record.type === "LongStay" ? "Long Stay (days)" : "Daycare (hours)"}
                        </td>
                        <td className="px-4 py-3">{record.duration}</td>
                        <td className="px-4 py-3 max-w-[200px] truncate" title={record.notes}>
                          {record.notes}
                        </td>
                        <td className="px-4 py-3 font-medium text-green-600 dark:text-green-400">
                          ₱{record.totalPrice.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-medium">{record.paymentStatus}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500 text-white">
                            Completed
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
              <div className="text-center">
                <CalendarDays className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No boarding history available</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* Bottom action buttons */}
      <div className="pt-4 border-t flex justify-between">
        <Button onClick={onAddPet} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Pet
        </Button>
        <Button
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950 dark:text-red-500 dark:hover:text-red-400"
          onClick={onDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Owner
        </Button>
      </div>
    </div>
  )
}
