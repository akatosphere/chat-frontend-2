import { useUserStore } from "@/entities/user/model/userStore";
import { ChatDialogBar } from "@/features/chat/chatActionsBar/components/chatDialogBar";
import { SingleActionBar } from "@/features/chat/chatActionsBar/components/singleActionsBar";

import { ChatKind, isChannel, isDialog, isGroup } from "../lib/chatActionsConfig";
import { useChatStore } from "../model/useChatStore";

type Props = {
  chat?: ChatKind;
};

export const ChatActionsBar = ({ chat }: Props) => {
  const currentUserId = useUserStore((s) => s.userId);
  const isOwner = useChatStore((s) => s.createdBy === currentUserId);
  const messages = useChatStore((s) => s.messages);
  if (!chat) return null;
  if (messages.length !== 0) return null;

  // чат
  if (isDialog(chat)) {
    return <ChatDialogBar />;
  }

  // Группа
  if (isGroup(chat)) {
    return isOwner ? (
      <SingleActionBar label="Добавить участника" />
    ) : (
      <SingleActionBar label="Покинуть группу" danger />
    );
  }

  // Канал
  if (isChannel(chat)) {
    return isOwner ? (
      <SingleActionBar label="Пригласить подписчиков" />
    ) : (
      <SingleActionBar label="Отписаться" danger />
    );
  }

  return null;
};
