import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MediaArchiveLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48 rounded-md mb-2" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Skeleton className="h-10 w-full sm:w-2/3 rounded-md" />
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
            <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video" />
            <CardContent className="p-3">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
