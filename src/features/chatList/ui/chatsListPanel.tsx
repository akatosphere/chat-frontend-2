"use client";

// import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { mockChats } from "../lib/data";
import { filterChats } from "../lib/filterChats";
import { ChatActions } from "../model/types";
import { ChatList } from "./chatList";
// import { useMediaQuery } from "./useMediaQuery";

type ChatsListPanelProps = {
  className?: string;
};

export const ChatsListPanel: React.FC<ChatsListPanelProps> = ({ className }) => {
  const [chats, setChats] = useState(mockChats.results);
  const [search, setSearch] = useState("");
  // const isMobile = useMediaQuery();
  // const pathname = usePathname();
  // const isChatsListPage = pathname === "/chats" || pathname === "/chats/";

  const actions: ChatActions = {
    toggleReadStatus: (chatId: number) => {
      setChats((prevChats) => {
        const chat = prevChats.find((c) => c.id === +chatId)!;
        if (!chat || !chat.last_message || chat.last_message.from_user === "me") return prevChats;
        if (chat.new_message_count === 0) {
          chat.new_message_count = 1;
          if (chat.last_message) chat.last_message.new = true;
          return [...prevChats];
        }
        chat.new_message_count = 0;
        if (chat.last_message) chat.last_message.new = false;
        return [...prevChats];
      });
    },

    deleteChat: (chatId: number) => {
      setChats((prevChats) => prevChats.filter((c) => c.id !== +chatId));
    },

    toggleFavorite: (chatId: number, pin: boolean) => {
      setChats((prevChats) => {
        const chat = prevChats.find((c) => c.id === +chatId)!;
        if (chat) chat.is_favorite = !pin;
        return [...prevChats];
      });
    },

    toggleMuteStatus: (chatId: number, mute: boolean) => {
      setChats((prevChats) => {
        const chat = prevChats.find((c) => c.id === +chatId)!;
        if (chat) chat.notifications = !mute;
        return [...prevChats];
      });
    },
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const filteredChats = filterChats(chats, search);
  return (
    // <div className={cn("", isMobile && !isChatsListPage && "hidden", className)}>
    <div className={cn("", className)}>
      <Searchbar onChange={onSearch} value={search} className="p-4" />
      <ChatList chats={filteredChats} isSearch={search.length > 0} actions={actions} />
    </div>
  );
};
