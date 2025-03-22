import { Skeleton } from "@/components/ui/skeleton";

export function MediaCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="aspect-square bg-muted relative">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
