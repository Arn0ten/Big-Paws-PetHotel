"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dog,
  Cat,
  Edit,
  Hotel,
  CheckCircle2,
  Trash2,
  User,
  FileText,
  Calendar,
  Ruler,
  CalendarDays,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import type { PetOwner, Pet } from "../utils/types"
import PageLayout from "@/app/webapp/components/PageLayout"
import { getPetBoardingHistory, getPetRequestHistory } from "@/app/webapp/admin/data/pet-management-sample-data"

interface PetDetailsViewProps {
  pet: Pet | null
  owner: PetOwner | null
  onBack: () => void
  onEdit: () => void
  onBoard: () => void
  onEndBoarding: () => void
  onDelete: () => void
}

export default function PetDetailsView({
  pet,
  owner,
  onBack,
  onEdit,
  onBoard,
  onEndBoarding,
  onDelete,
}: PetDetailsViewProps) {
  if (!pet || !owner) return null

  // Get sample data for this specific pet
  const boardingHistory = getPetBoardingHistory(pet.id)
  const requestHistory = getPetRequestHistory(pet.id)

  const actions = (
    <>
      <Button variant="outline" onClick={onEdit}>
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>
      {!pet.isBoarding ? (
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onBoard}>
          <Hotel className="mr-2 h-4 w-4" />
          Board Pet
        </Button>
      ) : (
        <Button variant="destructive" onClick={onEndBoarding}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          End Boarding
        </Button>
      )}
    </>
  )

  return (
    <PageLayout title={`Pet Details: ${pet.name}`} onBack={onBack} actions={actions}>
      <div className="space-y-6">
        {/* Pet image and status */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
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
              <div className="flex flex-wrap gap-2 mb-2">
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
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="font-semibold flex items-center">
                  {pet.isBoarding ? (
                    <Badge className="bg-green-500 text-white">Boarding</Badge>
                  ) : (
                    <Badge className="bg-amber-500 text-white">Not Boarding</Badge>
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
              <p className="text-muted-foreground">{pet.notes || "No additional notes available for this pet."}</p>
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
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Boarding Date</th>
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
                  <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No boarding history available</p>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Request history tab content */}
          <TabsContent value="request-history" className="mt-2">
            {requestHistory.length > 0 ? (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Request Type</th>
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Date Requested</th>
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Description</th>
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Amount</th>
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Payment Status</th>
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Status</th>
                        <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestHistory.map((request) => (
                        <tr key={request.id} className="border-b hover:bg-muted/30">
                          <td className="px-4 py-3">
                            {request.type === "boarding-extension"
                              ? "Boarding Extension"
                              : request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                          </td>
                          <td className="px-4 py-3">{request.date}</td>
                          <td className="px-4 py-3 max-w-[200px] truncate" title={request.notes}>
                            {request.notes}
                          </td>
                          <td className="px-4 py-3 font-medium text-green-600 dark:text-green-400">
                            {request.price ? `₱${request.price.toLocaleString()}` : "-"}
                          </td>
                          <td className="px-4 py-3 font-medium">{request.paymentStatus}</td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                request.status === "completed"
                                  ? "bg-green-500 text-white"
                                  : request.status === "rejected"
                                    ? "bg-red-500 text-white"
                                    : "bg-amber-500 text-white"
                              }
                            >
                              {/* {request.status === "completed" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : request.status === "rejected" ? (
                                <XCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )} */}
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => {
                                console.log(`Navigate to request details for ID: ${request.id}`)
                              }}
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
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
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No request history available</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Delete Pet Button - Less prominent */}
        <div className="pt-4 border-t flex justify-end">
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950 dark:text-red-500 dark:hover:text-red-400"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Pet
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
