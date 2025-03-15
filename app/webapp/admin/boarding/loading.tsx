import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BoardingManagementLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      {/* Stats Cards Loading */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-3 w-[120px] mt-2" />
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Filter Bar Loading */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      {/* Tabs Loading */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Boardings</TabsTrigger>
          <TabsTrigger value="active">Active Boardings</TabsTrigger>
          <TabsTrigger value="completed">Completed Boardings</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="rounded-md border shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="h-10 flex items-center border-b">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full max-w-[100px] mx-2" />
                  ))}
              </div>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-16 flex items-center border-b">
                    {Array(7)
                      .fill(0)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full max-w-[100px] mx-2" />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

