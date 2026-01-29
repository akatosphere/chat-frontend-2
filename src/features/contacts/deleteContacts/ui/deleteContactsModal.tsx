import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

import { useDeleteSelectedContacts } from "@/features/contacts/deleteContacts/ui/lib/useDeleteSelectedContacts";
import { pluralize } from "@/shared/lib/pluralize";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

import { useSelectContactsStore } from "../../model/SelectContactsStore";

type DeleteContactsModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteContactsModal: React.FC<DeleteContactsModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  const { mutate, isPending } = useDeleteSelectedContacts();
  const selected = useSelectContactsStore((s) => s.selected);
  const text =
    "удалить " +
    selected.length +
    pluralize(selected.length, " контакт", " контакта", " контактов");
  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="font-medium">Удалить контакты</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <span className="subtext text-gray">Вы действительно хотите {text}?</span>
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
          onClick={() => mutate()}
          className="desktop:flex-0 flex-1"
        >
          <span>{isPending ? "Удаление..." : "Удалить"}</span>
        </Button>
      </AlertDialogFooter>
    </ModalDialog>
  );
};
