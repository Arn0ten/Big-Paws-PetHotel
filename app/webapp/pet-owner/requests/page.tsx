"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Camera, Video, Scissors, Clock, FileText, Plus, Search, Filter, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Utility function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const [requests, setRequests] = useState([
    {
      id: "req-001",
      type: "photo",
      petName: "Max",
      petId: "pet-1",
      status: "completed",
      createdAt: "2025-03-10T10:30:00Z",
      completedAt: "2025-03-10T14:45:00Z",
      description: "Would love to see how Max is doing today!",
      mediaFiles: {
        type: "photo",
        urls: ["/placeholder.svg?height=300&width=400"],
        count: 1,
      },
    },
    {
      id: "req-002",
      type: "grooming",
      petName: "Max",
      petId: "pet-1",
      status: "in-progress",
      createdAt: "2025-03-11T09:15:00Z",
      description: "Please give Max a bath and trim his nails.",
      groomingService: "premium-wash-and-cut",
      price: 45,
    },
    {
      id: "req-003",
      type: "boarding-extension",
      petName: "Max",
      petId: "pet-1",
      status: "new",
      createdAt: "2025-03-12T11:30:00Z",
      description: "Need to extend Max's stay by 2 more days.",
      extensionDetails: {
        duration: "2",
        unit: "days",
      },
      currentEndDate: "2025-03-15T18:00:00Z",
    },
    {
      id: "req-004",
      type: "video",
      petName: "Max",
      petId: "pet-1",
      status: "rejected",
      createdAt: "2025-03-07T16:20:00Z",
      rejectedAt: "2025-03-07T18:45:00Z",
      description: "Would like a short video of Max playing.",
      rejectedBy: "Admin",
      rejectionReason:
        "We're unable to record a video at this time as Max is resting. We can try again tomorrow if you'd like.",
    },
    {
      id: "req-005",
      type: "custom",
      petName: "Luna",
      petId: "pet-2",
      status: "completed",
      createdAt: "2025-03-05T13:25:00Z",
      completedAt: "2025-03-05T16:40:00Z",
      description: "Can you please check if Luna is eating properly? She sometimes gets picky with her food.",
    },
  ])

  // Get request type icon
  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Camera className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "grooming":
        return <Scissors className="h-5 w-5" />
      case "boarding-extension":
        return <Clock className="h-5 w-5" />
      case "custom":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Get request type label
  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "photo":
        return "Photo Update"
      case "video":
        return "Video Request"
      case "grooming":
        return "Grooming Service"
      case "boarding-extension":
        return "Boarding Extension"
      case "custom":
        return "Custom Request"
      default:
        return "Request"
    }
  }

  // Get request status badge
  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            New
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter requests based on active tab, search query, and filter type
  const filteredRequests = requests.filter((request) => {
    // Filter by tab
    if (activeTab !== "all" && request.status !== activeTab) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!request.petName.toLowerCase().includes(query) && !request.description.toLowerCase().includes(query)) {
        return false
      }
    }

    // Filter by request type
    if (filterType !== "all" && request.type !== filterType) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
            <p className="text-muted-foreground">View and manage your requests</p>
          </div>
          <Link href="/webapp/pet-owner/requests/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              <SelectValue placeholder="All Types" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="photo">Photos</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="grooming">Grooming</SelectItem>
            <SelectItem value="boarding-extension">Extensions</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 h-9">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="new" className="text-xs">
              New
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="text-xs">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs">
              Rejected
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No requests found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "all"
                    ? "You haven't made any requests yet."
                    : `You don't have any ${activeTab} requests.`}
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/webapp/pet-owner/requests/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Link>
                </Button>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <Link href={`/webapp/pet-owner/requests/${request.id}`} key={request.id}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                          p-2 rounded-full flex-shrink-0
                          ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                          ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                          ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                          ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                          ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
                        `}
                        >
                          {getRequestTypeIcon(request.type)}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{getRequestTypeLabel(request.type)}</h3>
                            <div className="flex items-center gap-2">
                              {getRequestStatusBadge(request.status)}
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mt-1">For {request.petName}</p>
                          <p className="text-sm line-clamp-2 mt-1">{request.description}</p>

                          <p className="text-xs text-muted-foreground mt-2">
                            {request.status === "completed"
                              ? `Completed ${formatDate(request.completedAt || "")}`
                              : request.status === "rejected"
                                ? `Rejected ${formatDate(request.rejectedAt || "")}`
                                : `Requested ${formatDate(request.createdAt)}`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

