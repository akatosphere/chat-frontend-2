import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentEmojiState = {
  recent: string[];
  addRecent: (emoji: string) => void;
};

export const useRecentEmojiStore = create<RecentEmojiState>()(
  persist(
    (set) => ({
      recent: [],
      addRecent: (emoji) =>
        set((state) => ({
          recent: [emoji, ...state.recent.filter((e) => e !== emoji)].slice(0, 11),
        })),
    }),
    { name: "recent-emojis" },
  ),
);
