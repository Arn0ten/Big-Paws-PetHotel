"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PetDetailPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page
    router.push("/webapp/pet-owner/profile");
  }, [router]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-muted-foreground">
          Please wait while we redirect you to your profile.
        </p>
      </div>
    </div>
  );
}
