import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

import { clearChat } from "@/features/chatList/api/clearChat";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { useMainContentStore } from "@/shared/model/mainContent.store";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

export type ClearChatModalProps = {
  className?: string;
  isOpen: boolean;
  chatKey: string;
  onClose: () => void;
};

export const ClearChatModal: React.FC<ClearChatModalProps> = ({
  className,
  isOpen,
  chatKey,
  onClose,
}) => {
  const { chatsByKey, removeChat, upsertChat } = useChatListStore.getState();
  const router = useRouter();
  const setShouldShowDefault = useMainContentStore((state) => state.setShouldShowDefault);
  const name =
    chatsByKey[chatKey]?.type === "chat"
      ? chatsByKey[chatKey]?.member.first_name + " " + chatsByKey[chatKey]?.member.last_name
      : chatsByKey[chatKey]?.member.nickname;

  const onDelete = async () => {
    const prev = chatsByKey[chatKey];
    if (!prev) return;

    removeChat(chatKey);
    onClose();
    setShouldShowDefault(true);
    console.log("Флаг true");

    router.push("/chats");
    console.log("redirect");
    try {
      await clearChat({ index: prev.id });
    } catch (e) {
      console.log(e);
      // rollback
      upsertChat(prev);
    }
  };

  return (
    <ModalDialog className={cn(className)} open={isOpen} onOpenChange={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <span className="font-medium">Удалить чат</span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span className="subtext text-gray">
            Удалить чат {name} без возможности восстановления?
          </span>
        </AlertDialogDescription>
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
