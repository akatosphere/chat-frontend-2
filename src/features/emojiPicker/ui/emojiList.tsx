import { cn } from "@/shared/shadcn/lib/utils";

type EmojiListProps = {
  className?: string;
};

export const EmojiList: React.FC<EmojiListProps> = ({ className }) => {
  return <div className={cn("", className)}></div>;
};
