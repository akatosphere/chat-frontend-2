import { cn } from "@/shared/shadcn/lib/utils";
import { EmojiCategory } from "./model-2/types";

type EmojiCategoriesProps = {
  categories: EmojiCategory[];
  activeCategory: string;
  onClick: (categoryId: string) => void;
};

export const EmojiCategories: React.FC<EmojiCategoriesProps> = ({
  categories,
  activeCategory,
  onClick,
}) => {
  return (
    <ul className="py-5 pb-8 px-5 flex gap-6 border-t border-[#e4e4e4] justify-center">
      {categories.map((category) => (
        <li key={category.id}>
          <button onClick={() => onClick(category.id)}>
            <category.icon
              className={cn(
                "w-7 h-7 text-gray-600 hover:text-primary transition-colors duration-200",
                activeCategory === category.id && "text-primary"
              )}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};
