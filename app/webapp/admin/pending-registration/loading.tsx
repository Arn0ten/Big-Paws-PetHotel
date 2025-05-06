import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PendingRegistrationLoading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pending Registrations
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage pending pet owner registrations.
        </p>
      </div>

      {/* Search and filter skeleton */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or phone..."
              disabled
              className="pl-9 pr-20"
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Date:</span>
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b p-6 last:border-0"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-[180px]" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-[140px]" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <Skeleton className="h-4 w-[100px]" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
