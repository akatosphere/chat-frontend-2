import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { sendTextMessage } from "@/entities/chat/api/sendMessage";
import { PendingImage } from "@/features/chat/chat/model/store/useChatSendImagesStore";
import { optimisticSendMessage } from "@/features/chatList/lib/optimisticSendMessage";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";
import { mapChatMessage } from "../model/mapper";
import { buildMessageBlocks } from "../model/messageBlock/buildMessageBlocks";
import { PendingFile } from "../model/store/useChatSendFilesStore";
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
    forwardTargets,
    setForwardTargets,
    setReplyTarget,
  } = useChatStore();

  const sendSingleMessage = useCallback(
    async (text: string, images: PendingImage[], files: PendingFile[]) => {
      if (!currentUserId || !chatKey) return;

      const requestUid = uuidv4();
      const now = Date.now() / 1000;

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
        forwardedMessages: forwardTargets.map((msg) => ({
          id: msg.id,
          uid: msg.uid,
          firstName: msg.fromUser.firstName,
          lastName: msg.fromUser.lastName,
          fromUserId: msg.fromUser.uid,
          avatarUrl: "",
          content: msg.content,
          filesList: msg.filesList,
        })),
        filesList: [
          ...images.map((img) => ({
            id: img.id,
            uid: `${img.id}-${uuidv4()}`,
            file: img.file,
            name: img.file.name,
            type: "image",
            fileUrl: "/icons/imageLoader.svg",
            createdAt: now,
            updatedAt: now,
            fileType: "image/png",
            fileWebp: null,
            fileWebpUrl: "",
          })),
          ...files.map((file) => ({
            id: Number(file.id),
            uid: `${file.id}-${uuidv4()}`,
            file: file.file,
            name: file.file.name,
            type: file.type,
            fileUrl: "",
            createdAt: now,
            updatedAt: now,
            fileType: file.type,
            fileWebp: null,
            fileWebpUrl: "",
          })),
        ],
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
      setForwardTargets([]);

      const allFiles = [...images.map((i) => i.file), ...files.map((f) => f.file)];

      const filesPayload = await Promise.all(
        allFiles.map(async (file) => {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          return { filename: file.name, data: base64 };
        }),
      );

      optimisticSendMessage({
        chatKey: tempMessage.chatKey,
        message: {
          id: tempMessage.id,
          uid: tempMessage.uid,
          content: tempMessage.content,
          files_summary: {
            types: images.map((f) => f.type).concat(files.map((f) => f.type)),
            count: tempMessage.filesList.length,
          },
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
          forwarded_messages: forwardTargets.map((m) => m.uid),
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
      chatKeyUser,
      addMessage,
      setFailedStatus,
      replyTarget,
      forwardTargets,
      setReplyTarget,
      setForwardTargets,
    ],
  );

  return useCallback(
    async (text: string, images: PendingImage[] = [], files: PendingFile[] = []) => {
      if (images.length) {
        await sendSingleMessage(text, images, []);
        return;
      }

      if (files.length) {
        if (text.trim().length > 0) await sendSingleMessage(text, [], []);
        for (let i = 0; i < files.length; i++) {
          await sendSingleMessage("", [], [files[i]]);
        }
        return;
      }

      await sendSingleMessage(text, [], []);
    },

    [sendSingleMessage],
  );
};
