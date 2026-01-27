import { create } from "zustand";

import { ChatItemData } from "@/entities/chat/model/types";

import { ChatListState } from "./types";

type ChatListActions = {
  setChats: (payload: {
    results: ChatItemData[];
    count: number;
    next: string | null;
    append: boolean;
  }) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
};

export const useChatListStore = create<ChatListState & ChatListActions>((set) => ({
  chats: [],
  count: 0,
  next: null,
  isLoading: false,
  error: null,

  setChats: ({ results, next, count, append }) =>
    set((state) => {
      const merged = append ? [...state.chats, ...results] : results;

      const uniqueMap = new Map<number, ChatItemData>();
      for (const chat of merged) {
        uniqueMap.set(chat.id, chat);
      }

      return {
        chats: Array.from(uniqueMap.values()),
        next,
        count,
      };
    }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
