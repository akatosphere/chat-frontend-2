import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";
import ProfilePhoto from "@/shared/ui/icons/chat/header/profilePhoto.svg";

import { STATUS_CONFIG } from "../model/statusConfig";
import { UserStatus } from "../model/types";

type Props = {
  name: string;
  status: UserStatus | string;
  photo: string | null;
};

export const ChatHeaderUser = ({ name, status, photo }: Props) => {
  const isSystemStatus = status in STATUS_CONFIG;

  const statusData = isSystemStatus
    ? STATUS_CONFIG[status as UserStatus]
    : { label: status, className: "text-gray" }; // Дефолтный стиль для "5 участников"

  return (
    <div className="border-light-gray desktop:border-none flex h-[60px] min-w-0 flex-1 items-center gap-3 border-b">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        {photo ? (
          <Image src={photo} alt="profile" fill className="object-cover" />
        ) : (
          <ProfilePhoto className="text-primary h-10 w-10" />
        )}
      </div>

      <div className="flex min-w-0 flex-col text-left">
        <p className="desktop:text-lg truncate text-sm font-medium">{name}</p>
        <p
          className={cn(
            "desktop:text-sm mt-1 truncate text-xs transition-colors",
            statusData.className,
          )}
        >
          {statusData.label}
        </p>
      </div>
    </div>
  );
};
