import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MediaArchiveLoading() {
  return (
    <div className="px-3 sm:px-4 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div>
          <Skeleton className="h-7 w-40 rounded-md mb-2" />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 overflow-x-auto pb-1">
        <Skeleton className="h-9 w-full max-w-[200px] rounded-md" />
        <Skeleton className="h-9 w-[110px] rounded-md flex-shrink-0" />
        <Skeleton className="h-9 w-9 rounded-md flex-shrink-0" />
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square" />
            <CardContent className="p-3">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

