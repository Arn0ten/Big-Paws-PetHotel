import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaCardSkeleton } from "./components/media-card-skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Skeleton className="h-10 w-full" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[140px]" />
          <Skeleton className="h-10 w-[140px]" />
          <Skeleton className="h-10 w-[140px]" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activities">
        <TabsList>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Activities Tab */}
          <Card>
            <CardHeader className="px-6">
              <CardTitle>System Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[180px]">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Module
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Pet / Owner
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-4 py-4">
                            <Skeleton className="h-5 w-32" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-4 w-4 rounded-full" />
                              <Skeleton className="h-5 w-28" />
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Skeleton className="h-5 w-full" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Skeleton className="h-6 w-20 rounded-full" />
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Media Tab (hidden but preloaded) */}
          <div className="hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <MediaCardSkeleton key={i} />
                ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
