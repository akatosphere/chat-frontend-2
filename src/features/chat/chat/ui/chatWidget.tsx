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
    console.log("id:", message.id);
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>

      <ChatFooter onSendMessage={handleSendMessage} />
    </div>
  );
};
