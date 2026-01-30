"use client";

import { useEffect } from "react";

import { useUserStore } from "@/entities/chat/model/userStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatFooter } from "@/widgets/chat/chatFooter/ui/chatFooter";

import { useChatWebSocket, useSendMessage } from "../hooks";
import { useChatStore } from "../model/store/useChatStore";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { ChatType } from "../model/types/serverTypes";
import { MessageList } from "./messageList";

type ChatProps = {
  className?: string;
  initialMessages: MappedChatMessage[];
  chatType: ChatType;
  createdBy?: string;
  chatKey: string;
};

export const Chat = ({ className, initialMessages, chatKey, chatType, createdBy }: ChatProps) => {
  const currentUserId = useUserStore((s) => s.userId);
  const setInitialData = useChatStore((s) => s.setInitialData);

  const handleSendMessage = useSendMessage();

  useChatWebSocket(chatKey);

  useEffect(() => {
    if (currentUserId) {
      setInitialData(initialMessages, currentUserId, chatKey, chatType, createdBy);
    }
  }, [currentUserId, chatKey, initialMessages, setInitialData, chatType, createdBy]);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <MessageList currentUserId={currentUserId || ""} className="flex-1" />
      <ChatFooter onSendMessage={handleSendMessage} />
    </div>
  );
};
