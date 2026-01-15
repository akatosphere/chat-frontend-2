"use client";

import { useEffect, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { getChatList } from "../api/getChatList";
import { filterChats } from "../lib/filterChats";
import { useChatList } from "../lib/useChatList";
import { useChatListStore } from "../model/store";
import { ChatList } from "./chatList";

type ChatsListPanelProps = {
  className?: string;
};

export const ChatsListPanel: React.FC<ChatsListPanelProps> = ({ className }) => {
  useChatList();

  const { chats, setChats, isLoading, error } = useChatListStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadAllChats = async () => {
      let url: string | undefined = undefined;

      while (!cancelled) {
        try {
          const res = await getChatList(url);
          setChats({
            results: res.results,
            next: res.next,
            count: res.count,
            append: !!url,
          });

          if (!res.next) break;
          url = res.next;
        } catch (err) {
          console.error("Ошибка при загрузке чатов", err);
          break;
        }
      }
    };

    loadAllChats();

    return () => {
      cancelled = true;
    };
  }, [setChats]);

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
    <div className={cn("flex h-full flex-col overflow-y-auto", className)}>
      <Searchbar onChange={onSearch} value={search} className="p-4" />
      <ChatList chats={filteredChats} isSearch={search.length > 0} />
    </div>
  );
};
