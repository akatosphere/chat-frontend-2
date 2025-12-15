import CheckCheck from "@icons/chat/checkcheck.svg";
import Check from "@icons/chat/check.svg";
import Clock from "@icons/chat/clock.svg";
import { cn } from "@/shared/shadcn/lib/utils";

type StatusIconProps = {
  isMessageNew: boolean | undefined;
  fromUser: string;
  userId: string;
  isActive: boolean;
};

export const StatusIcon = ({
  isMessageNew,
  fromUser,
  userId,
  isActive,
}: StatusIconProps) => {
  if (fromUser !== userId) return null;
  if (isMessageNew === false) {
    return (
      <CheckCheck
        className={cn(
          "desktop:w-4 desktop:h-4 h-3.5 w-3.5 text-primary transition-color duration-200",
          isActive && "text-white"
        )}
      />
    );
  }
  if (isMessageNew === true) {
    return (
      <Check
        className={cn(
          "desktop:w-3.5 desktop:h-2.5 h-2 w-2.5 text-gray transition-color duration-200",
          isActive && "text-white"
        )}
      />
    );
  }
  return (
    <Clock
      className={cn(
        "w-[15px] h-[15px] text-gray transition-color duration-200",
        isActive && "text-white"
      )}
    />
  );
};
