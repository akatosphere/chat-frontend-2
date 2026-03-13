"use client";

import { useEffect } from "react";

import { useChatStore } from "@/entities/chat/model/useChatStore";
import { useUserStore } from "@/entities/user/model/userStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatFooter } from "@/widgets/chat/chatFooter/ui/chatFooter";

import { useSendMessage } from "../hooks";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { ChatType } from "../model/types/serverTypes";
import { MessageList } from "./messageList";

type ChatProps = {
  className?: string;
  initialMessages: MappedChatMessage[];
  chatType: ChatType;
  createdBy?: string;
  chatKey: string;
  chatKeyUser: string | null;
  join?: boolean;
};

export const Chat = ({
  className,
  initialMessages,
  chatKey,
  chatType,
  createdBy,
  chatKeyUser,
  join = false,
}: ChatProps) => {
  const currentUserId = useUserStore((s) => s.userId);
  const setInitialData = useChatStore((s) => s.setInitialData);

  const handleSendMessage = useSendMessage();

  useEffect(() => {
    if (currentUserId) {
      setInitialData(initialMessages, currentUserId, chatKey, chatType, createdBy, chatKeyUser);
    }
  }, [currentUserId, chatKey, initialMessages, setInitialData, chatType, createdBy, chatKeyUser]);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <MessageList currentUserId={currentUserId || ""} className="flex-1" />
      <ChatFooter onSendMessage={handleSendMessage} join={join} />
    </div>
  );
};
