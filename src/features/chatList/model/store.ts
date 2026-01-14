import { create } from "zustand";

import { ChatListState } from "./types";

type ChatListActions = {
  setChats: (chats: ChatListState["chats"]) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
};

export const useChatListStore = create<ChatListState & ChatListActions>((set) => ({
  chats: [],
  isLoading: false,
  error: null,

  setChats: (chats) => set({ chats }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
