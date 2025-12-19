import { cn } from "@/shared/shadcn/lib/utils";

type EmojiCategoriesProps = {
  className?: string;
};

export const EmojiCategories: React.FC<EmojiCategoriesProps> = ({
  className,
}) => {
  return <div className={cn("", className)}></div>;
};
