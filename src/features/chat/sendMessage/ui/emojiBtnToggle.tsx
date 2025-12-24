import EmojiBtn from "@icons/chat/emojiBtn.svg";

import { cn } from "@/shared/shadcn/lib/utils";
import { Toggle } from "@/shared/shadcn/ui/toggle";

type EmojiBtnToggleProps = {
  className?: string;
  pressed: boolean; // внешний стейт
  onToggle: () => void;
};

export const EmojiBtnToggle: React.FC<EmojiBtnToggleProps> = ({ className, pressed, onToggle }) => {
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={onToggle}
      className={cn("text-gray data-[state=on]:text-primary", className)}
    >
      <EmojiBtn className="h-5 w-5" />
    </Toggle>
  );
};
