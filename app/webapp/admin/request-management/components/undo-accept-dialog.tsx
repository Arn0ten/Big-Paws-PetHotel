"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertTriangle } from "lucide-react";

interface UndoAcceptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  undoAcceptMessage: string;
  setUndoAcceptMessage: (message: string) => void;
  isProcessing: boolean;
  onConfirm: () => void;
  isMobile: boolean;
}

export function UndoAcceptDialog({
  open,
  onOpenChange,
  undoAcceptMessage,
  setUndoAcceptMessage,
  isProcessing,
  onConfirm,
  isMobile,
}: UndoAcceptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Return Request to New
          </DialogTitle>
          <DialogDescription>
            This will move the request back to the "New Requests" tab. Please
            provide a reason for this change that will be visible to the pet
            owner.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="undo-reason" className="font-medium">
              Reason for Returning Request
            </Label>
            <Textarea
              id="undo-reason"
              placeholder="Enter the reason for returning this request to the New Requests tab..."
              value={undoAcceptMessage}
              onChange={(e) => setUndoAcceptMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              This message will be sent to the pet owner to explain why their
              request is being returned to the New Requests tab for reassignment
              or further evaluation.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            disabled={!undoAcceptMessage.trim() || isProcessing}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Return"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
