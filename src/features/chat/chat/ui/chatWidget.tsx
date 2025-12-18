"use client";
import { useState } from "react";
import { Message } from "../model/types";
import { MessageList } from "./messageList";
import { SendMessageForm } from "./sendMessageForm";

type Props = {
  initialMessages: Message[];
  currentUser: Message["author"];
};

export const ChatWidget = ({ initialMessages, currentUser }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <div className="p-3 border-t">
        <SendMessageForm currentUser={currentUser} onSend={handleSend} />
      </div>
    </div>
  );
};
