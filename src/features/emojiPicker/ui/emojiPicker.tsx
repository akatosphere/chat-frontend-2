"use client";
import { cn } from "@/shared/shadcn/lib/utils";
import { useState } from "react";
import { EmojiList } from "./emojiList";
import { emojisCategories } from "../model/data";
import { EmojiCategories } from "./emojiCategories";

type EmojiPickerProps = {
  className?: string;
};

export const EmojiPickers: React.FC<EmojiPickerProps> = ({ className }) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    emojisCategories[0].id
  );

  return (
    <div
      className={cn(
        "w-[472px] shadow-[-8px_0px_20px_0px_#6C688A24] rounded-md",
        className
      )}
    >
      <EmojiList categoryId={activeCategory} />
      <EmojiCategories
        categories={emojisCategories}
        activeCategory={activeCategory}
        onClick={(categoryId) => setActiveCategory(categoryId)}
      />
    </div>
  );
};
