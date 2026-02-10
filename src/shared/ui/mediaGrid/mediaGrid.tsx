import React from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { MediaCard } from "./mediaCard";

export type MediaItem = {
  type: "image" | "video";
  src: string;
};

type MediaGridProps = {
  items: MediaItem[];
  className?: string;
};

export const MediaGrid: React.FC<MediaGridProps> = ({ items, className }) => {
  const count = items.length;

  if (count === 0) return null;

  return (
    <div
      className={cn(
        "desktop:w-[500px] desktop:max-w-[500px] desktop:gap-1 grid w-[228px] max-w-[228px] shrink-0 grid-cols-2 gap-0.5",
        className,
      )}
    >
      {items.map((item, index) => {
        const isFullWidth = count === 1 || (count === 3 && index === 2);
        const height = isFullWidth
          ? "desktop:h-[376px]  h-[292px] "
          : "desktop:h-[186px] h-[144px]";

        return (
          <MediaCard
            key={index}
            className={`${isFullWidth ? "col-span-2" : "col-span-1"} ${height}`}
            item={item}
          />
        );
      })}
    </div>
  );
};
