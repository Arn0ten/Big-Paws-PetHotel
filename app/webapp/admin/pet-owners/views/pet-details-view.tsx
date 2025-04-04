"use client";

import { useState } from "react";
import { ArrowLeft, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PetOwner, Pet } from "../utils/types";
import { useRouter } from "next/navigation";
import {
  Dog,
  Cat,
  Hotel,
  CheckCircle2,
  Trash2,
  FileText,
  Calendar,
  Ruler,
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Scissors,
  Camera,
  Video,
  CalendarPlus,
} from "lucide-react";
import PageLayout from "@/app/webapp/components/PageLayout";

interface PetDetailsViewProps {
  pet: Pet | null;
  owner: PetOwner | null;
  onBack: () => void;
  onEdit: () => void;
  onBoard: () => void;
  onEndBoarding: () => void;
  onDelete: () => void;
}

export default function PetOwnerDetailsView({
  owner,
  onBack,
  onEdit,
  onDelete,
  onAddPet,
  onBoardPet,
  onPetClick,
}: any) {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  if (!owner) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Pet owner not found</h2>
          <p className="text-muted-foreground mt-2">
            The requested pet owner could not be found.
          </p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Count active boardings
  const activeBoardings = owner.pets.filter((pet) => pet.isBoarding).length;

  const pet = owner.pets[0];

  // Replace the sample boarding history data with more comprehensive data that includes both long-stay and daycare
  const boardingHistory = [
    {
      id: "bh1",
      startDate: "2023-12-15",
      endDate: "2023-12-20",
      duration: "5 days",
      status: "completed",
      type: "LongStay",
      notes: "Regular diet, daily walks, no issues reported",
      totalPrice: 2400,
    },
    {
      id: "bh2",
      startDate: "2023-10-03",
      endDate: "2023-10-10",
      duration: "7 days",
      status: "completed",
      type: "LongStay",
      notes: "Special diet required, medication administered twice daily",
      totalPrice: 3360,
    },
    {
      id: "bh3",
      startDate: "2023-11-25",
      endDate: "2023-11-25",
      duration: "8 hours",
      status: "completed",
      type: "Daycare",
      notes: "Socialized well with other pets, enjoyed playtime",
      totalPrice: 240,
    },
  ];

  // Replace the sample request history data with standardized request types
  const requestHistory = [
    {
      id: "rq1",
      date: "2024-01-05",
      type: "grooming",
      status: "completed",
      notes: "Full grooming service with nail trimming",
      price: 450,
    },
    {
      id: "rq2",
      date: "2023-11-20",
      type: "photo",
      status: "completed",
      notes: "Daily photo update requested by owner",
      mediaUrl: "/images/pet-photos/sample-1.png",
    },
    {
      id: "rq3",
      date: "2023-09-15",
      type: "video",
      status: "completed",
      notes: "Video of playtime activities",
      mediaUrl: "/videos/pet-videos/sample-video-1.mp4",
    },
    {
      id: "rq4",
      date: "2023-08-10",
      type: "boarding-extension",
      status: "completed",
      notes: "Extended boarding by 2 days",
      extensionDetails: {
        duration: "2",
        unit: "days",
        currentEndDate: "2023-08-10",
        newEndDate: "2023-08-12",
      },
      price: 800,
    },
    {
      id: "rq5",
      date: "2023-07-05",
      type: "custom",
      status: "rejected",
      notes: "Special food request - not available",
    },
  ];

  const actions = (
    <>
      <Button variant="outline" onClick={onEdit}>
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>
      {!pet.isBoarding ? (
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={onBoardPet}
        >
          <Hotel className="mr-2 h-4 w-4" />
          Board Pet
        </Button>
      ) : (
        <Button variant="destructive" onClick={onBoardPet}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          End Boarding
        </Button>
      )}
    </>
  );

  return (
    <PageLayout
      title={`Pet Details: ${pet.name}`}
      onBack={onBack}
      actions={actions}
    >
      <div className="space-y-6">
        {/* Pet image and status */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {pet.image ? (
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  {pet.type === "Dog" ? (
                    <Dog className="h-16 w-16 mb-2" />
                  ) : (
                    <Cat className="h-16 w-16 mb-2" />
                  )}
                  <span>No image available</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            {/* Status banner */}
            {pet.isBoarding && (
              <div className="bg-green-100 dark:bg-green-900/30 p-3 text-center text-green-800 dark:text-green-300 font-medium rounded-md">
                Currently Boarding
              </div>
            )}

            {/* Pet name and primary info */}
            <div>
              <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
              {/* Update the pet type badge in the pet details section to match the table design */}
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge
                  className={
                    pet.type === "Dog"
                      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                      : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600"
                  }
                >
                  {pet.type === "Dog" ? (
                    <Dog className="mr-1 h-3 w-3" />
                  ) : (
                    <Cat className="mr-1 h-3 w-3" />
                  )}
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

            {/* Pet details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-sm text-muted-foreground mb-1">Size</div>
                <div className="font-semibold flex items-center">
                  {/* <Ruler className="h-4 w-4 mr-1 text-blue-500" /> */}
                  {pet.size}
                </div>
              </div>
              <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-sm text-muted-foreground mb-1">Age</div>
                <div className="font-semibold flex items-center">
                  {/* <CalendarDays className="h-4 w-4 mr-1 text-amber-500" /> */}
                  {pet.age} {pet.age === 1 ? "Year" : "Years"}
                </div>
              </div>
              <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="font-semibold flex items-center">
                  {pet.isBoarding ? (
                    <Badge className="bg-green-500 text-white">Boarding</Badge>
                  ) : (
                    <Badge className="bg-amber-500 text-white">
                      Not Boarding
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-4 p-4 border rounded-md bg-muted/20">
              <h3 className="font-semibold mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Additional Notes:
              </h3>
              <p className="text-muted-foreground">
                {pet.notes || "No additional notes available for this pet."}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for history sections */}
        <Tabs defaultValue="boarding-history" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="boarding-history">Boarding History</TabsTrigger>
            <TabsTrigger value="request-history">Request History</TabsTrigger>
          </TabsList>

          {/* Boarding history tab content */}
          <TabsContent value="boarding-history" className="mt-2">
            {boardingHistory.length > 0 ? (
              <div className="space-y-3">
                {boardingHistory.map((record) => (
                  <Card key={record.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <CardTitle className="text-base">
                            {record.startDate}{" "}
                            {record.startDate !== record.endDate
                              ? `to ${record.endDate}`
                              : ""}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              record.type === "LongStay"
                                ? "bg-blue-500 text-white"
                                : "bg-amber-500 text-white"
                            }
                          >
                            {record.type === "LongStay" ? (
                              <Hotel className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {record.type}
                          </Badge>
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="flex justify-between mt-1">
                        <span>Duration: {record.duration}</span>
                        <span className="font-medium">
                          ₱{record.totalPrice.toLocaleString()}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="text-sm">{record.notes}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                <div className="text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    No boarding history available
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Request history tab content */}
          <TabsContent value="request-history" className="mt-2">
            {requestHistory.length > 0 ? (
              <div className="space-y-3">
                {requestHistory.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {request.type === "grooming" && (
                            <Scissors className="h-4 w-4 mr-2 text-violet-500" />
                          )}
                          {request.type === "photo" && (
                            <Camera className="h-4 w-4 mr-2 text-blue-500" />
                          )}
                          {request.type === "video" && (
                            <Video className="h-4 w-4 mr-2 text-red-500" />
                          )}
                          {request.type === "boarding-extension" && (
                            <CalendarPlus className="h-4 w-4 mr-2 text-green-500" />
                          )}
                          {request.type === "custom" && (
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          )}
                          <CardTitle className="text-base capitalize">
                            {request.type === "boarding-extension"
                              ? "Boarding Extension"
                              : request.type}
                          </CardTitle>
                        </div>
                        <Badge
                          className={
                            request.status === "completed"
                              ? "bg-green-500 text-white"
                              : request.status === "rejected"
                                ? "bg-red-500 hover:bg-red-400 text-white"
                                : "bg-amber-500 text-white"
                          }
                        >
                          {request.status === "completed" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : request.status === "rejected" ? (
                            <XCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="flex justify-between mt-1">
                        <span>Date: {request.date}</span>
                        {request.price && (
                          <span className="font-medium">
                            ₱{request.price.toLocaleString()}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="text-sm">{request.notes}</p>

                      {/* Show media preview if available */}
                      {request.mediaUrl && (
                        <div className="mt-2 border rounded-md overflow-hidden">
                          {request.type === "photo" ? (
                            <img
                              src={request.mediaUrl || "/placeholder.svg"}
                              alt="Pet photo"
                              className="w-full h-auto max-h-40 object-cover"
                            />
                          ) : request.type === "video" ? (
                            <video
                              src={request.mediaUrl}
                              controls
                              className="w-full h-auto max-h-40"
                              poster="/placeholder.svg?height=200&width=320"
                            />
                          ) : null}
                        </div>
                      )}

                      {/* Show extension details if available */}
                      {request.extensionDetails && (
                        <div className="mt-2 text-sm bg-muted/20 p-2 rounded-md">
                          <p>
                            Extended by: {request.extensionDetails.duration}{" "}
                            {request.extensionDetails.unit}
                          </p>
                          <p>
                            New end date: {request.extensionDetails.newEndDate}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 border rounded-md bg-muted/30">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    No request history available
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Delete Pet Button - Less prominent */}
        <div className="pt-4 border-t flex justify-end">
          <Button
            variant="outline"
            className="bg-red-600 hover:bg-red-700 text-white"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Pet
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
