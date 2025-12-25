"use client";
import { useEffect, useState } from "react";

import { fetchMessagesPage } from "@/features/chat/chat/api/mockChatApi";
import { mapApiMessage } from "@/features/chat/chat/lib/mapper";
import { Message } from "@/features/chat/chat/model/types";
import { ChatWidget } from "@/features/chat/chat/ui/chatWidget";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatHeader } from "@/widgets/activeChatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
};

export const ChatLayoutWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const CURRENT_USER_UID = "user-1";
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessagesPage().then((page) => {
      const mappedMessages = page.results.map((apiMessage) =>
        mapApiMessage(apiMessage, CURRENT_USER_UID),
      );

      setMessages(mappedMessages);
    });
  }, []);

  const currentUser = messages.find((m) => m.author.uid === CURRENT_USER_UID)?.author || {
    uid: CURRENT_USER_UID,
    username: "Unknown",
    avatarUrl: "",
  };

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <ChatHeader
        name="Иван"
        status="online"
        onCallClick={() => {}}
        onSearchClick={() => {}}
        onPhotoClick={() => {}}
        onInfoClick={() => {}}
      />
      <ChatWidget initialMessages={messages} currentUser={currentUser} className="flex-1" />
    </div>
  );
};
