import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import { AlertDialogHeader, AlertDialogTitle } from "@/shared/shadcn/ui/alert-dialog";

type ChatPreviewModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ChatPreviewModal: React.FC<ChatPreviewModalProps> = ({
  className,
  isOpen,
  onClose,
  // onConfirm,
}) => {
  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <p>Модалка превью чата</p>
        </AlertDialogTitle>
      </AlertDialogHeader>
    </ModalDialog>
  );
};
