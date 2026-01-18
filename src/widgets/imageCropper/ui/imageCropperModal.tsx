import Close from "@icons/close.svg";

import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";

import { ImageCropper } from "./imageCropper";

type ImageCropperModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  onCropComplete: (croppedImage: string) => void;
};

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  className,
  isOpen,
  onClose,
  imgSrc,
  onCropComplete,
}) => {
  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-between gap-2">
          <span className="font-medium">Настроить отображение фото</span>
          <Close
            className="h-4 w-4 cursor-pointer text-black transition duration-200 hover:opacity-80"
            onClick={onClose}
          />
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex-row flex-wrap gap-2">
        <ImageCropper src={imgSrc} onConfirm={onCropComplete} />
      </AlertDialogFooter>
    </ModalDialog>
  );
};
