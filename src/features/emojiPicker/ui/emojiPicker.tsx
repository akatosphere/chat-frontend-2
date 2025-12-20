"use client";
import { cn } from "@/shared/shadcn/lib/utils";
import { useState } from "react";
import { EmojiList } from "./emojiList";
import { EmojiCategories } from "./emojiCategories";
import { useRecentEmojiStore } from "../model/emojiRecentStore";
import { useEmojisCategories } from "../lib/useRecentEmojiStore";

type EmojiPickerProps = {
  className?: string;
  onEmojiSelect?: (emoji: string) => void;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  className,
  onEmojiSelect,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('smiles');
  const emojisCategories = useEmojisCategories();
  const recentEmojis = useRecentEmojiStore((state) => state.recent);
  const addRecent = useRecentEmojiStore((state) => state.addRecent);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect?.(emoji);
    if(recentEmojis.includes(emoji)) return
    addRecent(emoji);
  };


  return (
    <div
      className={cn(
        "w-[361px] desktop:w-[472px] shadow-[-8px_0px_20px_0px_#6C688A24] rounded-md",
        className
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
