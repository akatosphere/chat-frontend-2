import Mute from "@icons/chat/mute.svg";

import { getMessageStatus } from "@/entities/chat/lib/getMessageStatus";
import { cn } from "@/shared/shadcn/lib/utils";

import { formatLastSeen } from "../../../entities/chat/lib/formatLastSeen";
import { getChatDisplayName } from "../../../entities/chat/lib/getUserDisplayName";
import { ChatItemData } from "../../../entities/chat/model/types";
import { StatusIcon } from "../../../entities/chat/ui/statusIcon";

type ChatListItemHeaderProps = {
  chat: ChatItemData;
  isActive?: boolean;
};

export const ChatListItemHeader = ({ chat, isActive }: ChatListItemHeaderProps) => {
  const user = chat.chat;
  const lastMsg = chat.last_message;
  const displayName = getChatDisplayName(chat);
  const time = lastMsg ? formatLastSeen(lastMsg.created_at) : "";
  const status = getMessageStatus(lastMsg?.from_user || null, user.uid, lastMsg?.new);

  return (
    <div className="flex min-w-0 items-center justify-between">
      <div className="flex min-w-0 items-center gap-1.5">
        <h3
          className={cn(
            "subtext desktop:text min-w-0 truncate font-semibold text-black transition-colors duration-200",
            isActive && "text-white",
          )}
        >
          {displayName}
        </h3>
        {!chat.notifications && (
          <Mute
            className={cn(
              "desktop:w-3.5 desktop:h-3.5 text-gray h-[11px] w-[11px] shrink-0 transition-colors duration-200",
              isActive && "text-white",
            )}
          />
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1 pl-2">
        {lastMsg && <StatusIcon status={status} isActive={Boolean(isActive)} />}
        <span
          className={cn(
            "desktop:minitext caption text-gray leading-none transition-colors duration-200",
            isActive && "text-white",
          )}
        >
          {time}
        </span>
      </div>
    </div>
  );
};
