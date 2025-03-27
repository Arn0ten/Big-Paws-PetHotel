"use client";

import { useState, useEffect } from "react";
import { GlobalSuccessDialog } from "@/components/ui/global-success-dialog";

interface SuccessDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

/**
 * SuccessDialog Component
 *
 * This component provides visual feedback for successful actions.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The dialog title
 * @param {string} props.message - The dialog message
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onClose - Function to close the dialog
 * @param {boolean} props.autoClose - Whether to automatically close the dialog
 * @param {number} props.autoCloseTime - Time in ms before auto-closing
 * @returns {JSX.Element} The success dialog component
 */
export default function SuccessDialog({
  title,
  message,
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}: SuccessDialogProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);

    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow exit animation to complete
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseTime, onClose]);

  if (!isOpen && !isVisible) return null;

  return (
    <GlobalSuccessDialog
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }
      }}
      title={title}
      description={message}
    />
  );
}
