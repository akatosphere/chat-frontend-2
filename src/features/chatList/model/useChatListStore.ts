import { create } from "zustand";

import { ChatItemData, ChatListResponse } from "@/entities/chat/model/types";

type ChatsById = Record<number, ChatItemData>;

type ChatListState = {
  chatsById: ChatsById;
  order: number[];
  count: number;

  // ===== server sync =====
  mergeFromPages: (pages: ChatListResponse[]) => void;
  setCount: (count: number) => void;

  // ===== realtime / optimistic =====
  upsertChat: (chat: ChatItemData) => void;
  removeChat: (id: number) => void;

  // ===== UI =====
  typingByChat: Record<number, string[]>;
  setTyping: (chatId: number, users: string[]) => void;

  // ===== selectors =====
  getOrderedChats: () => ChatItemData[];
};

export const useChatListStore = create<ChatListState>((set, get) => ({
  chatsById: {},
  order: [],
  count: 0,
  typingByChat: {},

  // mergeFromPages: (pages) => {
  //   const next: ChatsById = { ...get().chatsById };
  //   for (const page of pages) {
  //     for (const chat of page.results) {
  //       next[chat.id] = chat;
  //     }
  //   }

  //   const order = Object.values(next)
  //     .sort((a, b) => (b.last_message?.created_at ?? 0) - (a.last_message?.created_at ?? 0))
  //     .map((c) => c.id);

  //   set({ chatsById: next, order });
  // },

  mergeFromPages: (pages) =>
    set((state) => {
      if (pages.length === state.count) {
        return state;
      }

      const next = { ...state.chatsById };

      for (const page of pages) {
        for (const chat of page.results) {
          next[chat.id] = chat;
        }
      }

      const order = Object.values(next)
        .sort((a, b) => (b.last_message?.created_at ?? 0) - (a.last_message?.created_at ?? 0))
        .map((c) => c.id);

      return {
        chatsById: next,
        order,
        mergedPagesCount: pages.length,
      };
    }),

  setCount: (count) => set({ count }),

  upsertChat: (chat) => {
    const next = { ...get().chatsById, [chat.id]: chat };

    const order = Object.values(next)
      .sort((a, b) => (b.last_message?.created_at ?? 0) - (a.last_message?.created_at ?? 0))
      .map((c) => c.id);

    set({ chatsById: next, order });
  },

  removeChat: (id) => {
    const next = { ...get().chatsById };
    delete next[id];

    set({
      chatsById: next,
      order: get().order.filter((x) => x !== id),
    });
  },

  setTyping: (chatId, users) =>
    set((state) => ({
      typingByChat: { ...state.typingByChat, [chatId]: users },
    })),

  getOrderedChats: () => {
    const { chatsById, order } = get();
    return order.map((id) => chatsById[id]).filter(Boolean);
  },
}));
