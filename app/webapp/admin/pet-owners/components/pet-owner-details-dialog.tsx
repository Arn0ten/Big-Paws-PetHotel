"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Users,
  Edit,
  Trash2,
  PlusCircle,
  Hotel,
  Dog,
  Cat,
} from "lucide-react";
import type { PetOwner, Pet } from "../utils/types";

export interface PetOwnerDetailsDialogProps {
  owner: PetOwner | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditOwner: (id: string) => void;
  onDeleteOwner: (id: string) => void;
  onAddPet: (id: string) => void;
  onBoardPet: (id: string) => void;
  onPetClick: (pet: Pet) => void;
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
  if (!owner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Pet Owner Details
          </DialogTitle>
          <DialogDescription>
            Detailed information about {owner.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={owner.avatar} alt={owner.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {owner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold">{owner.name}</h3>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-primary/10 text-primary"
                >
                  <Users className="h-3 w-3" />
                  {owner.pets.length} {owner.pets.length === 1 ? "Pet" : "Pets"}
                </Badge>

                {owner.pets.some((pet) => pet.isBoarding) && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    <Hotel className="h-3 w-3" />
                    {owner.pets.filter((pet) => pet.isBoarding).length} Boarding
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{owner.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">{owner.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg border">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mt-0.5">
                <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm">{owner.address}</p>
              </div>
            </div>
          </div>

          {owner.pets.length > 0 && (
            <>
              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Pets ({owner.pets.length})
                </h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {owner.pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => onPetClick(pet)}
                    >
                      <Avatar className="h-10 w-10 border">
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
                            <Badge className="ml-2 bg-green-500 text-white text-xs">
                              Boarding
                            </Badge>
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
            </>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-primary/20 hover:bg-primary/10 hover:text-primary"
              onClick={() => onEditOwner(owner.id)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Owner
            </Button>

            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-red-300 bg-red-50 hover:bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-400"
              onClick={() => onDeleteOwner(owner.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Owner
            </Button>

            <Button
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onAddPet(owner.id)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Pet
            </Button>

            <Button
              className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => onBoardPet(owner.id)}
            >
              <Hotel className="mr-2 h-4 w-4" />
              Board Pet
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
