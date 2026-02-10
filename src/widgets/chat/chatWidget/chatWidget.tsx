"use client";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { ChatActionsBar } from "@/entities/chat/ui/chatActionsBar";
import { UserPreview } from "@/entities/user/model/types";
import { normalizeChatInfo } from "@/features/chat/chat/lib/normalizeChatInfo";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";

import { MappedChatMessage } from "../../../features/chat/chat/model/types/mappedTypes";
import { Chat } from "../../../features/chat/chat/ui/chat";
import { ChatHeader } from "../chatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
  chatKey: string;
  chatType: ChatType;
  initialChatInfo: MappedChatDetails | UserPreview;
  initialMessages: MappedChatMessage[];
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  className,
  initialChatInfo,
  chatType,
  initialMessages,
  chatKey,
}) => {
  // Приводит пришедшие данные к единому интерфейсу
  const chatInfo = normalizeChatInfo(initialChatInfo);

  // Единственное название чата в зависимости от типа
  const chatName = chatInfo.title || chatInfo.firstName || "Unknown";
  const chatAvatar = chatInfo.avatar || chatInfo.avatarUrl || "";

  // Функция для получения текста статуса.
  const getStatusText = () => {
    // Если это группа или канал — показываем кол-во участников
    if (
      (chatType === "public-group" || chatType === "private-group") &&
      chatInfo.membersCount !== undefined
    ) {
      return `${chatInfo.membersCount + 1} ${pluralize(chatInfo.membersCount + 1, "участник", "участника", "участников")}`;
    }

    if (
      (chatType === "public-channel" || chatType === "private-channel") &&
      chatInfo.membersCount !== undefined
    ) {
      return `${chatInfo.membersCount + 1} ${pluralize(chatInfo.membersCount + 1, "подписчик", "подписчика", "подписчиков")}`;
    }
    return "online";
  };

  return (
    <div className={cn("desktop:h-full flex h-dvh w-full flex-col", className)}>
      <ChatHeader
        name={chatName}
        status={getStatusText()}
        backHref="/chats"
        photo={chatAvatar}
        onCallClick={() => {}}
        onSearchClick={() => {}}
        onPhotoClick={() => {}}
        onInfoClick={() => {}}
      />
      <div className="">
        <ChatActionsBar chat={chatType} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Chat
          initialMessages={initialMessages}
          chatKey={chatKey}
          chatType={chatType}
          createdBy={chatInfo.createdBy}
        />
      </div>
    </div>
  );
};
