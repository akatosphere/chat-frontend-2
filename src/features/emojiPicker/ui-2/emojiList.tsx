// import data from "@emoji-mart/data";
// import Image from "next/image";
// import { useMemo } from "react";
// import { emojisCategories } from "./model-2/types";

// const getAppleImageUrl = (unified: string) =>
//   `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/img/apple/64/${unified.toLowerCase()}.png`;

// type EmojiListProps = {
//   categoryId: string;
//   onEmojiSelect?: (emoji: string) => void;
// };

// export const EmojiList: React.FC<EmojiListProps> = ({
//   categoryId,
//   onEmojiSelect,
// }) => {
//   const recentIds = useMemo(() => {
//     const saved = localStorage.getItem("emojiRecent");
//     return saved ? JSON.parse(saved) : [];
//   }, []);

//   const addToRecent = (emojiId: string) => {
//     const newRecent = [
//       emojiId,
//       ...recentIds.filter((id: string) => id !== emojiId),
//     ].slice(0, 30);
//     localStorage.setItem("emojiRecent", JSON.stringify(newRecent));
//   };

//   const emojis = useMemo(() => {
//     if (categoryId === "recent") {
//       return recentIds.map((id: string) => data.emojis[id]).filter(Boolean);
//     }

//     data.categories.forEach((c: any) => {
//       console.log(c, categoryId);
//     });
//     const cat = data.categories.find((c: any) => c.id === categoryId);
//     return cat ? cat.emojis.map((id: string) => data.emojis[id]) : [];
//   }, [categoryId, recentIds]);

//   const categoryTitle =
//     emojisCategories.find((c) => c.id === categoryId)?.title || "Эмодзи";

//   const handleClick = (emoji: any) => {
//     addToRecent(emoji.id);
//     onEmojiSelect?.(emoji.native);
//   };

//   return (
//     <div className="p-5 overflow-y-auto max-h-[448px] min-h-[448px]">
//       <h4 className="text-[#0000004D] font-semibold mb-4">{categoryTitle}</h4>
//       <div className="flex flex-wrap gap-2">
//         {emojis.length > 0 ? (
//           emojis.map((emoji: any) => {
//             const url = getAppleImageUrl(emoji.skins[0].unified);

//             return (
//               <button
//                 key={emoji.id}
//                 onClick={() => handleClick(emoji)}
//                 className="w-10 h-10 hover:scale-110 hover:bg-[#f0f0f0] rounded-lg transition-all duration-200 flex items-center justify-center"
//               >
//                 <Image
//                   src={url}
//                   alt={emoji.name}
//                   className="w-8 h-8"
//                   width={32}
//                   height={32}
//                   draggable={false}
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.style.display = "none";
//                     e.currentTarget.parentElement!.textContent = emoji.native;
//                   }}
//                 />
//               </button>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 text-center w-full">Пусто</p>
//         )}
//       </div>
//     </div>
//   );
// };
