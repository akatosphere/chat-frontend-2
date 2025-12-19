import Check from "@icons/chat/check.svg";
import CheckCheck from "@icons/chat/checkcheck.svg";
import Clock from "@icons/chat/clock.svg";

import { cn } from "@/shared/shadcn/lib/utils";

import { getMessageStatus } from "../lib/getMessageStatus";

type StatusIconProps = {
  isMessageNew: boolean | undefined;
  fromUser: string;
  userId: string;
  isActive: boolean;
};

export const StatusIcon = ({ isMessageNew, fromUser, userId, isActive }: StatusIconProps) => {
  const status = getMessageStatus(fromUser, userId, isMessageNew);

  switch (status) {
    case "delivered": {
      return (
        <Check
          className={cn(
            "desktop:w-3.5 desktop:h-2.5 text-gray transition-color h-2 w-2.5 duration-200",
            isActive && "text-white",
          )}
        />
      );
    }
    case "sent": {
      return (
        <CheckCheck
          className={cn(
            "desktop:w-4 desktop:h-4 text-primary transition-color h-3.5 w-3.5 duration-200",
            isActive && "text-white",
          )}
        />
      );
    }
    case "pending": {
      return (
        <Clock
          className={cn(
            "text-gray transition-color h-[15px] w-[15px] duration-200",
            isActive && "text-white",
          )}
        />
      );
    }
  }
};
