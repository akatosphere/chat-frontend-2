import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { cn } from "@/shared/shadcn/lib/utils";

import { getStatusText } from "../lib/getStatusText";

type StatusbarProps = {
  className?: string;
  time?: number | null;
  isOnline?: boolean | null;
  chatType: ChatType;
  membersCount?: number;
};

export const Statusbar: React.FC<StatusbarProps> = ({
  className,
  time,
  isOnline,
  chatType,
  membersCount,
}) => {
  const statusText = getStatusText(chatType, membersCount, time, isOnline);

  return (
    <span
      className={cn(
        "desktop:text-sm text-gray mt-1 truncate text-xs transition-colors",
        isOnline && "text-primary",
        className,
      )}
    >
      {statusText}
    </span>
  );
};
