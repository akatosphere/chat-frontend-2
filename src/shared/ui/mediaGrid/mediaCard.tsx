import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import Trash from "@/shared/ui/icons/sendFiles/trash.svg";

import { MediaItem } from "./mediaGrid";

type MediaCardProps = {
  className?: string;
  isFullWidth?: boolean;
  isAbleToOpen?: boolean;
  isDeleteMode: boolean;
  index: number;
  onDelete: (id: number) => void;
  onImageClick: (id: number) => void;
  item: MediaItem;
};

export const MediaCard: React.FC<MediaCardProps> = ({
  className,
  item,
  isDeleteMode,
  isAbleToOpen = false,
  index,
  onDelete,
  onImageClick,
}) => {
  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      {item.type === "video" && (
        <video
          src={item.src}
          className={cn("h-full w-full object-cover", isAbleToOpen && "cursor-pointer")}
          onClick={() => isAbleToOpen && onImageClick(index)}
          autoPlay
          loop
          muted
        />
      )}
      {item.type === "image" && (
        <Image
          src={item.src}
          alt={`Image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 626px"
          className={cn("object-cover", isAbleToOpen && "cursor-pointer")}
          onClick={() => isAbleToOpen && onImageClick(index)}
        />
      )}
      {isDeleteMode && (
        <Button
          variant={"text"}
          size="inline"
          onClick={() => {
            if (item.id) onDelete(item.id);
          }}
          className="absolute right-3 bottom-2.5 h-9 w-9 rounded-md bg-[#00000033] transition-colors duration-200 hover:bg-[#00000066]"
        >
          <Trash className="h-5 w-5 text-white" />
        </Button>
      )}
    </div>
  );
};
