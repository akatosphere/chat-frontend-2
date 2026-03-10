"use client";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { UserPreview } from "@/entities/user/model/types";
import { normalizeChatInfo } from "@/features/chat/chat/lib/normalizeChatInfo";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { cn } from "@/shared/shadcn/lib/utils";

import { Chat } from "../../../features/chat/chat/ui/chat";
import { ChatHeader } from "../chatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
  chatKey: string;
  chatType: ChatType;
  initialChatInfo: MappedChatDetails | UserPreview;
  chatUid: string;
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  className,
  initialChatInfo,
  chatType,
  chatKey,
  chatUid,
}) => {
  const chatInfo = normalizeChatInfo(initialChatInfo);

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
          chatKey={chatKey}
          chatType={chatType}
          createdBy={chatInfo.createdBy}
          chatUid={chatUid}
        />
      </div>
    </div>
  );
};
