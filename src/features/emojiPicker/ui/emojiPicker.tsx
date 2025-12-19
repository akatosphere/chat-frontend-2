import { cn } from "@/shared/shadcn/lib/utils";

type EmojiPickerProps = {
  className?: string;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ className }) => {
  return <div className={cn("", className)}></div>;
};
