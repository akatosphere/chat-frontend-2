import { ChatListItem } from "@/entities/chat/model/types";

export const applyChatOrder = (
  order: string[],
  chatsByKey: Record<string, ChatListItem>,
  touchedKey?: string,
) => {
  const next = touchedKey ? [touchedKey, ...order.filter((k) => k !== touchedKey)] : [...order];

  return next.sort((aKey, bKey) => {
    const a = chatsByKey[aKey];
    const b = chatsByKey[bKey];
    if (!a || !b) return 0;

    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1;
    }

    return (b.lastMessage?.created_at ?? 0) - (a.lastMessage?.created_at ?? 0);
  });
};
