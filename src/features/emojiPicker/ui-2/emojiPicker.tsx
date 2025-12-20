// "use client";
// import { cn } from "@/shared/shadcn/lib/utils";
// import { useState } from "react";
// import { EmojiList } from "./emojiList";
// import { EmojiCategories } from "./emojiCategories";
// import { emojisCategories } from "./model-2/types";

// type EmojiPickerProps = {
//   className?: string;
//   onEmojiSelect?: (emoji: string) => void;
// };

// export const EmojiPickerss: React.FC<EmojiPickerProps> = ({
//   className,
//   onEmojiSelect,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string>("recent");

//   return (
//     <div
//       className={cn(
//         "w-[472px] bg-white shadow-[-8px_0px_20px_0px_#6C688A24] rounded-md overflow-hidden",
//         className
//       )}
//     >
//       <EmojiList categoryId={activeCategory} onEmojiSelect={onEmojiSelect} />
//       <EmojiCategories
//         categories={emojisCategories}
//         activeCategory={activeCategory}
//         onClick={setActiveCategory}
//       />
//     </div>
//   );
// };
