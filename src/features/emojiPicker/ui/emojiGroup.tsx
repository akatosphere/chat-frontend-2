import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type EmojiGroupProps = {
  className?: string;
  emojis: string[];
  onEmojiSelect?: (emoji: string) => void;
  title: string;
};

export const EmojiGroup: React.FC<EmojiGroupProps> = ({
  className,
  emojis,
  onEmojiSelect,
  title,
}) => {
  return (
    <div className={cn("", className)}>
      <h4 className="text text-[#0000004D] font-semibold mb-4">{title}</h4>

      {emojis.length > 0 && (
        <div className={cn("flex flex-wrap gap-2 emojis")}>
          {emojis.map((emoji) => {
            return (
              <Button
                key={emoji}
                size={"inline"}
                variant={"text"}
                className="text-2xl w-8 h-8 hover:scale-105 active:scale-105 active:bg-gray-200  transition-all hover:bg-[#e4e4e4] rounded-md  duration-300 cursor-pointer"
                onClick={() => onEmojiSelect?.(emoji)}
              >
                {emoji}
              </Button>
            );
          })}
        </div>
      )}

      {emojis.length === 0 && (
        <span className="text text-[#0000004D]">
          Здесь будут отображаться недавние эмодзи.
        </span>
      )}
    </div>
  );
};
