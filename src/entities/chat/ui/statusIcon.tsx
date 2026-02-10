import Check from "@icons/chat/check.svg";
import CheckCheck from "@icons/chat/checkcheck.svg";
import Clock from "@icons/chat/clock.svg";

import { SendingStatus } from "@/features/chat/chat/model/types/serverTypes";
import { MESSAGE_STATUS } from "@/shared/constants/constants";
import { cn } from "@/shared/shadcn/lib/utils";

type StatusIconProps = {
  className?: string;
  status: SendingStatus | null;
  isActive?: boolean;
};

export const StatusIcon = ({ className, status, isActive }: StatusIconProps) => {
  if (!status) return null;
  switch (status) {
    case MESSAGE_STATUS.DELIVERED: {
      return (
        <Check
          className={cn(
            "desktop:w-3.5 desktop:h-2.5 text-gray transition-color h-2 w-2.5 duration-200",
            isActive && "text-white",
            className,
          )}
        />
      );
    }
    case MESSAGE_STATUS.READ: {
      return (
        <CheckCheck
          className={cn(
            "desktop:w-4 desktop:h-4 text-primary transition-color h-3.5 w-3.5 duration-200",
            isActive && "text-white",
            className,
          )}
        />
      );
    }
    case MESSAGE_STATUS.PENDING: {
      return (
        <Clock
          className={cn(
            "text-gray transition-color h-[15px] w-[15px] duration-200",
            isActive && "text-white",
            className,
          )}
        />
      );
    }
    case MESSAGE_STATUS.FAILED: {
      return <span className="text-red text-[15px]">!</span>;
    }
  }
};
