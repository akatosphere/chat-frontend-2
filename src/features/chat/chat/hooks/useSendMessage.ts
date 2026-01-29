import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { sendTextMessage } from "@/entities/chat/api/sendMessage";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { mapChatMessage } from "../model/mapper";
import { buildMessageBlocks } from "../model/messageBlock/buildMessageBlocks";
import { useChatStore } from "../model/store/useChatStore";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { ChatType } from "../model/types/serverTypes";

export const useSendMessage = () => {
  const {
    currentUserId,
    chatKey,
    addMessage,
    setFailedStatus,
    replyTarget,
    setReplyTarget,
    chatType,
  } = useChatStore();

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
        repliedMessages: replyTarget
          ? [
              {
                id: replyTarget.id,
                uid: replyTarget.uid,
                firstName: replyTarget.fromUser.firstName,
                lastName: replyTarget.fromUser.lastName,
                fromUserId: replyTarget.fromUser.uid,
                content: replyTarget.content,
                filesList: replyTarget.filesList,
              },
            ]
          : [],
        forwardedMessages: [],
        filesList: [],
        isNew: true,
        createdAt: now,
        updatedAt: now,
        chatId: null,
        chatKey,
        blocks: [],
        chatType: chatType as ChatType,
        messageRtc: null,
        status: MESSAGE_STATUS.PENDING,
      };
      setReplyTarget(null);
      tempMessage.blocks = buildMessageBlocks(tempMessage);
      addMessage(tempMessage);

      try {
        const serverMessage = await sendTextMessage({
          chat_key: chatType !== "chat" ? chatKey : null,
          to_user_uid: chatType === "chat" ? chatKey : null,
          content: text,
          status: "publish",
          replied_messages: replyTarget ? [`${replyTarget.uid}`] : [],
          request_uid: requestUid,
        });

        const mapped = mapChatMessage(serverMessage);
        mapped.status = MESSAGE_STATUS.DELIVERED;
        mapped.requestUid = requestUid;
        addMessage(mapped);
      } catch (error) {
        console.error(error);
        setFailedStatus(requestUid);
      }
    },
    [currentUserId, chatKey, addMessage, setFailedStatus, replyTarget, setReplyTarget, chatType],
  );
};

export default useSendMessage;
