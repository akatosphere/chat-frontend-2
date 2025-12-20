// src/features/emoji/model/data.ts
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

export const emojisCategories = [
  {
    id: "recent",
    title: "Недавние",
    icon: Clock,
  },
  {
    id: "people", // smileys + people в emoji-mart
    title: "Эмоции",
    icon: Smile,
  },
  {
    id: "people", // жесты, люди и т.д. — тоже в "people"
    title: "Люди",
    icon: People,
  },
  {
    id: "nature",
    title: "Растения и животные",
    icon: Cat,
  },
  {
    id: "foods",
    title: "Еда и напитки",
    icon: Food,
  },
  {
    id: "travel",
    title: "Путешествия",
    icon: Bag,
  },
  {
    id: "activity",
    title: "Развлечения",
    icon: Lamp,
  },
  {
    id: "objects",
    title: "Символы",
    icon: Symbols,
  },
  {
    id: "flags",
    title: "Флаги",
    icon: Flag,
  },
] as const;

export type EmojiCategory = {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
