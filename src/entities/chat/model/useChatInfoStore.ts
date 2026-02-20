import { create } from "zustand";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";

type ChatInfoState = {
  chatInfoByKey: Record<string, MappedChatDetails>;

  setChatInfo: (chatKey: string, data: MappedChatDetails) => void;
  patchChatInfo: (chatKey: string, patch: Partial<MappedChatDetails>) => void;
  removeChatInfo: (chatKey: string) => void;
  reset: () => void;
};

export const useChatInfoStore = create<ChatInfoState>((set) => ({
  chatInfoByKey: {},

  setChatInfo: (chatKey, data) =>
    set((state) => ({
      chatInfoByKey: { ...state.chatInfoByKey, [chatKey]: data },
    })),

  patchChatInfo: (chatKey, patch) =>
    set((state) => {
      const existing = state.chatInfoByKey[chatKey];
      if (!existing) return state;
      return {
        chatInfoByKey: {
          ...state.chatInfoByKey,
          [chatKey]: { ...existing, ...patch },
        },
      };
    }),

  removeChatInfo: (chatKey) =>
    set((state) => {
      const { [chatKey]: _, ...rest } = state.chatInfoByKey;
      return { chatInfoByKey: rest };
    }),

  reset: () => set({ chatInfoByKey: {} }),
}));
