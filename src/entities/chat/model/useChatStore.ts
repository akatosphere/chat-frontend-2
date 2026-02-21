import { create } from "zustand";

import { MappedChatMessage } from "@/features/chat/chat/model/types/mappedTypes";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { ChatType } from "./types";

interface ChatState {
  messages: MappedChatMessage[];
  currentUserId: string | null;
  chatKey: string | null;
  chatType: ChatType | null;
  createdBy: string | null;
  isReady: boolean;
  isHide: boolean;
  chatKeyUser: string | null;

  replyTarget: MappedChatMessage | null;
  forwardTarget: MappedChatMessage | null;

  setReplyTarget: (message: MappedChatMessage | null) => void;
  setForwardTarget: (message: MappedChatMessage | null) => void;

  isSelectionMode: boolean;
  selectedMessageUids: Set<string>;

  enterSelectionMode: (uid?: string) => void;
  toggleMessageSelection: (uid: string) => void;
  exitSelectionMode: () => void;

  deleteMessage: (uid: string) => void;
  setInitialData: (
    messages: MappedChatMessage[],
    currentUserId: string,
    chatKey: string,
    chatType: ChatType,
    createdBy?: string,
    chatKeyUser?: string | null,
  ) => void;
  addMessage: (message: MappedChatMessage) => void;
  updateMessageStatus: (uid: string, status: MappedChatMessage["status"]) => void;
  markAsRead: (uid: string) => void;
  setFailedStatus: (requestUid: string) => void;
  clearMessages: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentUserId: null,
  chatKey: null,
  isReady: false,
  isHide: false,
  replyTarget: null,
  forwardTarget: null,
  chatType: null,
  createdBy: null,
  chatKeyUser: null,
  isSelectionMode: false,
  selectedMessageUids: new Set(),

  enterSelectionMode: (uid) =>
    set(() => ({
      isSelectionMode: true,
      selectedMessageUids: uid ? new Set([uid]) : new Set(),
    })),

  toggleMessageSelection: (uid) =>
    set((state) => {
      const next = new Set(state.selectedMessageUids);
      next.has(uid) ? next.delete(uid) : next.add(uid);

      return {
        selectedMessageUids: next,
        isSelectionMode: next.size > 0,
      };
    }),

  exitSelectionMode: () =>
    set(() => ({
      isSelectionMode: false,
      selectedMessageUids: new Set(),
    })),

  setInitialData: (messages, currentUserId, chatKey, chatType, createdBy, chatKeyUser) => {
    set({ messages, currentUserId, chatKey, isReady: true, chatType, createdBy, chatKeyUser });
  },

  setReplyTarget: (message) => set({ replyTarget: message }),
  setForwardTarget: (message) => set({ forwardTarget: message }),

  deleteMessage: (uid) =>
    set((state) => ({ messages: state.messages.filter((msg) => msg.uid !== uid) })),

  addMessage: (message) => {
    set((state) => {
      const existingByUidIndex = state.messages.findIndex((msg) => msg.uid === message.uid);
      if (existingByUidIndex !== -1) {
        const updated = [...state.messages];
        updated[existingByUidIndex] = message;
        return { messages: updated };
      }

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

  clearMessages: () => set({ messages: [], replyTarget: null }),

  reset: () =>
    set({
      messages: [],
      currentUserId: null,
      chatKey: null,
      isReady: false,
      replyTarget: null,
      forwardTarget: null,
    }),
}));
