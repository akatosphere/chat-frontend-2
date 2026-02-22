import { useChatStore } from "@/entities/chat/model/useChatStore";
import { useCopyToClipboard } from "@/shared/copy/lib/useCopyToClipboard";

export const useCopySelectedMessages = (uids: string[]) => {
  const { messages } = useChatStore();
  const { copy } = useCopyToClipboard();

  return async () => {
    let finalMessage = "";

    uids.forEach((uid) => {
      const message = messages.find((msg) => msg.uid === uid);
      if (!message) return;

      const author = message.fromUser.firstName
        ? `${message.fromUser.firstName} ${message.fromUser.lastName}`
        : message.fromUser.nickname;

      finalMessage += `${author}\n${message.content}\n\n`;
    });

    if (finalMessage) {
      await copy(finalMessage.trim());
    }
  };
};
