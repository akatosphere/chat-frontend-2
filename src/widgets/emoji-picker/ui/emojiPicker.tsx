"use client";
import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { useEmojisCategories } from "../../../features/emojiPicker/lib/useRecentEmojiStore";
import { useRecentEmojiStore } from "../../../features/emojiPicker/model/emojiRecentStore";
import { EmojiCategories } from "./emojiCategories";
import { EmojiList } from "./emojiList";

type EmojiPickerProps = {
  className?: string;
  onEmojiSelect?: (emoji: string) => void;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ className, onEmojiSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string>("smiles");
  const emojisCategories = useEmojisCategories();
  const recentEmojis = useRecentEmojiStore((state) => state.recent);
  const addRecent = useRecentEmojiStore((state) => state.addRecent);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect?.(emoji);
    if (recentEmojis.includes(emoji)) return;
    addRecent(emoji);
  };

  return (
    <div
      className={cn(
        "desktop:w-[472px] w-[361px] rounded-md shadow-[-8px_0px_20px_0px_#6C688A24]",
        className,
      )}
    >
      <EmojiList
        categoryId={activeCategory}
        onEmojiSelect={handleEmojiSelect}
        categories={emojisCategories}
      />
      <EmojiCategories
        categories={emojisCategories}
        activeCategory={activeCategory}
        onClick={(categoryId) => setActiveCategory(categoryId)}
      />
    </div>
  );
};
