import { cn } from "@/shared/shadcn/lib/utils";
import { EmojiCategory } from "../../../features/emojiPicker/model/data";
import { Button } from "@/shared/shadcn/ui/button";

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
        "py-5.5  desktop:py-5 pb-8 px-5.5 desktop:px-5 flex gap-4.5 border-t border-[#e4e4e4] overflow-x-auto scrollbar-hide ",
        className
      )}
    >
      {categories.map((category) => (
        <li key={category.title} className="flex shrink-0 min-w-0">
          <Button
            onClick={() => onClick(category.id)}
            variant="text"
            size={"inline"}
            className="w-8 h-8"
          >
            <category.icon
              className={cn(
                "size-6.5 text-gray hover:text-primary transition-colors duration-200 object-cover",
                activeCategory === category.id && "text-primary"
              )}
            />
          </Button>
        </li>
      ))}
    </ul>
  );
};
