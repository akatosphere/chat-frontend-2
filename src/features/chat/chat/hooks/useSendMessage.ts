import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { sendTextMessage } from "@/entities/chat/api/sendMessage";
import { optimisticSendMessage } from "@/features/chatList/lib/optimisticSendMessage";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";
import { mapChatMessage } from "../model/mapper";
import { buildMessageBlocks } from "../model/messageBlock/buildMessageBlocks";
import { PendingMedia } from "../model/store/useChatSendImagesStore";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { ChatType } from "../model/types/serverTypes";

export const useSendMessage = () => {
  const {
    currentUserId,
    chatKey,
    chatKeyUser,
    chatType,
    addMessage,
    setFailedStatus,
    replyTarget,
    forwardTarget,
    setForwardTarget,
    setReplyTarget,
  } = useChatStore();

  return useCallback(
    async (text: string, images: PendingMedia[] = []) => {
      // if (!text.trim() && images.length === 0) return; // не отправляем пустое
      if (!currentUserId || !chatKey) return;

      const requestUid = uuidv4();
      const now = Date.now() / 1000;

      // Подготавливаем временное сообщение
      const tempMessage: MappedChatMessage = {
        id: Math.random(),
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
        content: text || " ",
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
        forwardedMessages: forwardTarget
          ? [
              {
                id: forwardTarget.id,
                uid: forwardTarget.uid,
                firstName: forwardTarget.fromUser.firstName,
                lastName: forwardTarget.fromUser.lastName,
                fromUserId: forwardTarget.fromUser.uid,
                avatarUrl: "",
                content: forwardTarget.content,
                filesList: forwardTarget.filesList,
              },
            ]
          : [],
        filesList: images.map((img) => ({
          fileUrl: "/icons/imageLoader.svg",
          file: img.file,
          id: img.id,
          uid: img.id + uuidv4(),
          fileWebpUrl: "",
          fileType: "",
          fileWebp: null,
          createdAt: now,
          updatedAt: now,
          name: img.file.name,
          type: "image",
        })),
        isNew: true,
        createdAt: now,
        updatedAt: now,
        chatId: null,
        chatKey: chatType === "chat" ? chatKeyUser || chatKey : chatKey,
        blocks: [],
        chatType: chatType as ChatType,
        messageRtc: null,
        status: MESSAGE_STATUS.PENDING,
      };

      tempMessage.blocks = buildMessageBlocks(tempMessage);
      addMessage(tempMessage);
      setReplyTarget(null);
      setForwardTarget(null);

      // Подготовка файлов для отправки на сервер
      const filesPayload = await Promise.all(
        images.map(async (img) => {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              const result = reader.result as string;
              resolve(result.split(",")[1]);
            };

            reader.onerror = reject;
            reader.readAsDataURL(img.file);
          });

          return {
            filename: img.file.name,
            data: base64,
          };
        }),
      );

      optimisticSendMessage({
        chatKey: tempMessage.chatKey,
        message: {
          id: tempMessage.id,
          uid: tempMessage.uid,
          content: tempMessage.content,
          files_summary: { types: ["image/png"], count: images.length },
          created_at: now,
          from_user_id: currentUserId,
        },
      });

      try {
        const serverMessage = await sendTextMessage({
          chat_key: chatType !== "chat" ? chatKey : null,
          to_user_uid: chatType === "chat" ? chatKey : null,
          content: text,
          files: filesPayload,
          status: "publish",
          replied_messages: replyTarget ? [`${replyTarget.uid}`] : [],
          forwarded_messages: forwardTarget ? [`${forwardTarget.uid}`] : [],
          request_uid: requestUid,
        });

        const mapped = mapChatMessage(serverMessage);
        mapped.status = MESSAGE_STATUS.DELIVERED;
        mapped.requestUid = requestUid;

        const chatState = useChatStore.getState();
        const tempIndex = chatState.messages.findIndex((m) => m.requestUid === requestUid);
        if (tempIndex !== -1) {
          const updated = [...chatState.messages];
          updated[tempIndex] = mapped;
          useChatStore.setState({ messages: updated });
        } else {
          addMessage(mapped);
        }

        optimisticSendMessage({
          chatKey: mapped.chatKey,
          message: {
            id: mapped.id,
            uid: mapped.uid,
            content: mapped.content,
            files_summary: {
              types: mapped.filesList.map((f) => f.fileType).filter((t): t is string => t !== null),
              count: mapped.filesList.length,
            },
            created_at: mapped.createdAt,
            from_user_id: mapped.fromUser.uid,
          },
        });
      } catch (error) {
        console.error(error);
        setFailedStatus(requestUid);
      }
    },
    [
      currentUserId,
      chatKey,
      chatType,
      addMessage,
      setFailedStatus,
      replyTarget,
      setReplyTarget,
      setForwardTarget,
      forwardTarget,
      chatKeyUser,
    ],
  );
};
