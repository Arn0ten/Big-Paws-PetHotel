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
import { Badge } from "@/components/ui/badge";
import { Bell, DollarSign } from "lucide-react";
import { formatCurrency } from "../utils/helpers";

interface BoardingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBoardingDetails: any;
  isMobile: boolean;
}

export function BoardingDetailsDialog({
  open,
  onOpenChange,
  selectedBoardingDetails,
  isMobile,
}: BoardingDetailsDialogProps) {
  if (!selectedBoardingDetails) return null;

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
                {selectedBoardingDetails.pet.name}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Owner
              </span>
              <div className="text-base font-medium mt-1">
                {selectedBoardingDetails.owner.name}
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Original Total
            </span>
            <div className="text-base font-medium mt-1">
              {formatCurrency(
                selectedBoardingDetails.totalPrice -
                  (selectedBoardingDetails.additionalCharges || 0),
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
                {formatCurrency(selectedBoardingDetails.additionalCharges || 0)}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({selectedBoardingDetails.additionalChargesReason})
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              New Total
            </span>
            <div className="text-xl font-bold mt-1 text-green-700 dark:text-green-400">
              {formatCurrency(selectedBoardingDetails.totalPrice)}
            </div>
          </div>

          {/* Recent Transaction */}
          {selectedBoardingDetails.transactions &&
            selectedBoardingDetails.transactions.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Recent Transaction
                </span>
                <div className="mt-1 p-3 bg-blue-50 border border-blue-100 rounded-md text-blue-700 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-300">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ID:</span>
                    <span className="text-sm">
                      {
                        selectedBoardingDetails.transactions[
                          selectedBoardingDetails.transactions.length - 1
                        ].id
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium">Type:</span>
                    <span className="text-sm capitalize">
                      {
                        selectedBoardingDetails.transactions[
                          selectedBoardingDetails.transactions.length - 1
                        ].requestType
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium">Amount:</span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-bold">
                      {formatCurrency(
                        selectedBoardingDetails.transactions[
                          selectedBoardingDetails.transactions.length - 1
                        ].amount,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium">Status:</span>
                    <Badge variant="outline" className="capitalize">
                      {
                        selectedBoardingDetails.transactions[
                          selectedBoardingDetails.transactions.length - 1
                        ].status
                      }
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {new Date(
                      selectedBoardingDetails.transactions[
                        selectedBoardingDetails.transactions.length - 1
                      ].timestamp,
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

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
