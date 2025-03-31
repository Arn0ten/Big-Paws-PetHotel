"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RequestCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10 rounded-full animate-pulse" />
              <div>
                <Skeleton className="h-5 w-32 mb-1 animate-pulse" />
                <Skeleton className="h-4 w-28 animate-pulse" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <Skeleton className="h-4 w-full mb-2 animate-pulse" />
          <Skeleton className="h-4 w-3/4 mb-2 animate-pulse" />
          <Skeleton className="h-4 w-1/2 mb-4 animate-pulse" />

          {/* Extension/price details skeleton */}
          <div className="mt-4">
            <Skeleton className="h-3 w-24 mb-2 animate-pulse" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-28 animate-pulse" />
              <Skeleton className="h-5 w-20 animate-pulse" />
            </div>
          </div>

          <div className="mt-4">
            <Skeleton className="h-3 w-20 mb-1 animate-pulse" />
            <Skeleton className="h-4 w-32 animate-pulse" />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto flex flex-col gap-2">
          <Skeleton className="h-9 w-full animate-pulse" />
          <Skeleton className="h-9 w-full animate-pulse" />
        </CardFooter>
      </Card>
    </div>
  );
}
