"use client";

import {
  GlobalSuccessDialog,
  type SuccessDialogType,
} from "@/components/ui/global-success-dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  type?: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
  type = "custom",
}: SuccessDialogProps) {
  return (
    <GlobalSuccessDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      type={type as SuccessDialogType}
    />
  );
}
