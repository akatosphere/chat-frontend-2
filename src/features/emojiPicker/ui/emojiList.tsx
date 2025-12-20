import { cn } from "@/shared/shadcn/lib/utils";
import { emojisCategories } from "../model/data";

type EmojiListProps = {
  className?: string;
  categoryId: string;
};

export const EmojiList: React.FC<EmojiListProps> = ({
  className,
  categoryId,
}) => {
  const category = emojisCategories.find((c) => c.id === categoryId);
  const emojis = category?.emojis || [];

  return (
    <div className="p-5 pr-3 overflow-y-auto max-h-[448px] min-h-[448px]">
      <h4 className="text text-[#0000004D] font-semibold mb-4">
        {category?.title}
      </h4>
      <div className={cn("flex flex-wrap gap-2 emojis ", className)}>
        {emojis.map((emoji) => {
          return (
            <button
              key={emoji}
              className="text-2xl w-8 h-8 hover:scale-110 transition-all hover:bg-[#e4e4e4] rounded-md  duration-300 cursor-pointer"
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
};
