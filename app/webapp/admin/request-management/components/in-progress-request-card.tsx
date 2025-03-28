"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getRequestTypeIcon,
  getRequestTypeLabel,
  getCardBgColor,
} from "../utils/ui-helpers";
import { useMediaQuery } from "@/hooks/use-media-query";

interface InProgressRequestCardProps {
  request: any;
  onProcess: () => void;
  onUndoAccept: () => void;
  onViewDetails: () => void;
}

export function InProgressRequestCard({
  request,
  onProcess,
  onUndoAccept,
  onViewDetails,
}: InProgressRequestCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallCard = useMediaQuery("(max-width: 400px)");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.3,
      }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card
        className={`w-full h-full flex flex-col ${getCardBgColor(request.type, request.isUrgent)} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={onViewDetails}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div
                className={`
                p-2 rounded-full 
                ${request.type === "photo" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${request.type === "video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : ""}
                ${request.type === "grooming" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${request.type === "boarding-extension" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${request.type === "custom" ? "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300" : ""}
              `}
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
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-sm line-clamp-3 text-foreground/90 dark:text-foreground/80">
            {request.description}
          </p>

          {request.type === "boarding-extension" &&
            request.extensionDetails && (
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Extension
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-amber-700 dark:text-amber-400">
                    {request.extensionDetails.duration}{" "}
                    {request.extensionDetails.unit}
                  </span>
                  {request.price && (
                    <span className="text-base font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(request.price)}
                    </span>
                  )}
                </div>
              </div>
            )}

          {request.type === "grooming" && request.groomingService && (
            <div className="mt-3 flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                Service
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-green-700 dark:text-green-400">
                  {request.groomingService
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                {request.price && (
                  <span className="text-base font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(request.price)}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              Submitted
            </span>
            <div className="text-sm font-medium mt-0.5">
              {formatDate(request.createdAt)}
            </div>
          </div>

          {/* Show undo reason if this was previously completed and undone */}
          {request.undoReason && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-100 rounded-md dark:bg-amber-950/20 dark:border-amber-800">
              <p className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300 font-medium">
                Returned to In-Progress
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                {request.undoReason}
              </p>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                {request.undoTimestamp ? formatDate(request.undoTimestamp) : ""}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className={`p-4 pt-0 mt-auto flex flex-col gap-2`}>
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onProcess(); // Use the passed prop instead of direct state manipulation
            }}
            size={isSmallCard ? "sm" : "default"}
          >
            Process Request
          </Button>
          <Button
            variant="outline"
            className="w-full text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/50"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onUndoAccept && onUndoAccept();
            }}
            size={isSmallCard ? "sm" : "default"}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to New
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
