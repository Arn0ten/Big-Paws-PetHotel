import { PawPrint } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function PetsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pet Management</h1>
        <p className="text-muted-foreground">Manage all pets currently registered in the system.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PawPrint className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>Pet Registry</CardTitle>
            </div>
            <Skeleton className="h-10 w-[140px] bg-gray-200 dark:bg-gray-700" />
          </div>
          <CardDescription>View and manage all registered pets.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and filters skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1 bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[130px] bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-[150px] bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-10 bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>

            {/* Table skeleton */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead className="w-[60px]">
                      <Skeleton className="h-4 w-8 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto bg-gray-200 dark:bg-gray-700" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-12 bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16 bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
                          <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-[200px] bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-5 w-[100px] bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

