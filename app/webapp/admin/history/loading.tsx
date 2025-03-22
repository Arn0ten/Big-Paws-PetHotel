import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryTableSkeleton } from "./components/history-table-skeleton";
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
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
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
            <CardHeader>
              <CardTitle>System Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <HistoryTableSkeleton />
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
