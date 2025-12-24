"use client";
import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { Message } from "../model/types";
import { MessageList } from "./messageList";
import { SendMessageForm } from "./sendMessageForm";

type ChatWidgetProps = {
  className?: string;
  initialMessages: Message[];
  currentUser: Message["author"];
};

export const ChatWidget = ({ className, initialMessages, currentUser }: ChatWidgetProps) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <div className="border-t p-3">
        <SendMessageForm currentUser={currentUser} onSend={handleSend} />
      </div>
    </div>
  );
};
