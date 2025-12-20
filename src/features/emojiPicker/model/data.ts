import emojiData from "unicode-emoji-json";
import {
  Smile,
  Bag,
  Cat,
  Lamp,
  Symbols,
  People,
  Clock,
  Flag,
  Food,
} from "@icons/emojis";
import { ComponentType, SVGProps } from "react";

type EmojiCategory = {
  id: string;
  title: string;
  emojis: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const categories: EmojiCategory[] = [
  { id: "recent", title: "Недавние", emojis: [], icon: Clock },
  { id: "smiles", title: "Эмоции", emojis: [], icon: Smile },
  { id: "people", title: "Люди", emojis: [], icon: People },
  { id: "nature", title: "Растения и животные", emojis: [], icon: Cat },
  { id: "food", title: "Еда и напитки", emojis: [], icon: Food },
  { id: "adventures", title: "Путешествия", emojis: [], icon: Bag },
  { id: "activities", title: "Развлечения", emojis: [], icon: Lamp },
  { id: "symbols", title: "Символы", emojis: [], icon: Symbols },
  { id: "flags", title: "Флаги", emojis: [], icon: Flag },
];

function isBaseEmoji(char: string) {
  return !char.includes("\u200D") && !/[\u{1F3FB}-\u{1F3FF}]/u.test(char);
}

for (const [char, data] of Object.entries(emojiData)) {
  if (!isBaseEmoji(char)) continue;

  switch (data.group) {
    case "Smileys & Emotion":
      categories.find((c) => c.id === "smiles")?.emojis.push(char);
      break;
    case "People & Body":
      categories.find((c) => c.id === "people")?.emojis.push(char);
      break;
    case "Animals & Nature":
      categories.find((c) => c.id === "nature")?.emojis.push(char);
      break;
    case "Food & Drink":
      categories.find((c) => c.id === "food")?.emojis.push(char);
      break;
    case "Travel & Places":
      categories.find((c) => c.id === "adventures")?.emojis.push(char);
      break;
    case "Activities":
      categories.find((c) => c.id === "activities")?.emojis.push(char);
      break;
    case "Objects":
    case "Symbols":
      categories.find((c) => c.id === "symbols")?.emojis.push(char);
      break;
    case "Flags":
      categories.find((c) => c.id === "flags")?.emojis.push(char);
      break;
    default:
      break;
  }
}

export const emojisCategories = categories;
export type { EmojiCategory };
