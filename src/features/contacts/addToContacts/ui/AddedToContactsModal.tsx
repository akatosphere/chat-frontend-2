"use client";

import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useEffect } from "react";

import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import { AlertDialogHeader, AlertDialogTitle } from "@/shared/shadcn/ui/alert-dialog";

type AddedToContactsModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
};

export const AddedToContactsModal: React.FC<AddedToContactsModalProps> = ({
  className,
  isOpen,
  onClose,
  firstName,
  lastName,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader className="items-center text-center">
        <AlertDialogTitle>
          <span className="font-medium">
            {firstName} {lastName}
          </span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span className="subtext text-gray">теперь в списке ваших контактов</span>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </ModalDialog>
  );
};
