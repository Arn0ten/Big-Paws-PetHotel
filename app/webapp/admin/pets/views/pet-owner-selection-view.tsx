/**
 * Pet Owner Selection View
 *
 * This view allows administrators to select a pet owner before adding a new pet.
 * It displays a list of pet owners on the left and details of the selected owner on the right.
 *
 * BACKEND INTEGRATION POINTS:
 * 1. Replace the sample data with API calls to fetch pet owners
 * 2. Implement search and filtering functionality with backend support
 * 3. Add pagination for large datasets
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  User,
  MapPin,
  Phone,
  Mail,
  Check,
  ArrowRight,
  Dog,
  Cat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/app/webapp/components/PageLayout";
import type { PetOwner } from "../utils/types";

interface PetOwnerSelectionViewProps {
  petOwners: PetOwner[];
  isLoading: boolean;
  onBack: () => void;
  onSelectOwner: (ownerId: string) => void;
}

export default function PetOwnerSelectionView({
  petOwners,
  isLoading,
  onBack,
  onSelectOwner,
}: PetOwnerSelectionViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [filteredOwners, setFilteredOwners] = useState<PetOwner[]>(petOwners);

  // Filter owners based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOwners(petOwners);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = petOwners.filter(
      (owner) =>
        owner.name.toLowerCase().includes(query) ||
        owner.email.toLowerCase().includes(query) ||
        owner.phone.includes(query),
    );
    setFilteredOwners(filtered);
  }, [searchQuery, petOwners]);

  // Select the first owner by default if none is selected
  useEffect(() => {
    if (filteredOwners.length > 0 && !selectedOwnerId) {
      setSelectedOwnerId(filteredOwners[0].id);
    }
  }, [filteredOwners, selectedOwnerId]);

  // Get the selected owner
  const selectedOwner = selectedOwnerId
    ? petOwners.find((owner) => owner.id === selectedOwnerId)
    : null;

  // Handle owner selection
  const handleSelectOwner = useCallback(() => {
    if (selectedOwnerId) {
      onSelectOwner(selectedOwnerId);
    }
  }, [selectedOwnerId, onSelectOwner]);

  return (
    <PageLayout title="Select Pet Owner" onBack={onBack}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left side - Owner list */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Pet Owners</CardTitle>
              <CardDescription>
                Select a pet owner for the new pet
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search owners..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 pb-4">
              {isLoading ? (
                // Loading skeleton
                <div className="space-y-3 px-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredOwners.length === 0 ? (
                // No results
                <div className="text-center py-8 px-4 text-muted-foreground">
                  <p>No pet owners found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              ) : (
                // Owner list
                <ScrollArea className="h-[350px] md:h-[400px] px-4">
                  <div className="space-y-1">
                    {filteredOwners.map((owner) => (
                      <button
                        key={owner.id}
                        className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors ${
                          selectedOwnerId === owner.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedOwnerId(owner.id)}
                      >
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage
                            src={owner.avatar || "/placeholder.svg"}
                            alt={owner.name}
                          />
                          <AvatarFallback className="rounded-md">
                            {owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{owner.name}</p>
                          <p
                            className={`text-sm truncate ${
                              selectedOwnerId === owner.id
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {owner.email}
                          </p>
                        </div>
                        {selectedOwnerId === owner.id && (
                          <Check className="h-4 w-4 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right side - Owner details */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            {isLoading || !selectedOwner ? (
              // Loading skeleton or no selection
              <div className="p-6 space-y-6">
                <Skeleton className="h-6 w-1/3" />
                <div className="space-y-4">
                  <Skeleton className="h-20 w-20 rounded-md mx-auto" />
                  <Skeleton className="h-5 w-1/2 mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Owner Details</CardTitle>
                  <CardDescription>
                    Review the details of the selected pet owner
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-2 rounded-md border-2 border-primary/20">
                      <AvatarImage
                        src={selectedOwner.avatar || "/placeholder.svg"}
                        alt={selectedOwner.name}
                        className="rounded-md"
                      />
                      <AvatarFallback className="text-lg rounded-md bg-primary/10 text-primary">
                        {selectedOwner.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">
                      {selectedOwner.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedOwner.pets.length} pet
                      {selectedOwner.pets.length !== 1 && "s"} registered
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground break-all">
                          {selectedOwner.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOwner.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOwner.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedOwner.pets.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">Current Pets</h4>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedOwner.pets.map((pet) => (
                          <div
                            key={pet.id}
                            className={`
                              flex items-center p-2 rounded-md text-sm shadow-sm transition-all hover:shadow
                              ${
                                pet.type === "Dog"
                                  ? "bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200"
                                  : "bg-purple-50 border border-purple-200 text-purple-800 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-200"
                              }
                            `}
                          >
                            {pet.type === "Dog" ? (
                              <Dog className="h-4 w-4 mr-2 flex-shrink-0" />
                            ) : (
                              <Cat className="h-4 w-4 mr-2 flex-shrink-0" />
                            )}
                            <span className="truncate font-medium">
                              {pet.name}
                            </span>
                            {pet.isBoarding && (
                              <span
                                className="ml-auto h-2 w-2 rounded-full bg-green-500"
                                title="Currently boarding"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleSelectOwner}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Select Owner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
