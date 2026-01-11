import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

type AvatarSelectionModalProps = {
  className?: string;
  isOpen: boolean;
  error?: string;
  onAvatarChange: (file: File) => void;
  onClose: () => void;
};

export const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({
  className,
  isOpen,
  error,
  onClose,
  onAvatarChange,
}) => {
  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <span className="font-medium">Смена аватар</span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span className="subtext text-gray">
            Добавить сюда кроппер для аватарки потом и возможность удаления
          </span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-col items-center justify-center gap-2 sm:justify-center">
        <form
          className="flex w-full flex-col items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const file = formData.get("avatar") as File | null;
            if (file) {
              onAvatarChange(file);
            }
          }}
        >
          <input
            className="border-muted hover:bg-accent mb-2 w-full cursor-pointer border p-2"
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            name="avatar"
          />
          {error && <span className="text-error">{error}</span>}
          <div className="flex flex-row flex-wrap gap-2 self-end">
            <Button
              variant="default"
              size="smSubtext"
              className="text-primary desktop:flex-0 flex-1 bg-transparent"
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="default"
              size="smSubtext"
              className="desktop:flex-0 flex-1"
            >
              Загрузить аватар
            </Button>
          </div>
        </form>
      </AlertDialogFooter>
    </ModalDialog>
  );
};
