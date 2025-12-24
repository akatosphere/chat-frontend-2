import EmojiBtn from "@icons/chat/emojiBtn.svg";
import Keyboard from "@icons/chat/keyboard.svg";

import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { cn } from "@/shared/shadcn/lib/utils";
import { Toggle } from "@/shared/shadcn/ui/toggle";

type EmojiBtnToggleProps = {
  className?: string;
  pressed: boolean;
  onToggle: () => void;
};

export const EmojiBtnToggle: React.FC<EmojiBtnToggleProps> = ({ className, pressed, onToggle }) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={onToggle}
      className={cn("text-gray desktop:data-[state=on]:text-primary", className)}
    >
      {isMobile && !pressed ? (
        <EmojiBtn className="h-5 w-5" />
      ) : isMobile && pressed ? (
        <Keyboard className="h-5 w-5" />
      ) : (
        <EmojiBtn className="h-5 w-5" />
      )}
    </Toggle>
  );
};
