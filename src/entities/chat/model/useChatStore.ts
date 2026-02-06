import { create } from "zustand";

import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { MappedChatMessage } from "../../../features/chat/chat/model/types/mappedTypes";
import { ChatType } from "../../../features/chat/chat/model/types/serverTypes";

interface ChatState {
  messages: MappedChatMessage[];
  currentUserId: string | null;
  chatKey: string | null;
  chatType: ChatType | null;
  createdBy: string | null;
  isReady: boolean;
  replyTarget: MappedChatMessage | null;
  setReplyTarget: (message: MappedChatMessage | null) => void;
  deleteMessage: (uid: string) => void;
  setInitialData: (
    messages: MappedChatMessage[],
    currentUserId: string,
    chatKey: string,
    chatType: ChatType,
    createdBy?: string,
  ) => void;
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
  chatType: null,
  createdBy: null,

  setInitialData: (messages, currentUserId, chatKey, chatType, createdBy) => {
    set({ messages, currentUserId, chatKey, isReady: true, chatType, createdBy });
  },

  setReplyTarget: (message) => set({ replyTarget: message }),

  deleteMessage: (uid) =>
    set((state) => ({ messages: state.messages.filter((msg) => msg.uid !== uid) })),

  addMessage: (message) => {
    set((state) => {
      // Проверяем наличие сообщения по uid — если есть, обновляем
      const existingByUidIndex = state.messages.findIndex((msg) => msg.uid === message.uid);
      if (existingByUidIndex !== -1) {
        const updated = [...state.messages];
        updated[existingByUidIndex] = message;
        return { messages: updated };
      }

      // Проверяем по requestUid — если есть, обновляем
      if (message.requestUid) {
        const existingByRequestUidIndex = state.messages.findIndex(
          (msg) => msg.requestUid === message.requestUid,
        );
        if (existingByRequestUidIndex !== -1) {
          const updated = [...state.messages];
          updated[existingByRequestUidIndex] = message;
          return { messages: updated };
        }
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
