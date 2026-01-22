"use client";

import { useEffect } from "react";

import { useUserStore } from "@/entities/chat/model/userStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatFooter } from "@/widgets/chat/chatFooter/ui/chatFooter";

import { useSendMessage } from "../hooks";
import { useChatStore } from "../model/store/useChatStore";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { ChatType } from "../model/types/serverTypes";
import { MessageList } from "./messageList";

type ChatProps = {
  className?: string;
  initialMessages: MappedChatMessage[];
  chatType: ChatType;
  chatKey: string;
};

export const Chat = ({ className, initialMessages, chatKey }: ChatProps) => {
  const currentUserId = useUserStore((s) => s.userId);
  const setInitialData = useChatStore((s) => s.setInitialData);
  const initializeWebSocket = useChatStore((s) => s.initializeWebSocket);
  const disconnectWebSocket = useChatStore((s) => s.disconnectWebSocket);

  const handleSendMessage = useSendMessage();

  useEffect(() => {
    if (currentUserId) {
      setInitialData(initialMessages, currentUserId, chatKey);
      initializeWebSocket(chatKey);
    }

    return () => {
      disconnectWebSocket();
    };
  }, [
    currentUserId,
    chatKey,
    initialMessages,
    setInitialData,
    initializeWebSocket,
    disconnectWebSocket,
  ]);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <MessageList currentUserId={currentUserId || ""} className="flex-1" />
      <ChatFooter onSendMessage={handleSendMessage} />
    </div>
  );
};
