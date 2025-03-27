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
import { Loader2, Bell, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatCurrency } from "../../boarding/utils/helpers";

interface UndoAcceptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  undoAcceptMessage: string;
  setUndoAcceptMessage: (message: string) => void;
  isProcessing: boolean;
  onConfirm: () => void;
}

// Update the UndoAcceptDialog to match the standard layout and make the reject button red
export function UndoAcceptDialog({
  open,
  onOpenChange,
  undoAcceptMessage,
  setUndoAcceptMessage,
  isProcessing,
  onConfirm,
}: UndoAcceptDialogProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Return Request to New</DialogTitle>
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
            variant="destructive"
            onClick={onConfirm}
            disabled={!undoAcceptMessage.trim() || isProcessing}
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

interface BoardingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardingDetails: any;
}

export function BoardingDetailsDialog({
  open,
  onOpenChange,
  boardingDetails,
}: BoardingDetailsDialogProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (!boardingDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"} max-h-[90vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            Boarding Payment Updated
          </DialogTitle>
          <DialogDescription>
            The boarding record has been updated with additional charges.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
              <Bell className="h-4 w-4" />
              <span className="font-medium">Payment Status Updated:</span>
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800"
              >
                Pending
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Pet
              </span>
              <div className="text-base font-medium mt-1">
                {boardingDetails.pet.name}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Owner
              </span>
              <div className="text-base font-medium mt-1">
                {boardingDetails.owner.name}
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Original Total
            </span>
            <div className="text-base font-medium mt-1">
              {formatCurrency(
                boardingDetails.totalPrice -
                  (boardingDetails.additionalCharges || 0),
              )}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Additional Charges
            </span>
            <div className="mt-1 p-3 bg-green-50 border border-green-100 rounded-md text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-lg font-medium">
                {formatCurrency(boardingDetails.additionalCharges || 0)}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({boardingDetails.additionalChargesReason})
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              New Total
            </span>
            <div className="text-xl font-bold mt-1 text-green-700 dark:text-green-400">
              {formatCurrency(boardingDetails.totalPrice)}
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-medium mb-1">Next Steps:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Notify the pet owner about the additional charges</li>
                <li>Collect payment before pet release</li>
                <li>Update payment status in Boarding Management</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
