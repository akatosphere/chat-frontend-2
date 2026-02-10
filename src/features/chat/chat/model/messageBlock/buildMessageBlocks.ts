import { MappedChatMessage } from "@/features/chat/chat/model/types/mappedTypes";

import { MessageBlock } from "./types";

export const buildMessageBlocks = (msg: MappedChatMessage): MessageBlock[] => {
  const blocks: MessageBlock[] = [];

  if (msg.repliedMessages.length > 0) {
    const r = msg.repliedMessages[0];
    blocks.push({
      type: "reply",
      messageUid: r.uid,
      authorName: r.firstName + " " + r.lastName,
      content: r.content,
    });
  }

  if (msg.forwardedMessages.length > 0) {
    const f = msg.forwardedMessages[0];
    blocks.push({
      type: "forwarded",
      authorName: `${f.firstName} ${f.lastName}`,
    });
  }

  if (msg.content) {
    blocks.push({
      type: "text",
      text: msg.content,
    });
  }

  for (const file of msg.filesList) {
    blocks.push({
      type: "file",
      fileName: file.file,
      url: file.fileUrl,
    });
  }

  return blocks;
};
