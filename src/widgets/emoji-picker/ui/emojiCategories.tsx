import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { EmojiCategory } from "../../../features/emojiPicker/model/data";

type EmojiCategoriesProps = {
  className?: string;
  categories: EmojiCategory[];
  activeCategory: string;
  onClick: (categoryId: string) => void;
};

export const EmojiCategories: React.FC<EmojiCategoriesProps> = ({
  className,
  categories,
  activeCategory,
  onClick,
}) => {
  return (
    <ul
      className={cn(
        "desktop:py-5 desktop:px-5 scrollbar-hide desktop:scrollbar-shown flex gap-4.5 overflow-x-auto border-t border-[#e4e4e4] px-5.5 py-5.5 pb-8",
        className,
      )}
    >
      {categories.map((category) => (
        <li key={category.title} className="flex min-w-0 shrink-0">
          <Button
            onClick={() => onClick(category.id)}
            variant="text"
            size={"inline"}
            className="h-8 w-8"
          >
            <category.icon
              className={cn(
                "text-gray hover:text-primary size-6.5 object-cover transition-colors duration-200",
                activeCategory === category.id && "text-primary",
              )}
            />
          </Button>
        </li>
      ))}
    </ul>
  );
};
