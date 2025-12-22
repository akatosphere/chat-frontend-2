import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "headline",
        "subheadline",
        "title",
        "text",
        "text-tight",
        "subtext",
        "subtext-tight",
        "minitext",
        "minitext-tight",
        "caption",
        "caption-tight",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
