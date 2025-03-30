"use client";

import type React from "react";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";
import {
  getRequestTypeIcon,
  getRequestTypeLabel,
  getCardBgColor,
  formatDate,
} from "../utils/ui-helpers";

interface InProgressRequestCardProps {
  request: any;
  onProcess: () => void;
  onViewDetails: () => void;
  onUndoAccept: () => void;
}

export function InProgressRequestCard({
  request,
  onProcess,
  onViewDetails,
  onUndoAccept,
}: InProgressRequestCardProps) {
  const handleProcess = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onProcess();
  };

  const handleUndoAccept = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onUndoAccept();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card
        className={`w-full h-[280px] flex flex-col cursor-pointer ${getCardBgColor(request.type, request.isUrgent)}`}
        onClick={onViewDetails}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div
                className={`p-2 rounded-full ${getIconBgColorClass(request.type)}`}
              >
                {getRequestTypeIcon(request.type)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">
                  {getRequestTypeLabel(request.type)}
                </CardTitle>
                <CardDescription className="text-foreground/70 dark:text-foreground/60 font-medium">
                  {request.petName}{" "}
                  <span className="text-muted-foreground">
                    ({request.petOwnerName})
                  </span>
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {request.isUrgent && (
                <Badge variant="destructive" className="ml-auto">
                  Urgent
                </Badge>
              )}
              {request.isReconsidered && (
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-700 border-amber-200 ml-auto"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reconsidered
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
          <p className="text-sm line-clamp-2 text-foreground/90 dark:text-foreground/80">
            {request.description}
          </p>

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Approved
            </span>
            <div className="text-sm font-medium mt-0.5">
              {formatDate(request.approvedAt || request.createdAt)}
            </div>
          </div>

          {request.type === "boarding-extension" &&
            request.extensionDetails && (
              <div className="mt-3">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Extension
                </span>
                <div className="text-sm font-medium mt-0.5 text-amber-700 dark:text-amber-400">
                  {request.extensionDetails.duration}{" "}
                  {request.extensionDetails.unit}
                </div>
              </div>
            )}
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto flex flex-col sm:flex-row gap-2">
          <Button className="w-full sm:flex-1" onClick={handleProcess}>
            Complete Request
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="sm:w-10"
            onClick={handleUndoAccept}
            title="Undo Accept"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Helper function to get icon background color class
function getIconBgColorClass(type: string) {
  switch (type) {
    case "photo":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "video":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "grooming":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "boarding-extension":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
    case "custom":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
  }
}
