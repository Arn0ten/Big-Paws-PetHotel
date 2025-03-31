import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BoardingManagementLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card text-card-foreground shadow p-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="mt-3">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-4 w-40 mt-2" />
              </div>
            </div>
          ))}
      </div>

      {/* Filter Bar Loading */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>

      {/* Tabs Loading */}
      <Tabs defaultValue="all">
        <TabsList className="w-full sm:w-auto flex flex-nowrap justify-start overflow-x-auto">
          <TabsTrigger
            value="all"
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            All Boardings
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="overdue"
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            Overdue
          </TabsTrigger>
          <TabsTrigger
            value="released"
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            Released
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="rounded-md border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[80px]">
                      Pet
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Pet Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Owner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Pet Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-4 py-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </td>
                        <td className="px-4 py-4">
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Skeleton className="h-8 w-20 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
