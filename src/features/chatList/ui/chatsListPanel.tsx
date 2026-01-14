"use client";

import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

// import { mockChats } from "../lib/data";
import { filterChats } from "../lib/filterChats";
import { useChatList } from "../lib/useChatList";
import { useChatListStore } from "../model/store";
import { ChatList } from "./chatList";

type ChatsListPanelProps = {
  className?: string;
};

export const ChatsListPanel: React.FC<ChatsListPanelProps> = ({ className }) => {
  // const chats = mockChats.results;

  useChatList();

  const { chats, isLoading, error } = useChatListStore();

  const [search, setSearch] = useState("");

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const filteredChats = filterChats(chats, search);

  if (isLoading) {
    return <div className="p-4">Загрузка чатов...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <Searchbar onChange={onSearch} value={search} className="p-4" />
      <ChatList chats={filteredChats} isSearch={search.length > 0} className="" />
    </div>
  );
};
