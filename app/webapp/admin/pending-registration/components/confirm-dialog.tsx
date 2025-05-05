"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  title: string;
  description: string;
  type: "approve" | "reject" | "generic";
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  title,
  description,
  type,
}: ConfirmationDialogProps) {
  // Determine icon and color based on type
  const icon =
    type === "approve" ? (
      <ThumbsUp className="h-6 w-6 text-green-500" />
    ) : type === "reject" ? (
      <ThumbsDown className="h-6 w-6 text-red-500" />
    ) : (
      <AlertCircle className="h-6 w-6 text-yellow-500" />
    );

  const buttonColor =
    type === "approve"
      ? "bg-green-600 hover:bg-green-700"
      : type === "reject"
        ? "bg-red-600 hover:bg-red-700"
        : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {icon}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className={buttonColor}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>Confirm</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
