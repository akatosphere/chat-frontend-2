import Close from "@icons/close.svg";

import { pluralize } from "@/shared/lib/pluralize";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";
import { InfoItem } from "@/shared/ui/infoItems/infoItem";

import { ChatPreview } from "../model/types";
import { Avatar } from "./avatar";

type ChatPreviewModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  previewData: ChatPreview;
};

export const ChatPreviewModal: React.FC<ChatPreviewModalProps> = ({
  className,
  isOpen,
  onClose,
  previewData,
  // onConfirm,
}) => {
  return (
    <ModalDialog className={cn(className, "p-2 pb-6")} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader className="relative flex w-full items-center justify-between gap-2">
        <Close
          className="absolute top-1 right-1 h-3 w-3 cursor-pointer text-black transition duration-200 hover:opacity-80"
          onClick={() => onClose()}
        />
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-3">
          <Avatar avatarUrl={previewData.avatarUrl} size="lg" variant="chat" />
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <AlertDialogTitle className="title">{previewData.name}</AlertDialogTitle>
            <p className="subtext text-gray">{`${previewData.participantsCount} ${pluralize(previewData.participantsCount, "участник", "участника", "участников")}`}</p>
          </div>
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="desktop:px-8 flex w-full flex-col gap-5 px-4">
          {previewData.description && (
            <div className="bg-main-light-gray flex w-full flex-col rounded-lg">
              <InfoItem
                title="Описание"
                text={previewData.description}
                className="text-black"
              ></InfoItem>
            </div>
          )}
          <Button>Вступить в группу</Button>
        </div>
      </AlertDialogFooter>
    </ModalDialog>
  );
};
