"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Hotel,
  Dog,
  Cat,
  Ruler,
  CalendarDays,
  User,
  FileText,
  Scissors,
  Clock,
  Camera,
  Video,
  Calendar,
  Plus,
  X,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import type { Pet } from "../utils/types"
import PageLayout from "@/app/webapp/components/PageLayout"
import { FaShieldDog, FaShieldCat } from "react-icons/fa6";

// Sample boarding history data
const sampleBoardingHistory = [
  {
    id: "bh1",
    type: "LongStay",
    startDate: "2023-11-01T08:00:00Z",
    endDate: "2023-11-05T17:00:00Z",
    status: "Completed",
    totalCost: 2000,
  },
  {
    id: "bh2",
    type: "Daycare",
    startDate: "2023-10-15T09:00:00Z",
    endDate: "2023-10-15T17:00:00Z",
    status: "Completed",
    totalCost: 240,
  },
  {
    id: "bh3",
    type: "LongStay",
    startDate: "2023-09-20T08:00:00Z",
    endDate: "2023-09-25T17:00:00Z",
    status: "Completed",
    totalCost: 2400,
  },
]

// Sample request history data
const sampleRequestHistory = [
  {
    id: "rh1",
    type: "Grooming",
    date: "2023-11-10T13:00:00Z",
    status: "Completed",
    notes: "Full grooming service with nail trimming",
    cost: 800,
  },
  {
    id: "rh2",
    type: "Photo",
    date: "2023-10-20T14:30:00Z",
    status: "Completed",
    notes: "Photo session during playtime",
    mediaUrl: "/images/pet-photos/sample-1.png",
  },
  {
    id: "rh3",
    type: "Video",
    date: "2023-10-05T11:00:00Z",
    status: "Completed",
    notes: "Video of pet playing in the yard",
    mediaUrl: "/videos/pet-videos/sample-video-1.mp4",
  },
  {
    id: "rh4",
    type: "BoardingExtension",
    date: "2023-09-23T09:00:00Z",
    status: "Completed",
    notes: "Extended stay by 2 days",
    extensionDays: 2,
    additionalCost: 800,
  },
]

interface PetDetailsViewProps {
  pet: Pet | null
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onBoardPet: () => void
  onEndBoarding: () => void
}

