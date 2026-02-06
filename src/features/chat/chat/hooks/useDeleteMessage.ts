import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { deleteTextMessage } from "@/entities/chat/api/deleteMessage";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";

export const useDeleteMessage = () => {
  const { chatKey, deleteMessage } = useChatStore();
  return useCallback(
    async (uid: string, forAll: boolean) => {
      try {
        const deleteMessageWS = await deleteTextMessage({
          uid,
          chat_key: chatKey,
          for_all: forAll,
          request_uid: uuidv4(),
        });

        if (deleteMessageWS.uid) deleteMessage(uid);
      } catch (error) {
        console.error(`Ошибка в useDeleteMessage:`, error);
      }
    },
    [chatKey, deleteMessage],
  );
};
