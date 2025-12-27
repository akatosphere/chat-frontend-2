import { ChatItemData } from "@/entities/chat/model/types";

export const filterChats = (chats: ChatItemData[], search: string) => {
  const q = search.trim().toLowerCase();
  if (!chats || !chats.length) return [];
  /* eslint-disable */
  const filtered = !q
    ? [...chats]
    : chats.filter((chat) => {
        if (chat.name?.toLowerCase().includes(q)) return true;

        const full = `${chat.chat.first_name} ${chat.chat.last_name}`.trim();
        if (full.toLowerCase().includes(q)) return true;

        if (chat.chat.nickname?.toLowerCase().includes(q)) return true;
        if (chat.chat.username?.toLowerCase().includes(q)) return true;

        if (chat.last_message?.content?.toLowerCase().includes(q)) return true;

        return false;
      });
  /* eslint-enable */

  return filtered.sort((a, b) => {
    if (a.is_favorite && !b.is_favorite) return -1;
    if (!a.is_favorite && b.is_favorite) return 1;

    const aDate = a.last_message?.created_at ? new Date(a.last_message.created_at).getTime() : 0;
    const bDate = b.last_message?.created_at ? new Date(b.last_message.created_at).getTime() : 0;

    return bDate - aDate;
  });
};
