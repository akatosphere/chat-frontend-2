import { ChatItemData } from "../model/types";

export const getChatDisplayName = (chat: ChatItemData) => {
  const user = chat.chat;

  return (
    chat.name || `${user.first_name} ${user.last_name}`.trim() || user.username
  );
};
