"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JSX } from "react/jsx-runtime"

interface RecentActivityTabsProps {
  requests: any[]
  petOwners: any[]
}

export function RecentActivityTabs({ requests = [], petOwners = [] }: RecentActivityTabsProps) {
  /**
   * BACKEND INTEGRATION POINT: Recent Activity Data
   *
   * This component displays recent requests and new pet owner registrations.
   *
   * API Endpoint: /api/admin/recent-activity
   * Method: GET
   * Query Parameters:
   *   - type: "requests" | "petOwners" | "all" (optional, defaults to "all")
   *   - limit: number (optional, defaults to 5)
   *
   * Response Format:
   * {
   *   recentRequests: [
   *     { id: 1, ownerName: "John Doe", petName: "Buddy", petType: "dog", service: "Boarding", date: "2023-06-15", status: "Confirmed" },
   *     ...
   *   ],
   *   newPetOwners: [
   *     { id: 1, name: "John Doe", email: "john.doe@example.com", pets: 2, lastVisit: "2023-06-10" },
   *     ...
   *   ]
   * }
   *
   * Update Frequency: Real-time or polling (every 5-15 minutes)
   *
   * Implementation Notes:
   * 1. Consider implementing real-time updates using WebSockets
   * 2. Add ability to filter by status or date
   * 3. Add pagination for viewing more entries
   * 4. Add ability to click through to detailed views
   */

  // Default pet avatars
  const DEFAULT_DOG_AVATAR = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop"
  const DEFAULT_CAT_AVATAR =
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop"

  // Helper function to get pet avatar based on type
  const getPetAvatar = (petType: string) => {
    if (petType.toLowerCase() === "cat") return DEFAULT_CAT_AVATAR
    return DEFAULT_DOG_AVATAR
  }

  // Update the getRequestStatusBadge function to use solid backgrounds
  interface RequestStatusBadgeProps {
    status: "Confirmed" | "Pending" | string;
  }

  const getRequestStatusBadge = (status: RequestStatusBadgeProps["status"]): JSX.Element => {
    switch (status) {
      case "Confirmed":
        return <span className="rounded-full px-2 py-1 text-xs bg-green-600 w-[100px] text-white">{status}</span>;
      case "Pending":
        return <span className="rounded-full px-2 py-1 text-xs bg-yellow-600 w-[100px] text-white">{status}</span>;
      default:
        return <span className="rounded-full px-2 py-1 text-xs bg-gray-600 w-[100px] text-white">{status}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription>Latest requests and registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="requests">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="requests">Recent Requests</TabsTrigger>
            <TabsTrigger value="owners">New Pet Owners</TabsTrigger>
          </TabsList>
          <TabsContent value="requests" className="mt-0">
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 gap-2 sm:gap-0 cursor-pointer"
                  onClick={() => (window.location.href = "/webapp/admin/request-management")}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={getPetAvatar(request.petType) || "/placeholder.svg"} alt={request.petName} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {request.petName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{request.ownerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.service} - {request.petName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-11 sm:ml-0">
                    <div className="text-sm text-muted-foreground">{request.date}</div>
                    {getRequestStatusBadge(request.status)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="owners" className="mt-0">
            <div className="space-y-4">
              {petOwners.map((petOwner) => (
                <div
                  key={petOwner.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 gap-2 sm:gap-0 cursor-pointer"
                  onClick={() => (window.location.href = "/webapp/admin/pet-owners")}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-pic-TTy4UvlTr4nVP0etctSbFI1CUrupvH.png"
                        alt={petOwner.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {petOwner.name
                          .split(" ")
                          .map((n: any[]) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{petOwner.name}</p>
                      <p className="text-sm text-muted-foreground">{petOwner.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-11 sm:ml-0">
                    <div className="text-sm text-muted-foreground">Pets: {petOwner.pets}</div>
                    <div className="text-sm text-muted-foreground">Joined: {petOwner.lastVisit}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
