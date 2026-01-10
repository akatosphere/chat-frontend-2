import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";

type AvatarProps = {
  className?: string;
  isOnline?: boolean;
  avatarUrl: string;
  size?: "sm" | "md" | "lg" | "xl" | "settingsAvatar";
};

const AVATAR_SIZES = {
  sm: "w-10 h-10",
  md: "w-15 h-15",
  lg: "w-20.5 h-20.5",
  xl: "w-50 h-50",
  settingsAvatar:
    "max-h-[390px] h-[390px] w-full desktop:w-50 desktop:max-h-50 desktop:h-50 object-cover rounded-md desktop:rounded-full",
};

export const Avatar = ({ isOnline, avatarUrl, size = "md", className }: AvatarProps) => {
  const avatarSrc = avatarUrl || "/chat/avatar.svg";
  return (
    <div className={cn("relative shrink-0", className)}>
      <div className={cn("overflow-hidden rounded-full", AVATAR_SIZES[size])}>
        <Image
          src={avatarSrc}
          width={200}
          height={200}
          alt="аватар"
          priority={size === "settingsAvatar"}
          className={cn("h-full w-full object-cover")}
        />
      </div>
      {isOnline && (
        <div className="absolute right-0.5 bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
};
