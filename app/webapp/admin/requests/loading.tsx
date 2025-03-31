import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      {/* Stats Cards */}
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

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-lg shadow-sm border">
        <Tabs defaultValue="all">
          <TabsList className="w-full sm:w-auto flex flex-nowrap justify-start overflow-x-auto">
            <TabsTrigger
              value="all"
              className="flex-1 sm:flex-none whitespace-nowrap"
            >
              New Requests
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 sm:flex-none whitespace-nowrap"
            >
              Rejected
            </TabsTrigger>
          </TabsList>

          <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />

                    <div className="mt-3">
                      <Skeleton className="h-3 w-24 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
