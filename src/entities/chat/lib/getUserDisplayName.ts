import { ChatListItem } from "../model/types";

export const getChatDisplayName = (chat: ChatListItem): string => {
  if (chat.title) {
    return chat.title;
  }

  const user = chat.member;
  if (!user) {
    return "Чат";
  }

  return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.username || "Чат";
};
