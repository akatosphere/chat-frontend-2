import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";
import ProfilePhoto from "@/shared/ui/icons/chat/header/profilePhoto.svg";

import { STATUS_CONFIG } from "../model/statusConfig";
import { UserStatus } from "../model/types";

type Props = {
  name: string;
  status: UserStatus;
  photo?: string;
  onPhotoClick: () => void;
  onInfoClick: () => void;
};

export const ChatHeaderUser = ({ name, status, photo, onPhotoClick, onInfoClick }: Props) => {
  const statusData = STATUS_CONFIG[status];

  return (
    <div className="border-light-gray flex h-[60px] min-w-0 flex-1 items-center gap-3 border-b pl-4 md:border-none">
      <button
        onClick={onPhotoClick}
        className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full"
      >
        {photo ? (
          <Image src={photo} alt="profile" fill className="object-cover" />
        ) : (
          <ProfilePhoto className="text-primary h-10 w-10" />
        )}
      </button>

      <button onClick={onInfoClick} className="flex min-w-0 cursor-pointer flex-col text-left">
        <p className="truncate text-sm font-medium md:text-lg">{name}</p>
        <p
          className={cn("mt-1 truncate text-xs transition-colors md:text-sm", statusData.className)}
        >
          {statusData.label}
        </p>
      </button>
    </div>
  );
};
