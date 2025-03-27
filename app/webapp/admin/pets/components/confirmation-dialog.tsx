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
import { Loader2 } from "lucide-react";
import { GlobalSuccessDialog } from "@/components/ui/global-success-dialog";
import type { SuccessDialogType } from "@/components/ui/global-success-dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "delete" | "edit" | "board" | "endBoarding";
  title: string;
  description: string;
  isLoading?: boolean;
}

// Update the ConfirmationDialog to match the standard layout
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  description,
  isLoading,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant={type === "delete" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : type === "delete" ? (
              "Delete"
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SuccessDialog({
  isOpen,
  onClose,
  title,
  description,
  actionLabel,
  onAction,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  // Map to the appropriate success dialog type
  const getSuccessType = (): SuccessDialogType => {
    if (title.toLowerCase().includes("delete")) return "delete-pet";
    if (title.toLowerCase().includes("edit")) return "edit-pet";
    if (title.toLowerCase().includes("board")) return "board-pet";
    if (title.toLowerCase().includes("end")) return "end-boarding";
    if (title.toLowerCase().includes("add")) return "add-pet";
    return "custom";
  };

  return (
    <GlobalSuccessDialog
      open={isOpen}
      onOpenChange={onClose}
      title={title}
      description={description}
      type={getSuccessType()}
      actionLabel={actionLabel}
      onAction={onAction}
    />
  );
}
