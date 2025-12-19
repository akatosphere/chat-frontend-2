import { cn } from "@/shared/shadcn/lib/utils";
import { ChatItemData } from "../model/types";
import { StatusIcon } from "./statusIcon";
import { formatLastSeen } from "../lib/formatLastSeen";
import Mute from "@icons/chat/mute.svg";
import { getChatDisplayName } from "../lib/getUserDisplayName";

type ChatListItemHeaderProps = {
  chat: ChatItemData;
  isActive?: boolean;
};

export const ChatListItemHeader = ({
  chat,
  isActive,
}: ChatListItemHeaderProps) => {
  const user = chat.chat;
  const lastMsg = chat.last_message;
  const displayName = getChatDisplayName(chat);
  const time = lastMsg ? formatLastSeen(lastMsg.created_at) : "";

  return (
    <div className="flex items-center justify-between min-w-0">
      <div className="flex items-center gap-1.5 min-w-0">
        <h3
          className={cn(
            "truncate subtext desktop:text font-semibold min-w-0 text-black transition-colors duration-200",
            isActive && "text-white"
          )}
        >
          {displayName}
        </h3>
        {!chat.notifications && (
          <Mute
            className={cn(
              "desktop:w-3.5 w-[11px] desktop:h-3.5 h-[11px] text-gray shrink-0 transition-colors duration-200",
              isActive && "text-white"
            )}
          />
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0 pl-2">
        {lastMsg && (
          <StatusIcon
            isMessageNew={lastMsg?.new}
            fromUser={lastMsg?.from_user}
            isActive={Boolean(isActive)}
            userId={user.uid}
          />
        )}
        <span
          className={cn(
            "desktop:minitext caption text-gray leading-none transition-colors duration-200",
            isActive && "text-white"
          )}
        >
          {time}
        </span>
      </div>
    </div>
  );
};
