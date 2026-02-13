import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { deleteTextMessage } from "@/entities/chat/api/deleteMessage";
import { useChatStore } from "@/entities/chat/model/useChatStore";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
export type DeleteMessageModalProps = {
  className?: string;
  isOpen: boolean;
  chatKey: string;
  messageId: string;
  onClose: () => void;
};

export const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  className,
  isOpen,
  chatKey,
  messageId,
  onClose,
}) => {
  const { chatsByKey } = useChatListStore.getState();
  const { chatType, chatKeyUser, deleteMessage, messages, currentUserId } = useChatStore.getState();
  const currentMessage = messages.find((msg) => msg.uid === messageId);
  const isAviableToDelete = currentMessage && currentUserId === currentMessage.fromUser.uid;
  const [isChecked, setIsChecked] = useState(false);
  const name =
    chatType === "chat" && chatKeyUser
      ? chatsByKey[chatKeyUser]?.member.first_name + " " + chatsByKey[chatKeyUser]?.member.last_name
      : null;

  const onDelete = async () => {
    const prev = chatType === "chat" && chatKeyUser ? chatsByKey[chatKeyUser] : chatsByKey[chatKey];
    if (!prev) return;

    onClose();
    deleteMessage(messageId);

    try {
      const deleteMessageWS = await deleteTextMessage({
        uid: messageId,
        chat_key: chatType === "chat" ? chatKeyUser : chatKey,
        for_all: isChecked,
        request_uid: uuidv4(),
      });

      if (!deleteMessageWS.uid) console.error("Ошибка удаления сообщения");
    } catch (error) {
      console.error(`Ошибка в useDeleteMessage:`, error);
    }
  };

  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <span className="font-medium">Удалить сообщение</span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span className="subtext text-gray">Вы действительно хотите удалить собщение?</span>
        </AlertDialogDescription>
        {isAviableToDelete && (
          <div
            className="hover:text-primary mt-5 flex w-full cursor-pointer items-center gap-2 transition-colors duration-200"
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          >
            <Checkbox checked={isChecked} />
            <span className="user-select-none">
              Удалить у {chatType === "chat" ? `меня и у ${name}` : "всех"}
            </span>
          </div>
        )}
      </AlertDialogHeader>
      <AlertDialogFooter className="flex-row flex-wrap gap-2">
        <Button
          variant="default"
          size="smSubtext"
          className="desktop:text-error desktop:bg-transparent bg-primary desktop:flex-0 desktop:order-1 order-2 flex-1 text-white"
          onClick={onDelete}
        >
          Удалить
        </Button>
        <Button
          variant="default"
          size="smSubtext"
          className="text-primary border-primary desktop:bg-primary desktop:flex-0 desktop:text-white desktop:order-2 order-1 flex-1 bg-transparent"
          onClick={onClose}
        >
          <span>Отмена</span>
        </Button>
      </AlertDialogFooter>
    </ModalDialog>
  );
};
