import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";

type AvatarProps = {
  isOnline?: boolean;
  avatarUrl: string;
  size: "sm" | "md" | "lg" | "xl";
};

const AVATAR_SIZES = {
  sm: "w-10 h-10",
  md: "w-15 h-15",
  lg: "w-20.5 h-20.5",
  xl: "w-50 h-50",
};

export const Avatar = ({ isOnline, avatarUrl, size = "md" }: AvatarProps) => {
  const avatarSrc = avatarUrl || "/chat/avatar.svg";
  return (
    <div className="relative shrink-0">
      <div className={cn("rounded-full", AVATAR_SIZES[size])}>
        <Image
          src={avatarSrc}
          width={100}
          height={100}
          alt="аватар"
          className="w-full rounded-full object-cover"
        />
      </div>
      {isOnline && (
        <div className="absolute right-0.5 bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
};
