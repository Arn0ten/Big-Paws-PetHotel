"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestCard } from "./components/request-card"
import { RequestDialog } from "./components/request-dialog"

// Sample data - in a real app, this would come from an API
const initialRequests = [
  {
    id: "REQ-001",
    petOwner: "John Smith",
    petName: "Buddy",
    service: "Boarding",
    startDate: "2023-11-01",
    endDate: "2023-11-05",
    status: "new",
    totalAmount: 125.0,
    createdAt: "2023-10-25T10:30:00Z",
    updatedAt: "2023-10-25T10:30:00Z",
  },
  {
    id: "REQ-002",
    petOwner: "Sarah Johnson",
    petName: "Luna",
    service: "Daycare",
    startDate: "2023-11-02",
    endDate: "2023-11-02",
    status: "in-progress",
    totalAmount: 35.0,
    createdAt: "2023-10-26T14:15:00Z",
    updatedAt: "2023-10-27T09:45:00Z",
  },
  {
    id: "REQ-003",
    petOwner: "Michael Brown",
    petName: "Max",
    service: "Boarding + Grooming",
    startDate: "2023-10-28",
    endDate: "2023-11-03",
    status: "completed",
    totalAmount: 185.0,
    createdAt: "2023-10-20T08:00:00Z",
    updatedAt: "2023-11-03T16:30:00Z",
  },
  {
    id: "REQ-004",
    petOwner: "Emily Davis",
    petName: "Bella",
    service: "Grooming",
    startDate: "2023-11-04",
    endDate: "2023-11-04",
    status: "rejected",
    totalAmount: 45.0,
    createdAt: "2023-10-30T11:20:00Z",
    updatedAt: "2023-10-31T13:10:00Z",
  },
]

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewedRequests, setViewedRequests] = useState<string[]>([])

  // Track which requests have been viewed to determine which are "new"
  useEffect(() => {
    // In a real app, you would load this from localStorage or a database
    const storedViewedRequests = localStorage.getItem("viewedRequests")
    if (storedViewedRequests) {
      setViewedRequests(JSON.parse(storedViewedRequests))
    }
  }, [])

  // Save viewed requests to localStorage when updated
  useEffect(() => {
    if (viewedRequests.length > 0) {
      localStorage.setItem("viewedRequests", JSON.stringify(viewedRequests))
    }
  }, [viewedRequests])

  const handleRequestClick = (request: any) => {
    setSelectedRequest(request)
    setIsDialogOpen(true)

    // Mark this request as viewed
    if (!viewedRequests.includes(request.id)) {
      setViewedRequests((prev) => [...prev, request.id])
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedRequest(null)
  }

  const handleStatusChange = (id: string, status: string, additionalServices: string[] = [], extendedDays = 0) => {
    // Calculate additional cost
    let additionalCost = 0
    additionalServices.forEach((service) => {
      switch (service) {
        case "grooming":
          additionalCost += 30
          break
        case "training":
          additionalCost += 45
          break
        case "special-diet":
          additionalCost += 20
          break
      }
    })
    additionalCost += extendedDays * 25

    // Update the request
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const updatedRequest = {
            ...req,
            status,
            updatedAt: new Date().toISOString(),
            totalAmount: status === "completed" ? req.totalAmount + additionalCost : req.totalAmount,
          }
          return updatedRequest
        }
        return req
      }),
    )
  }

  // Filter requests by status
  const newRequests = requests.filter((req) => req.status === "new")
  const inProgressRequests = requests.filter((req) => req.status === "in-progress")
  const completedRequests = requests.filter((req) => req.status === "completed")
  const rejectedRequests = requests.filter((req) => req.status === "rejected")

  // Check if a request is new/unviewed or recently updated
  const isRequestNew = (request: any) => {
    return (
      !viewedRequests.includes(request.id) ||
      new Date(request.updatedAt).getTime() > new Date(Date.now() - 24 * 60 * 60 * 1000).getTime()
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Request Management</h1>

      <Tabs defaultValue="new">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="new" className="relative">
            New
            {newRequests.some(isRequestNew) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="relative">
            In Progress
            {inProgressRequests.some(isRequestNew) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="relative">
            Completed
            {completedRequests.some(isRequestNew) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected" className="relative">
            Rejected
            {rejectedRequests.some(isRequestNew) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onClick={() => handleRequestClick(request)}
                isNew={isRequestNew(request)}
              />
            ))}
            {newRequests.length === 0 && (
              <p className="text-gray-500 col-span-3 text-center py-8">No new requests found.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onClick={() => handleRequestClick(request)}
                isNew={isRequestNew(request)}
              />
            ))}
            {inProgressRequests.length === 0 && (
              <p className="text-gray-500 col-span-3 text-center py-8">No in-progress requests found.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onClick={() => handleRequestClick(request)}
                isNew={isRequestNew(request)}
              />
            ))}
            {completedRequests.length === 0 && (
              <p className="text-gray-500 col-span-3 text-center py-8">No completed requests found.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onClick={() => handleRequestClick(request)}
                isNew={isRequestNew(request)}
              />
            ))}
            {rejectedRequests.length === 0 && (
              <p className="text-gray-500 col-span-3 text-center py-8">No rejected requests found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedRequest && (
        <RequestDialog
          request={selectedRequest}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}

