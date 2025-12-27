"use client";
import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { ChatFooter } from "@/widgets/chat/chatFooter/ui/chatFooter";

import { Message } from "../model/types";
import { MessageList } from "./messageList";

type ChatWidgetProps = {
  className?: string;
  initialMessages: Message[];
  currentUser: Message["author"];
};

export const ChatWidget = ({ className, initialMessages, currentUser }: ChatWidgetProps) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (text: string) => {
    const message: Message = {
      id: Math.random(),
      content: text,
      author: currentUser,
      files: [],
      createdAt: new Date(),
      isMine: true,
      status: "delivered",
      uid: `msg-${crypto.randomUUID()}`,
    };
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <MessageList className="flex-1" messages={messages} />

      <ChatFooter onSendMessage={handleSendMessage} />
    </div>
  );
};
