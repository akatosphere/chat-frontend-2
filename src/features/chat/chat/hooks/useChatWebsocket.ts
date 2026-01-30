import { useEffect } from "react";

import { subscribeToWS } from "@/shared/api/ws/wsClient";
import { WS_ACTIONS } from "@/shared/constants/constants";

import { mapChatMessage } from "../model/mapper";
import { useChatStore } from "../model/store/useChatStore";
import { ChatMessage, ChatMessageUI } from "../model/types/serverTypes";

export const useChatWebSocket = (chatKey: string) => {
  const currentUserId = useChatStore((s) => s.currentUserId);
  const chatType = useChatStore((s) => s.chatType);
  const addMessage = useChatStore((s) => s.addMessage);

  useEffect(() => {
    if (!currentUserId || !chatKey) return;

    const unsubscribe = subscribeToWS((data) => {
      const currentChatKey = chatKey;
      if (!currentChatKey || currentChatKey !== chatKey) return;

      if (data.action === WS_ACTIONS.CREATE_TEXT_MESSAGE) {
        const newMessage = mapChatMessage(data.object as ChatMessageUI);

        console.log(
          "newMessage chatKey",
          newMessage.fromUser.uid === chatKey,
          "isUser",
          chatType === "chat",
          "chatType",
          chatType,
          "newMessage.chatType",
          newMessage.chatType,
        );

        // Проверяем, что сообщение относится к текущему чату
        if (newMessage.chatType === "chat" && newMessage.fromUser.uid !== chatKey) return;
        if (newMessage.chatType !== "chat" && newMessage.chatKey !== chatKey) return;

        // Пытаемся найти временное сообщение по requestUid
        const tempIndex = useChatStore
          .getState()
          .messages.findIndex((msg) => msg.requestUid && msg.requestUid === data.request_uid);

        if (tempIndex !== -1) {
          const updated = [...useChatStore.getState().messages];
          updated[tempIndex] = { ...newMessage };
          useChatStore.setState({ messages: updated });
          return;
        }

        // Проверяем наличие сообщения по uid
        if (useChatStore.getState().messages.some((msg) => msg.uid === newMessage.uid)) {
          return;
        }

        addMessage({ ...newMessage });
        return;
      }

      if (data.action === WS_ACTIONS.CHANGE_STATUS_READ_MESSAGE) {
        if (!data.object) return;

        const updatedMsg = mapChatMessage(data.object as ChatMessage);
        if (!updatedMsg.uid) return;

        // Прямое обновление стора
        useChatStore.setState((state) => ({
          messages: state.messages.map((msg) =>
            msg.uid === updatedMsg.uid ? { ...msg, isNew: false } : msg,
          ),
        }));
        return;
      }
    });

    return () => unsubscribe();
  }, [chatKey, currentUserId, addMessage, chatType]);
};
