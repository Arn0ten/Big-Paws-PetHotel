import { Skeleton } from "@/components/ui/skeleton"
import { AuthLayout } from "@/app/webapp/auth/pet-owner/components/AuthLayout"

export default function LoadingRegistration() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto mt-2" />
        </div>

        <div className="space-y-4">
          {/* Name field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Contact field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Street field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Province field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* City field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-1 mt-1">
              <Skeleton className="h-1 w-1/5" />
              <Skeleton className="h-1 w-1/5" />
              <Skeleton className="h-1 w-1/5" />
              <Skeleton className="h-1 w-1/5" />
              <Skeleton className="h-1 w-1/5" />
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start space-x-2 mt-6">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>
    </AuthLayout>
  )
}
