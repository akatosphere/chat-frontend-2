import Link from "next/link";

import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

type BannedModalProps = {
  open: boolean;
  onClose: () => void;
};

export const BannedModal: React.FC<BannedModalProps> = ({ open, onClose }) => (
  <ModalDialog
    overlay="card"
    variant="vertical"
    open={open}
    onOpenChange={(v) => {
      if (!v) onClose();
    }}
    className="gap-5 py-8"
  >
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle className="title font-medium text-black">Лимит исчерпан</AlertDialogTitle>
      </AlertDialogHeader>
    </div>
    <AlertDialogDescription className="text text-black">Попробуйте позднее</AlertDialogDescription>
    <div>
      <AlertDialogFooter className="desktop:gap-3 flex flex-col gap-4 sm:flex-col">
        <Button variant="default" size="md" className="flex flex-1" asChild>
          <Link href="/auth/support">Обратиться в поддержку</Link>
        </Button>
        <Button variant="outline" size="md" className="flex flex-1" onClick={onClose}>
          Закрыть
        </Button>
      </AlertDialogFooter>
    </div>
  </ModalDialog>
);
