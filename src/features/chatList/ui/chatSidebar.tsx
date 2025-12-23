"use client";

import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { mockChats } from "../lib/data";
import { filterChats } from "../lib/filterChats";
import { ChatList } from "./chatList";
import { Searchbar } from "./searchbar";

type ChatSidebarProps = {
  className?: string;
};

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ className }) => {
  const chats = mockChats.results;

  const [search, setSearch] = useState("");

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const filteredChats = filterChats(chats, search);
  return (
    <div
      className={cn(
        "desktop:w-[360px] bg-main-gray desktop:min-h-[936px] desktop:max-h-[936px] flex h-[100dvh] flex-col",
        className,
      )}
    >
      <Searchbar onChange={onSearch} value={search} className="p-4" />
      <ChatList chats={filteredChats} isSearch={search.length > 0} />
    </div>
  );
};