export default function EnhancedPetDetailsView({
  pet,
  onBack,
  onEdit,
  onDelete,
  onBoardPet,
  onEndBoarding,
}: PetDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("details")

  if (!pet) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Pet not found</h2>
          <p className="text-muted-foreground mt-2">The requested pet could not be found.</p>
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
    return format(date, "PPP")
  }

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "h:mm a")
  }

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "PPP 'at' h:mm a")
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <PageLayout title={`Pet Details: ${pet.name}`} onBack={onBack}>
      <div className="space-y-6">
        {/* Pet info card */}
        <Card>
          <CardContent className="p-0">
            <div className="flex flex-col h-full overflow-hidden">
              {/* Status banner */}
              {pet.isBoarding && (
                <div className="bg-green-100 dark:bg-green-900/30 p-3 text-center text-green-800 dark:text-green-300 font-medium border-b">
                  Currently Boarding
                </div>
              )}

              {/* Pet name and primary info */}
              <div className="p-4 flex justify-between items-start border-b">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={pet.image} alt={pet.name} />
                    <AvatarFallback className="bg-primary/10">
                      {pet.type === "Dog" ? (
                        <FaShieldDog className="h-8 w-8 text-primary" />
                      ) : (
                        <FaShieldCat className="h-8 w-8 text-primary" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{pet.name}</h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className={
                          pet.type === "Dog"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        }
                      >
                        {pet.type === "Dog" ? <FaShieldDog className="mr-1 h-3 w-3" /> : <FaShieldCat className="mr-1 h-3 w-3" />}
                        {pet.type}
                      </Badge>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {pet.breed}
                      </Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <User className="h-4 w-4 mr-1" />
                      <span>Owner: {pet.ownerName || "Unknown"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!pet.isBoarding ? (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={onBoardPet}>
                      <Hotel className="mr-1 h-3.5 w-3.5" />
                      Start Boarding
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 bg-red-50 hover:bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-400"
                      onClick={onEndBoarding}
                    >
                      <X className="mr-1 h-3.5 w-3.5" />
                      End Boarding
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={onEdit}>
                    <Edit className="mr-1 h-3.5 w-3.5" />
                    Edit Pet
                  </Button>
                </div>
              </div>

              {/* Tabs for different sections */}
              <div className="border-b">
                <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
                    <TabsTrigger value="details" className="rounded-none">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="boarding-history" className="rounded-none">
                      Boarding History
                    </TabsTrigger>
                    <TabsTrigger value="request-history" className="rounded-none">
                      Request History
                    </TabsTrigger>
                  </TabsList>

                  {/* Details Tab Content */}
                  <TabsContent value="details" className="p-0 m-0">
                    <div className="p-4 border-b">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                          <div className="text-sm text-muted-foreground mb-1">Size</div>
                          <div className="font-semibold flex items-center">
                            <Ruler className="h-4 w-4 mr-1 text-blue-500" />
                            {pet.size}
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                          <div className="text-sm text-muted-foreground mb-1">Age</div>
                          <div className="font-semibold flex items-center">
                            <CalendarDays className="h-4 w-4 mr-1 text-amber-500" />
                            {pet.age} {pet.age === 1 ? "Year" : "Years"}
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                          <div className="text-sm text-muted-foreground mb-1">Gender</div>
                          <div className="font-semibold flex items-center">
                            <User className="h-4 w-4 mr-1 text-purple-500" />
                            Male
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Additional Notes:</h3>
                        <p className="text-muted-foreground text-sm">
                          {pet.notes || "No additional notes available for this pet."}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Boarding History Tab Content */}
                  <TabsContent value="boarding-history" className="p-0 m-0">
                    <div className="p-4">
                      {sampleBoardingHistory.length > 0 ? (
                        <div className="space-y-4">
                          {sampleBoardingHistory.map((boarding) => (
                            <div key={boarding.id} className="border rounded-lg overflow-hidden">
                              <div
                                className={`px-4 py-3 flex justify-between items-center ${
                                  boarding.type === "LongStay"
                                    ? "bg-blue-50 dark:bg-blue-900/20 border-b"
                                    : "bg-amber-50 dark:bg-amber-900/20 border-b"
                                }`}
                              >
                                <div className="flex items-center">
                                  {boarding.type === "LongStay" ? (
                                    <Hotel className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                  ) : (
                                    <Clock className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                                  )}
                                  <span className="font-medium">
                                    {boarding.type === "LongStay" ? "Long Stay" : "Daycare"}
                                  </span>
                                </div>
                                <Badge className="bg-green-500 text-white">{boarding.status}</Badge>
                              </div>
                              <div className="p-4">
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Start Date</p>
                                    <p className="font-medium">
                                      {formatDate(boarding.startDate)}
                                      {boarding.type === "Daycare" && (
                                        <span className="text-sm text-muted-foreground ml-1">
                                          {formatTime(boarding.startDate)}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">End Date</p>
                                    <p className="font-medium">
                                      {formatDate(boarding.endDate)}
                                      {boarding.type === "Daycare" && (
                                        <span className="text-sm text-muted-foreground ml-1">
                                          {formatTime(boarding.endDate)}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Total Cost</span>
                                  <span className="font-bold text-primary">₱{boarding.totalCost.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                          <div className="text-center">
                            <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No boarding history available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Request History Tab Content */}
                  <TabsContent value="request-history" className="p-0 m-0">
                    <div className="p-4">
                      {sampleRequestHistory.length > 0 ? (
                        <div className="space-y-4">
                          {sampleRequestHistory.map((request) => (
                            <div key={request.id} className="border rounded-lg overflow-hidden">
                              <div className="px-4 py-3 flex justify-between items-center bg-muted/30 border-b">
                                <div className="flex items-center">
                                  {request.type === "Grooming" && (
                                    <Scissors className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                                  )}
                                  {request.type === "Photo" && (
                                    <Camera className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                  )}
                                  {request.type === "Video" && (
                                    <Video className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                                  )}
                                  {request.type === "BoardingExtension" && (
                                    <Plus className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                  )}
                                  <span className="font-medium">
                                    {request.type === "BoardingExtension" ? "Boarding Extension" : request.type}
                                  </span>
                                </div>
                                <Badge className="bg-green-500 text-white">{request.status}</Badge>
                              </div>
                              <div className="p-4">
                                <div className="mb-3">
                                  <p className="text-xs text-muted-foreground">Date</p>
                                  <p className="font-medium">{formatDateTime(request.date)}</p>
                                </div>

                                {request.notes && (
                                  <div className="mb-3">
                                    <p className="text-xs text-muted-foreground">Notes</p>
                                    <div className="flex items-start mt-1">
                                      <MessageSquare className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                                      <p className="text-sm">{request.notes}</p>
                                    </div>
                                  </div>
                                )}

                                {request.type === "BoardingExtension" && request.extensionDays && (
                                  <div className="mb-3">
                                    <p className="text-xs text-muted-foreground">Extension</p>
                                    <p className="text-sm">
                                      Extended by {request.extensionDays} {request.extensionDays === 1 ? "day" : "days"}
                                    </p>
                                  </div>
                                )}

                                {(request.type === "Photo" || request.type === "Video") && request.mediaUrl && (
                                  <div className="mb-3">
                                    <p className="text-xs text-muted-foreground">Media</p>
                                    {request.type === "Photo" ? (
                                      <div className="mt-2 rounded-md overflow-hidden border">
                                        <img
                                          src={request.mediaUrl || "/placeholder.svg"}
                                          alt="Pet photo"
                                          className="w-full h-auto object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="mt-2 rounded-md overflow-hidden border">
                                        <video src={request.mediaUrl} controls className="w-full h-auto" />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {(request.cost || request.additionalCost) && (
                                  <>
                                    <Separator className="my-3" />
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Cost</span>
                                      <span className="font-bold text-primary">
                                        ₱{(request.cost || request.additionalCost || 0).toLocaleString()}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                          <div className="text-center">
                            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No request history available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Delete Pet Button */}
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 dark:text-red-500 dark:hover:text-red-400 dark:hover:bg-red-950/50 dark:border-red-900/50"
                  size="lg"
                  onClick={onDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Pet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

