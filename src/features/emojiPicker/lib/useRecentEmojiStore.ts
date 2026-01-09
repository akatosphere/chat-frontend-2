import type { EmojiCategory } from "../model/data";
import { emojisCategories as originalCategories } from "../model/data";
import { useRecentEmojiStore } from "../model/emojiRecentStore";

export const useEmojisCategories = (): EmojiCategory[] => {
  const recent = useRecentEmojiStore((state) => state.recent);

  return [
    { ...originalCategories.find((c) => c.id === "recent")!, emojis: recent },
    ...originalCategories.filter((c) => c.id !== "recent"),
  ];
};
