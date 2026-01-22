import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { sendTextMessage } from "@/entities/chat/api/sendMessage";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { mapChatMessage } from "../model/mapper";
import { useChatStore } from "../model/store/useChatStore";
import { MappedChatMessage } from "../model/types/mappedTypes";

export const useSendMessage = () => {
  const { currentUserId, chatKey, addMessage, setFailedStatus } = useChatStore();

  return useCallback(
    async (text: string) => {
      if (!text.trim() || !currentUserId || !chatKey) return;

      const requestUid = uuidv4();
      const now = Date.now() / 1000;

      const tempMessage: MappedChatMessage = {
        id: null,
        uid: uuidv4(),
        requestUid,
        fromUser: {
          uid: currentUserId,
          username: "",
          nickname: "",
          firstName: "",
          lastName: "",
          patronymic: "",
          avatar: "",
          avatarUrl: "",
          avatarWebp: "",
          avatarWebpUrl: "",
        },
        toUser: null,
        content: text,
        repliedMessages: [],
        forwardedMessages: [],
        filesList: [],
        isNew: true,
        createdAt: now,
        updatedAt: now,
        chatId: null,
        chatKey,
        chatType: "public-group",
        messageRtc: null,
        status: MESSAGE_STATUS.PENDING,
      };

      addMessage(tempMessage);

      try {
        const serverMessage = await sendTextMessage({
          chat_key: chatKey,
          content: text,
          status: "publish",
          request_uid: requestUid,
        });

        const mapped = mapChatMessage(serverMessage);
        mapped.status = MESSAGE_STATUS.DELIVERED;

        addMessage(mapped);
      } catch (error) {
        console.error(error);
        setFailedStatus(requestUid);
      }
    },
    [currentUserId, chatKey, addMessage, setFailedStatus],
  );
};

export default useSendMessage;
