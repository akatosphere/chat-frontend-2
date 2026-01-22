import { create } from "zustand";

import { subscribeToWS } from "@/shared/api/wsClient";
import { MESSAGE_STATUS, WS_ACTIONS } from "@/shared/constants/constants";

import { mapChatMessage } from "../mapper";
import { MappedChatMessage } from "../types/mappedTypes";
import { ChatMessage, ChatMessageUI } from "../types/serverTypes";

interface ChatState {
  messages: MappedChatMessage[];
  currentUserId: string | null;
  chatKey: string | null;
  isReady: boolean;
  setInitialData: (messages: MappedChatMessage[], currentUserId: string, chatKey: string) => void;
  addMessage: (message: MappedChatMessage) => void;
  updateMessageStatus: (uid: string, status: MappedChatMessage["status"]) => void;
  markAsRead: (uid: string) => void;
  setFailedStatus: (requestUid: string) => void;
  initializeWebSocket: (chatKey: string) => void;
  disconnectWebSocket: () => void;
}

interface InternalState extends ChatState {
  unsubscribeWs: (() => void) | null;
}

export const useChatStore = create<InternalState>((set, get) => ({
  messages: [],
  currentUserId: null,
  chatKey: null,
  isReady: false,
  unsubscribeWs: null,

  setInitialData: (messages, currentUserId, chatKey) => {
    set({ messages, currentUserId, chatKey, isReady: true });
  },

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

  initializeWebSocket: (chatKey) => {
    const { currentUserId } = get();
    if (!currentUserId) return;

    const currentState = get();
    if (currentState.unsubscribeWs) {
      currentState.unsubscribeWs();
    }

    const unsubscribe = subscribeToWS((data) => {
      // Используем замыкание для текущего chatKey
      const currentChatKey = get().chatKey;
      if (!currentChatKey || currentChatKey !== chatKey) return;

      if (data.action === WS_ACTIONS.CREATE_TEXT_MESSAGE) {
        const newMessage = mapChatMessage(data.object as ChatMessageUI);

        // Проверяем, что сообщение относится к текущему чату
        if (newMessage.chatKey !== chatKey) return;

        set((state) => {
          // Пытаемся найти временное сообщение по requestUid
          const tempIndex = state.messages.findIndex(
            (msg) => msg.requestUid && msg.requestUid === data.request_uid,
          );

          if (tempIndex !== -1) {
            const updated = [...state.messages];
            updated[tempIndex] = { ...newMessage, status: MESSAGE_STATUS.DELIVERED };
            return { messages: updated };
          }

          // Проверяем наличие сообщения по uid
          if (state.messages.some((msg) => msg.uid === newMessage.uid)) return state;

          return {
            messages: [...state.messages, { ...newMessage, status: MESSAGE_STATUS.DELIVERED }],
          };
        });

        return;
      }

      if (data.action === WS_ACTIONS.CHANGE_STATUS_READ_MESSAGE) {
        const updatedMsg = mapChatMessage(data.object as ChatMessage);
        if (!updatedMsg.uid) return;

        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.uid === updatedMsg.uid ? { ...msg, isNew: false } : msg,
          ),
        }));

        return;
      }
    });

    set({ unsubscribeWs: unsubscribe, chatKey });
  },

  disconnectWebSocket: () => {
    const { unsubscribeWs } = get();
    if (unsubscribeWs) {
      unsubscribeWs();
      set({ unsubscribeWs: null });
    }
  },
}));
