"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dog, Cat, Edit, Hotel, CheckCircle2, Trash2, User, FileText, X, Ruler, CalendarDays } from "lucide-react"
import type { Pet, PetOwner } from "../utils/types"

interface PetDetailsDialogProps {
  pet: Pet | null
  petOwners: PetOwner[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onEditPet?: (pet: Pet) => void
  onBoardPet?: (pet: Pet) => void
  onEndBoarding?: (pet: Pet) => void
  onDeletePet?: (pet: Pet) => void
}

export function PetDetailsDialog({
  pet,
  petOwners,
  isOpen,
  onOpenChange,
  onEditPet,
  onBoardPet,
  onEndBoarding,
  onDeletePet,
}: PetDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details")

  if (!pet) return null

  // Find pet owner
  const owner = petOwners.find((o) => o.id === pet.ownerId)

  // Get default image based on pet type if no image is provided
  const getDefaultImage = () => {
    return pet.type === "Dog" ? "/images/dog.png" : "/images/cat.png"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-0 overflow-hidden max-h-[90vh] rounded-xl">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with title and close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {pet.type === "Dog" ? (
                <Dog className="h-5 w-5 text-blue-500" />
              ) : (
                <Cat className="h-5 w-5 text-purple-500" />
              )}
              Pet Profile
            </DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8" onClick={() => onEditPet?.(pet)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {/* Pet image */}
            <div className="p-4 border-b">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {pet.image ? (
                  <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    {pet.type === "Dog" ? <Dog className="h-16 w-16 mb-2" /> : <Cat className="h-16 w-16 mb-2" />}
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status banner */}
            {pet.isBoarding && (
              <div className="bg-green-100 dark:bg-green-900/30 p-3 text-center text-green-800 dark:text-green-300 font-medium border-b">
                Currently Boarding
              </div>
            )}

            {/* Pet name and primary info */}
            <div className="p-4 flex justify-between items-start border-b">
              <div>
                <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {pet.type}
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {pet.breed}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>Owner: {owner?.name || "Unknown"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {!pet.isBoarding ? (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => onBoardPet?.(pet)}
                  >
                    <Hotel className="mr-1 h-3.5 w-3.5" />
                    Start Boarding
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => onEndBoarding?.(pet)}
                  >
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    End Boarding
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  Request (0)
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
                    <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                      <div className="text-center">
                        <p className="text-muted-foreground">No boarding history available</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Request History Tab Content */}
                <TabsContent value="request-history" className="p-0 m-0">
                  <div className="p-4">
                    <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                      <div className="text-center">
                        <p className="text-muted-foreground">No request history available</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Delete Pet Button */}
            <div className="p-4">
              <Button
                variant="destructive"
                className="w-full justify-start bg-red-600 hover:bg-red-700 text-white"
                size="lg"
                onClick={() => onDeletePet?.(pet)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Pet
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

