"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EmailPreview } from "@/components/email-preview";
import { completeRequest } from "@/app/actions/request-actions";
import type { Request, RequestType } from "@/types";

interface ProcessRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: Request;
  onSuccess: (request: Request) => void;
}

export function ProcessRequestDialog({
  open,
  onOpenChange,
  request,
  onSuccess,
}: ProcessRequestDialogProps) {
  const router = useRouter();
  const [details, setDetails] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [extensionDays, setExtensionDays] = useState("");
  const [groomingDate, setGroomingDate] = useState<Date | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Determine which fields to show based on request type
  const showMediaUrl = request.type === "photo" || request.type === "video";
  const showExtensionDays = request.type === "extend-stay";
  const showGroomingDate = request.type === "grooming";

  const handleSubmit = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const completionData: {
        details: string;
        mediaUrl?: string;
        extensionDays?: number;
        groomingDate?: string;
      } = { details };

      if (showMediaUrl && mediaUrl) {
        completionData.mediaUrl = mediaUrl;
      }

      if (showExtensionDays && extensionDays) {
        completionData.extensionDays = Number.parseInt(extensionDays, 10);
      }

      if (showGroomingDate && groomingDate) {
        completionData.groomingDate = format(groomingDate, "MMMM dd, yyyy");
      }

      const result = await completeRequest(request.id, completionData);

      if (result.success) {
        onSuccess(result.request);
        onOpenChange(false);

        // Show whether email was sent successfully
        if (result.emailSent) {
          console.log("Email sent successfully:", result.emailMessage);
        } else {
          console.error("Failed to send email:", result.emailMessage);
        }
      } else {
        setErrorMessage(result.message || "Failed to process request");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Process {request.type} Request</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="details">Completion Details</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter details about how the request was fulfilled"
              className="min-h-[100px]"
            />
          </div>

          {showMediaUrl && (
            <div className="grid gap-2">
              <Label htmlFor="mediaUrl">Media URL</Label>
              <Input
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://example.com/pet-media/123"
              />
            </div>
          )}

          {showExtensionDays && (
            <div className="grid gap-2">
              <Label htmlFor="extensionDays">Extension (Days)</Label>
              <Input
                id="extensionDays"
                type="number"
                value={extensionDays}
                onChange={(e) => setExtensionDays(e.target.value)}
                placeholder="Number of days"
              />
            </div>
          )}

          {showGroomingDate && (
            <div className="grid gap-2">
              <Label htmlFor="groomingDate">Grooming Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="groomingDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !groomingDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {groomingDate
                      ? format(groomingDate, "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={groomingDate}
                    onSelect={setGroomingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {errorMessage && (
            <div className="text-destructive text-sm">{errorMessage}</div>
          )}

          {/* Preview email that will be sent to the pet owner */}
          {details && (
            <EmailPreview
              requestType={request.type as RequestType}
              petName={request.petName}
              ownerName={request.petOwner.name}
              completionDetails={details}
              mediaUrl={showMediaUrl ? mediaUrl : undefined}
              extensionDays={
                showExtensionDays && extensionDays
                  ? Number.parseInt(extensionDays, 10)
                  : undefined
              }
              groomingDate={
                showGroomingDate && groomingDate
                  ? format(groomingDate, "MMMM dd, yyyy")
                  : undefined
              }
            />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!details || isProcessing}>
            {isProcessing ? "Processing..." : "Complete Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
