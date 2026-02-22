import { MappedChatMessage } from "@/features/chat/chat/model/types/mappedTypes";

import { MessageBlock } from "./types";

export const buildMessageBlocks = (msg: MappedChatMessage): MessageBlock[] => {
  const blocks: MessageBlock[] = [];
  if (msg.forwardedMessages.length > 0) {
    const f = msg.forwardedMessages;
    f.map((f) => {
      blocks.push({
        type: "forwarded",
        content: f.content,
        authorName: `${f.firstName} ${f.lastName}`,
        avatarUrl: f.avatarUrl,
        chatKey: f.fromUserId,
      });
    });
  }
  if (msg.repliedMessages.length > 0) {
    const r = msg.repliedMessages[0];
    blocks.push({
      type: "reply",
      messageUid: r.uid,
      authorName: r.firstName + " " + r.lastName,
      content: r.content,
    });
  }

  if (msg.filesList.length > 0) {
    blocks.push({
      type: "media",
      items: msg.filesList.map((file) => ({
        id: file.id,
        type: "image",
        src: file.fileUrl,
      })),
    });
  }

  if (msg.content) {
    blocks.push({
      type: "text",
      text: msg.content,
    });
  }

  return blocks;
};
