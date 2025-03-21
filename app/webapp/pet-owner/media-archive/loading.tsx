import { Card, CardContent } from "@/components/ui/card"

export default function MediaArchiveLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse"></div>
        <div>
          <div className="h-8 w-48 bg-muted animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <div className="h-10 w-full sm:w-2/3 bg-muted animate-pulse rounded-md"></div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <div className="h-10 w-full sm:w-32 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-full sm:w-32 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse" />
            <CardContent className="p-3">
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

