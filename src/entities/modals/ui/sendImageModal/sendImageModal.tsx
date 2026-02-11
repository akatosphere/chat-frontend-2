import Close from "@icons/close.svg";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

import { useSendMessageStore } from "@/features/chat/chat/model/store/useChatSendFilesStore";
import { MessageForm } from "@/features/chat/sendMessage/ui/messageForm";
import { useKeyboardOffset } from "@/shared/lib/useKeyboardOffset";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import { AlertDialogHeader, AlertDialogTitle } from "@/shared/shadcn/ui/alert-dialog";
import { MediaGrid, MediaItem } from "@/shared/ui/mediaGrid/mediaGrid";

export type SendImageModalProps = {
  className?: string;
  isOpen: boolean;
  chatKey: string;
  messageId: string;
  onClose: () => void;
};

export const SendImageModal: React.FC<SendImageModalProps> = ({ className, isOpen, onClose }) => {
  const images = useSendMessageStore((s) => s.images);
  const { isKeyboardOpen } = useKeyboardOffset();
  const imagesToUpload: MediaItem[] = images.map((img) => {
    const obj = {
      id: img.id,
      type: "image" as const,
      src: img.previewUrl,
    };
    return obj;
  });

  if (!images.length) return null;
  return (
    <ModalDialog
      className={cn("desktop:w-[432px] desktop:max-w-[432px] bg-[#F5F6F8]", className)}
      open={isOpen}
      onOpenChange={onClose}
    >
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-between gap-2">
          <span className="font-medium">Отправить медиа-файл</span>
          <Close
            className="h-4 w-4 cursor-pointer text-black transition duration-200 hover:opacity-80"
            onClick={onClose}
          />
        </AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
        <div className="">
          <MediaGrid items={imagesToUpload} size="sendImageModal" className="w-full" isDeleteMode />
          <MessageForm
            className="mt-4 p-0"
            variant="modal"
            isKeyboardOpen={isKeyboardOpen}
            onSubmitMessage={() => {}}
            isAttachBtnDisabled={true}
            isVoiceBtnDisabled={true}
            placeholder="Добавить подпись"
          />
        </div>
      </AlertDialogHeader>
    </ModalDialog>
  );
};
