import { useChatListStore } from "../model/useChatListStore";

export const optimisticDeleteMessage = (
  chatId: string,
  toUserId: string,
  lastMessageUid: string,
) => {
  const chats = useChatListStore.getState().chatsByKey;
  if (!chats) return;
  for (const chatKey in chats) {
    const chat = chats[chatKey];
    const currentChat =
      chat.type !== "chat" && chat.member.uid === toUserId
        ? chat
        : chat.type === "chat" && (chat.member.uid === chatId || chat.member.uid === toUserId)
          ? chat
          : null;
    if (currentChat && chat.lastMessage?.uid === lastMessageUid) {
      useChatListStore.getState().patchChat(chatKey, {
        lastMessage: {
          ...chat.lastMessage,
          content: "Сообщение удалено",
          new: false,
        },
      });
    }
  }
};
