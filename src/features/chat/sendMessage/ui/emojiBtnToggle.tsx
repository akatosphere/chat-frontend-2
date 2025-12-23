import EmojiBtn from "@icons/chat/emojiBtn.svg";

import { cn } from "@/shared/shadcn/lib/utils";
import { Toggle } from "@/shared/shadcn/ui/toggle";

type EmojiBtnToggleProps = {
  className?: string;
  handleToggle?: () => void;
};

export const EmojiBtnToggle: React.FC<EmojiBtnToggleProps> = ({ className, handleToggle }) => {
  return (
    <Toggle
      className={cn("text-gray data-[state=on]:text-primary", className)}
      onClick={handleToggle}
    >
      <EmojiBtn className="h-5 w-5" />
    </Toggle>
  );
};
