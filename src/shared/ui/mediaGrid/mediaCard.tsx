import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";

import { MediaItem } from "./mediaGrid";

type MediaCardProps = {
  className?: string;
  isFullWidth?: boolean;
  item: MediaItem;
};

export const MediaCard: React.FC<MediaCardProps> = ({ className, item }) => {
  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      {item.type === "video" && <video src={item.src} autoPlay loop muted />}
      {item.type === "image" && (
        <Image src={item.src} alt={`Image`} fill className="object-cover" />
      )}
    </div>
  );
};
