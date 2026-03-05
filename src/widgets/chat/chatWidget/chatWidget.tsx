"use client";

import { useEffect } from "react";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { useChatInfoStore } from "@/entities/chat/model/useChatInfoStore";
import { UserPreview } from "@/entities/user/model/types";
import { normalizeChatInfo } from "@/features/chat/chat/lib/normalizeChatInfo";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { cn } from "@/shared/shadcn/lib/utils";

import { MappedChatMessage } from "../../../features/chat/chat/model/types/mappedTypes";
import { Chat } from "../../../features/chat/chat/ui/chat";
import { ChatHeader } from "../chatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
  chatKey: string;
  chatKeyUser: string | null;
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
  chatKeyUser,
}) => {
  const storedChatInfo = useChatInfoStore((s) => s.chatInfoByKey[chatKey]);
  const setChatInfo = useChatInfoStore((s) => s.setChatInfo);

  // Инициализируем стор начальными данными (только для групп/каналов)
  useEffect(() => {
    if ("type" in initialChatInfo) {
      setChatInfo(chatKey, initialChatInfo);
    }
  }, [chatKey, initialChatInfo, setChatInfo]);

  // Используем данные из стора, если есть, иначе из пропсов
  const chatInfo = normalizeChatInfo(storedChatInfo ?? initialChatInfo);

  // Единственное название чата в зависимости от типа
  const chatName = chatInfo.title || chatInfo.firstName || "Unknown";
  const chatAvatar = chatInfo.avatar || chatInfo.avatarUrl || "";

  return (
    <div className={cn("desktop:h-full flex h-dvh w-full flex-col", className)}>
      <ChatHeader
        profileHref={`/chats/${chatKey}/profile`}
        backHref="/chats"
        chat={{
          name: chatName,
          photo: chatAvatar,
          wasOnlineAt: chatInfo.wasOnlineAt,
          isOnline: chatInfo.isOnline,
          membersCount: chatInfo.membersCount,
          chatType: chatType,
        }}
        onCallClick={() => {}}
        onSearchClick={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Chat
          initialMessages={initialMessages}
          chatKey={chatKey}
          chatType={chatType}
          chatKeyUser={chatKeyUser}
          createdBy={chatInfo.createdBy}
        />
      </div>
    </div>
  );
};
