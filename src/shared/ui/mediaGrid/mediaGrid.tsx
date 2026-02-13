import React from "react";

import { useSendImageStore } from "@/features/chat/chat/model/store/useChatSendImagesStore";
import { cn } from "@/shared/shadcn/lib/utils";

import { MediaCard } from "./mediaCard";

export type MediaItem = {
  id?: string;
  type: "image" | "video";
  src: string;
  isRemoving?: boolean;
};

type MediaGridProps = {
  items: MediaItem[];
  className?: string;
  size?: keyof typeof sizes;
  isDeleteMode?: boolean;
};

const sizes = {
  sendImageModal: "destkop:w-[384px] desktop:max-w-[384px] w-full max-w-full",
  standart: "desktop:w-[500px] desktop:max-w-[500px] w-[228px] max-w-[228px]",
};

export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  className,
  size = "standart",
  isDeleteMode = false,
}) => {
  const count = items.length;
  const { removeImage } = useSendImageStore();
  if (count === 0) return null;

  const onDelete = (id: string) => {
    removeImage(id);
  };

  return (
    <div className={cn(sizes[size], "desktop:gap-1 grid shrink-0 grid-cols-2 gap-0.5", className)}>
      {items.map((item, index) => {
        const isFullWidth = count === 1 || (count === 3 && index === 2);
        const isFullHeight =
          size === "sendImageModal" ? count === 1 : count === 1 || (count === 2 && index === 0);
        const height = isFullHeight
          ? "desktop:h-[376px] h-[292px] "
          : "desktop:h-[186px] h-[144px]";

        return (
          <MediaCard
            key={index}
            className={`${isFullWidth ? "col-span-2" : "col-span-1"} ${height} ${size === "sendImageModal" && "rounded-md"}`}
            item={item}
            isDeleteMode={isDeleteMode}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};
