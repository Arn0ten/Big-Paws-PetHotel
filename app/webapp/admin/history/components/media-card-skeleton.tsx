import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function MediaCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <CardContent className="p-3 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  )
}

