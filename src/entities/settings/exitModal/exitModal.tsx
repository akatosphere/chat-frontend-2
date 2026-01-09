import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

import { logout } from "@/shared/api/logout";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

type ExitModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const ExitModal: React.FC<ExitModalProps> = ({ className, isOpen, onClose }) => {
  const router = useRouter();
  const onExit = () => {
    logout();
    router.replace("/auth");
  };
  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <span className="font-medium">Выход из аккаунта</span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span className="subtext text-gray">Вы действительно хотите выйти из аккаунта?</span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-row flex-wrap gap-2">
        <Button
          variant="default"
          size="smSubtext"
          className="text-primary desktop:flex-0 flex-1 bg-transparent"
          onClick={onClose}
        >
          Отмена
        </Button>
        <Button
          variant="default"
          size="smSubtext"
          onClick={onExit}
          className="desktop:flex-0 flex-1"
        >
          <span>Выйти</span>
        </Button>
      </AlertDialogFooter>
    </ModalDialog>
  );
};
