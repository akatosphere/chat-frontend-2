"use client";

import { useEffect, useState } from "react";

import { CreateChatBtn } from "@/features/createChat/ui/createChatBtn";
import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { getChatList } from "../api/getChatList";
import { filterChats } from "../lib/filterChats";
import { useChatList } from "../lib/useChatList";
import { useChatListStore } from "../model/store";
import { ChatActions } from "../model/types";
import { ChatList } from "./chatList";

type ChatsListPanelProps = {
  className?: string;
};

export const ChatsListPanel: React.FC<ChatsListPanelProps> = ({ className }) => {
  useChatList();

  const { chats, isLoading, error, setChats, updateChat, removeChat } = useChatListStore();
  const [search, setSearch] = useState("");

  const actions: ChatActions = {
    toggleReadStatus: (chatId: number) => {
      updateChat(chatId, (chat) => {
        if (!chat.last_message) return chat;

        if (chat.last_message.from_user === "me") {
          return {
            ...chat,
            new_message_count: 0,
            new_file_count: 0,
            last_message: { ...chat.last_message, new: false },
          };
        }

        const hasUnread = chat.new_message_count > 0 || chat.new_file_count > 0;
        if (hasUnread) {
          return {
            ...chat,
            new_message_count: 0,
            new_file_count: 0,
            last_message: { ...chat.last_message, new: false },
          };
        }

        const hasFiles = Boolean(chat.last_message.files_summary);
        return {
          ...chat,
          new_message_count: hasFiles ? 0 : 1,
          new_file_count: hasFiles ? 1 : 0,
          last_message: { ...chat.last_message, new: true },
        };
      });
    },

    deleteChat: (chatId: number) => {
      removeChat(chatId);
    },

    toggleFavorite: (chatId: number, pin: boolean) => {
      updateChat(chatId, (chat) => ({
        ...chat,
        is_favorite: !pin,
      }));
    },

    toggleMuteStatus: (chatId: number, mute: boolean) => {
      updateChat(chatId, (chat) => ({
        ...chat,
        notifications: !mute,
      }));
    },
  };

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
      <div className="flex flex-row gap-4 p-4 pr-6">
        <Searchbar onChange={onSearch} value={search} className="flex-1" />
        <CreateChatBtn />
      </div>
      <ChatList chats={filteredChats} isSearch={search.length > 0} actions={actions} />
    </div>
  );
};
