import { cn } from "@/shared/shadcn/lib/utils";

import { EmojiCategory } from "../../../features/emojiPicker/model/data";
import { EmojiGroup } from "./emojiGroup";

type EmojiListProps = {
  className?: string;
  categoryId: string;
  categories: EmojiCategory[];
  onEmojiSelect?: (emoji: string) => void;
};

export const EmojiList: React.FC<EmojiListProps> = ({
  className,
  categoryId,
  categories,
  onEmojiSelect,
}) => {
  const category = categories.find((c) => c.id === categoryId);
  const recentCategory = categories.find((c) => c.id === "recent");
  const emojis = category?.emojis || [];
  const recentEmojis = recentCategory?.emojis || [];

  return (
    <div className={cn("max-h-[448px] min-h-[448px] overflow-y-auto p-5 pr-2", className)}>
      {recentEmojis.length > 0 && (
        <EmojiGroup
          key={recentCategory?.id}
          emojis={recentEmojis}
          onEmojiSelect={onEmojiSelect}
          title={recentCategory?.title || "Недавние"}
        />
      )}
      {category?.id === "recent" && recentEmojis.length === 0 && (
        <EmojiGroup
          key={recentCategory?.id}
          emojis={[]}
          onEmojiSelect={onEmojiSelect}
          title={recentCategory?.title || "Недавние"}
        />
      )}
      {category?.id !== "recent" && (
        <EmojiGroup
          key={category?.id}
          className={cn(recentEmojis.length > 0 && "mt-5")}
          emojis={emojis}
          onEmojiSelect={onEmojiSelect}
          title={category?.title || "Эмоджи"}
        />
      )}
    </div>
  );
};
