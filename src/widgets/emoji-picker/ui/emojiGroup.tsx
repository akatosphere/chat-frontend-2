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
      <h4 className="text mb-4 font-semibold text-[#0000004D]">{title}</h4>

      {emojis.length > 0 && (
        // emojis-apple - apple эмодзи, emojis-google - google эмодзи
        <div className={cn("emojis-apple flex flex-wrap gap-2")}>
          {emojis.map((emoji) => {
            return (
              <Button
                key={emoji}
                size={"inline"}
                variant={"text"}
                className="h-8 w-8 cursor-pointer rounded-md text-2xl transition-all duration-300 hover:scale-105 hover:bg-[#e4e4e4] active:scale-105 active:bg-gray-200"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onEmojiSelect?.(emoji);
                }}
              >
                {emoji}
              </Button>
            );
          })}
        </div>
      )}

      {emojis.length === 0 && (
        <span className="text text-[#0000004D]">Здесь будут отображаться недавние эмодзи.</span>
      )}
    </div>
  );
};
