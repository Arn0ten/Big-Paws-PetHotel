import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center w-full mb-6">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Enhanced Tab Interface */}
      <div className="bg-card rounded-lg shadow-sm border">
        <div className="px-4 pt-4">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-14 p-1 bg-muted/30 dark:bg-muted/20 rounded-lg overflow-x-auto scrollbar-hide">
              <TabsTrigger
                value="new"
                className="flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base"
              >
                <Skeleton className="h-5 w-5 rounded-full" />
                <span className="hidden sm:inline">
                  <Skeleton className="h-5 w-24" />
                </span>
                <span className="sm:hidden">
                  <Skeleton className="h-5 w-12" />
                </span>
                <Skeleton className="h-5 w-8 rounded-full" />
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="flex items-center justify-center gap-2 rounded-md transition-all h-12 text-base"
              >
                <Skeleton className="h-5 w-5 rounded-full" />
                <span className="hidden sm:inline">
                  <Skeleton className="h-5 w-32" />
                </span>
                <span className="sm:hidden">
                  <Skeleton className="h-5 w-16" />
                </span>
                <Skeleton className="h-5 w-8 rounded-full" />
              </TabsTrigger>
            </TabsList>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index} className="w-full h-[280px] flex flex-col">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-9 w-9 rounded-full animate-pulse" />
                            <div>
                              <Skeleton className="h-5 w-32 mb-1 animate-pulse" />
                              <Skeleton className="h-4 w-24 animate-pulse" />
                            </div>
                          </div>
                          <Skeleton className="h-5 w-16 rounded-full animate-pulse" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 flex-grow">
                        <Skeleton className="h-4 w-full mb-2 animate-pulse" />
                        <Skeleton className="h-4 w-3/4 mb-2 animate-pulse" />
                        <Skeleton className="h-4 w-1/2 mb-4 animate-pulse" />

                        <div className="mt-3">
                          <Skeleton className="h-3 w-24 mb-1 animate-pulse" />
                          <Skeleton className="h-4 w-32 animate-pulse" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 mt-auto flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                          <Skeleton className="h-9 w-full animate-pulse" />
                          <Skeleton className="h-9 w-full animate-pulse" />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

