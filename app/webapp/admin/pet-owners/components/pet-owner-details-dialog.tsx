"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Users, Edit, Trash2, PlusCircle, Hotel, Dog, Cat } from "lucide-react"
import type { PetOwner, Pet } from "../utils/types"

export interface PetOwnerDetailsDialogProps {
  owner: PetOwner | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onEditOwner: (id: string) => void
  onDeleteOwner: (id: string) => void
  onAddPet: (id: string) => void
  onBoardPet: (id: string) => void
  onPetClick: (pet: Pet) => void
}

export function PetOwnerDetailsDialog({
  owner,
  isOpen,
  onOpenChange,
  onEditOwner,
  onDeleteOwner,
  onAddPet,
  onBoardPet,
  onPetClick,
}: PetOwnerDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("contact")

  if (!owner) return null

  const boardingPetsCount = owner.pets.filter((pet) => pet.isBoarding).length

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-0 overflow-hidden max-h-[90vh] rounded-xl">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with title and close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Pet Owner Profile
            </DialogTitle>
            <Button variant="outline" size="sm" className="h-8" onClick={() => onEditOwner(owner.id)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {/* Owner profile section */}
            <div className="p-4 flex flex-col items-center border-b">
              <Avatar className="h-24 w-24 border-2 border-primary/20 mb-3">
                <AvatarImage src={owner.avatar} alt={owner.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {owner.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-2xl font-bold mb-2">{owner.name}</h2>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <Users className="h-3 w-3" />
                  {owner.pets.length} {owner.pets.length === 1 ? "Pet" : "Pets"}
                </Badge>

                {boardingPetsCount > 0 && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1"
                  >
                    <Hotel className="h-3 w-3" />
                    {boardingPetsCount} Boarding
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 w-full">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onAddPet(owner.id)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Pet
                </Button>
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => onBoardPet(owner.id)}
                >
                  <Hotel className="mr-2 h-4 w-4" />
                  Board Pet
                </Button>
              </div>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
                <TabsTrigger value="contact" className="rounded-none">
                  Contact Info
                </TabsTrigger>
                <TabsTrigger value="pets" className="rounded-none">
                  Pets
                </TabsTrigger>
                <TabsTrigger value="boarding-history" className="rounded-none">
                  Boarding
                </TabsTrigger>
                <TabsTrigger value="request-history" className="rounded-none">
                  Requests
                </TabsTrigger>
              </TabsList>

              {/* Contact Information Tab */}
              <TabsContent value="contact" className="p-0 m-0">
                <div className="p-4 border-b">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 rounded-lg border">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm">{owner.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 rounded-lg border">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                        <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm">{owner.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start p-3 rounded-lg border">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mt-0.5">
                        <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm">{owner.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Pets Tab */}
              <TabsContent value="pets" className="p-0 m-0">
                {owner.pets.length > 0 ? (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Pets ({owner.pets.length})</h3>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {owner.pets.map((pet) => (
                        <div
                          key={pet.id}
                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => onPetClick(pet)}
                        >
                          <Avatar className="h-12 w-12 border">
                            <AvatarImage src={pet.image} alt={pet.name} />
                            <AvatarFallback className="bg-primary/10">
                              {pet.type === "Dog" ? (
                                <Dog className="h-5 w-5 text-blue-500" />
                              ) : (
                                <Cat className="h-5 w-5 text-purple-500" />
                              )}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <p className="font-medium">{pet.name}</p>
                              {pet.isBoarding && (
                                <Badge className="ml-2 bg-green-500 text-white text-xs">Boarding</Badge>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{pet.breed}</span>
                              <span className="mx-1">•</span>
                              <span>
                                {pet.age} {pet.age === 1 ? "year" : "years"}
                              </span>
                              <span className="mx-1">•</span>
                              <span>{pet.size}</span>
                            </div>
                          </div>

                          {pet.type === "Dog" ? (
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              <Dog className="h-3 w-3 mr-1" />
                              Dog
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                            >
                              <Cat className="h-3 w-3 mr-1" />
                              Cat
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                      <div className="text-center">
                        <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No pets registered</p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => onAddPet(owner.id)}>
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add Pet
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Boarding History Tab */}
              <TabsContent value="boarding-history" className="p-0 m-0">
                <div className="p-4">
                  <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                    <div className="text-center">
                      <p className="text-muted-foreground">No boarding history available</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Request History Tab */}
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

            {/* Delete Owner Button */}
            <div className="p-4">
              <Button
                variant="destructive"
                className="w-full justify-start bg-red-600 hover:bg-red-700 text-white"
                size="lg"
                onClick={() => onDeleteOwner(owner.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Owner
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

