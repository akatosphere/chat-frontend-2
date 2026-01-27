import { create } from "zustand";

import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { MappedChatMessage } from "../types/mappedTypes";

interface ChatState {
  messages: MappedChatMessage[];
  currentUserId: string | null;
  chatKey: string | null;
  isReady: boolean;
  replyTarget: MappedChatMessage | null;
  setReplyTarget: (message: MappedChatMessage | null) => void;
  setInitialData: (messages: MappedChatMessage[], currentUserId: string, chatKey: string) => void;
  addMessage: (message: MappedChatMessage) => void;
  updateMessageStatus: (uid: string, status: MappedChatMessage["status"]) => void;
  markAsRead: (uid: string) => void;
  setFailedStatus: (requestUid: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentUserId: null,
  chatKey: null,
  isReady: false,
  replyTarget: null,

  setInitialData: (messages, currentUserId, chatKey) => {
    set({ messages, currentUserId, chatKey, isReady: true });
  },

  setReplyTarget: (message) => set({ replyTarget: message }),

  addMessage: (message) => {
    set((state) => {
      // Проверяем наличие сообщения по uid
      if (state.messages.some((msg) => msg.uid === message.uid)) {
        return state;
      }

      // Также проверяем по requestUid для временных сообщений
      if (
        message.requestUid &&
        state.messages.some((msg) => msg.requestUid === message.requestUid)
      ) {
        return state;
      }

      return { messages: [...state.messages, message] };
    });
  },

  updateMessageStatus: (uid, status) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.uid === uid ? { ...msg, status } : msg)),
    }));
  },

  markAsRead: (uid) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.uid === uid ? { ...msg, isNew: false } : msg)),
    }));
  },

  setFailedStatus: (requestUid) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.requestUid === requestUid ? { ...msg, status: MESSAGE_STATUS.FAILED } : msg,
      ),
    }));
  },
}));
