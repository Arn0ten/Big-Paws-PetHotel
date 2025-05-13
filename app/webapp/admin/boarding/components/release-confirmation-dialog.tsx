"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { BoardingOrder } from "../types";
import { formatCurrency } from "../utils/helpers";
import { LogOut } from "lucide-react";
import {BoardingDTO} from "@/types/boarding";

interface ReleaseConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardingOrder: BoardingDTO;
  onConfirmRelease: (orderId: string) => void;
}

export function ReleaseConfirmationDialog({
  open,
  onOpenChange,
  boardingOrder,
  onConfirmRelease,
}: ReleaseConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirmRelease(boardingOrder.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-primary" />
            Confirm Pet Release
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to release{" "}
            <span className="font-medium">{boardingOrder.petName}</span> to its
            owner. This action will:
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Mark the pet as released</li>
              <li>
                Generate a receipt for{" "}
                {formatCurrency(boardingOrder.total)}
              </li>
              <li>Send a notification to the owner</li>
              <li>Remove the pet from active boarding list</li>
            </ul>
            <div className="mt-4 text-sm font-medium">
              Are you sure you want to proceed?
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-primary">
            Release Pet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
