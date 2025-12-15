"use client";
import { useState } from "react";
import { mockChats } from "../lib/data";
import { ChatListItem } from "./chatListItem";

export const ChatList = () => {
  const chats = mockChats.results;

  const [activeId, setActiveId] = useState<number>();

  return (
    <div className="flex flex-col desktop:w-[360px] w-full overflow-y-scroll px-2 bg-main-gray list-scrollbar">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={activeId === chat.id}
          onClick={() => setActiveId(chat.id)}
        />
      ))}
    </div>
  );
};
