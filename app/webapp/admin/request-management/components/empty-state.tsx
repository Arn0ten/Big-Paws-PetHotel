"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No requests found" }: EmptyStateProps) {
  return (
    <Card className="w-full h-[280px] flex items-center justify-center">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{message}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Requests will appear here when they are ready to be processed
        </p>
      </CardContent>
    </Card>
  );
}
