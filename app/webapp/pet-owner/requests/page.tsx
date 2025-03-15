"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PetOwnerHeader } from "../../components/pet-owner/Header"
import { PetOwnerFooter } from "../../components/pet-owner/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, AlertCircle } from "lucide-react"
import RequestForm from "./components/request-form"
import RequestCard from "./components/request-card"
import MobileNavbar from "./components/mobile-navbar"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"

// Sample data for demonstration
const sampleRequests = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    status: "pending",
    createdAt: "2025-03-10T10:30:00Z",
    description: "Would love to see how Max is doing today!",
  },
  {
    id: "req-002",
    type: "grooming",
    petName: "Bella",
    status: "approved",
    createdAt: "2025-03-09T14:15:00Z",
    description: "Please give Bella a bath and trim her nails.",
    inProgress: true,
  },
  {
    id: "req-003",
    type: "boarding-extension",
    petName: "Charlie",
    status: "completed",
    createdAt: "2025-03-08T09:45:00Z",
    description: "Need to extend Charlie's stay by 2 more days.",
    completedAt: "2025-03-08T11:30:00Z",
  },
  {
    id: "req-004",
    type: "video",
    petName: "Luna",
    status: "rejected",
    createdAt: "2025-03-07T16:20:00Z",
    description: "Would like a short video of Luna playing.",
    rejectionReason: "Staff unavailable for video at the moment.",
  },
]

export default function PetOwnerRequestsPage() {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [requests, setRequests] = useState(sampleRequests)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleSubmitRequest = (requestData: any) => {
    // In a real app, this would send the data to an API
    const newRequest = {
      id: `req-${Math.floor(Math.random() * 1000)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...requestData,
    }

    setRequests([newRequest, ...requests])
    setShowRequestForm(false)

    toast({
      title: "Request Submitted",
      description: "Your request has been submitted and is pending approval.",
      duration: 5000,
    })
  }

  const filteredRequests = requests.filter((request) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return request.status === "pending" || request.status === "approved"
    if (activeTab === "completed") return request.status === "completed"
    if (activeTab === "rejected") return request.status === "rejected"
    return true
  })

  const getStatusCount = (status: string) => {
    return requests.filter((req) => {
      if (status === "active") return req.status === "pending" || req.status === "approved"
      return req.status === status
    }).length
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PetOwnerHeader />

      <main className="flex-1 container py-6 px-4 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
            <p className="text-muted-foreground mt-1">Request services for your pets during their stay</p>
          </div>

          <Button
            onClick={() => setShowRequestForm(true)}
            className="mt-4 md:mt-0 bg-primary hover:bg-primary/90"
            size={isMobile ? "sm" : "default"}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {showRequestForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RequestForm onSubmit={handleSubmitRequest} onCancel={() => setShowRequestForm(false)} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4 overflow-x-auto">
                  <TabsList className="h-10">
                    <TabsTrigger value="all" className="px-3 py-1.5">
                      All
                      <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                        {requests.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="active" className="px-3 py-1.5">
                      Active
                      <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                        {getStatusCount("active")}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="px-3 py-1.5">
                      Completed
                      <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                        {getStatusCount("completed")}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="px-3 py-1.5">
                      Rejected
                      <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                        {getStatusCount("rejected")}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  {requests.length === 0 ? (
                    <EmptyState onNewRequest={() => setShowRequestForm(true)} />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredRequests.map((request) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <RequestCard request={request} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="active" className="mt-0">
                  {filteredRequests.length === 0 ? (
                    <EmptyState message="No active requests found" onNewRequest={() => setShowRequestForm(true)} />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredRequests.map((request) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <RequestCard request={request} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="mt-0">
                  {filteredRequests.length === 0 ? (
                    <EmptyState message="No completed requests found" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredRequests.map((request) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <RequestCard request={request} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="rejected" className="mt-0">
                  {filteredRequests.length === 0 ? (
                    <EmptyState message="No rejected requests found" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredRequests.map((request) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <RequestCard request={request} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {isMobile && <MobileNavbar />}
      <PetOwnerFooter />
    </div>
  )
}

function EmptyState({ message = "No requests found", onNewRequest }: { message?: string; onNewRequest?: () => void }) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{message}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 mb-4">Create a new request to see it here</p>
        {onNewRequest && (
          <Button onClick={onNewRequest}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

