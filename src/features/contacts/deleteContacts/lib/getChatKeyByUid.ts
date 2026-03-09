import { ChatListItem } from "@/entities/chat/model/types";

export const getChatByUid = (
  uid: string,
  chatsByKey: Record<string, ChatListItem>,
): ChatListItem | undefined => {
  const foundEntry = Object.entries(chatsByKey).find(([_, chat]) => {
    console.log("условие: ", chat.member.uid == uid);
    return chat.member.uid == uid;
  });

  return foundEntry?.[1];
};
