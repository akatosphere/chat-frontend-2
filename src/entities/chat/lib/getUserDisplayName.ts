import { ChatItemData } from "../model/types";

// export const getChatDisplayName = (chat: ChatItemData) => {
//   const user = chat.chat;

//   return chat.name || `${user?.first_name} ${user?.last_name}`.trim() || user?.username;
// };

export const getChatDisplayName = (chat: ChatItemData): string => {
  if (chat.name) {
    return chat.name;
  }

  const user = chat.chat;
  if (!user) {
    return "Чат";
  }

  return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.username || "Чат";
};
