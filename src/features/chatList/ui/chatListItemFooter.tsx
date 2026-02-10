import Pin from "@icons/chat/pin.svg";

import { ChatListItem } from "@/entities/chat/model/types";
import { cn } from "@/shared/shadcn/lib/utils";

import { MessagePreview } from "./messagePreview";

type ChatListItemFooterProps = {
  isActive?: boolean;
  totalUnread: number;
  isFavorite: boolean;
  lastMsg: ChatListItem["lastMessage"];
};

export const ChatListItemFooter = ({
  isFavorite,
  lastMsg,
  isActive,
  totalUnread,
}: ChatListItemFooterProps) => {
  return (
    <div className="mt-1 flex h-full items-stretch justify-between gap-3">
      <MessagePreview lastMsg={lastMsg} isActive={isActive} />
      <div className="mt-auto mb-[6.5px] flex h-full shrink-0 items-center">
        {totalUnread > 0 ? (
          <div className="bg-primary flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full px-[5px]">
            <span className="caption leading-none text-white">
              {totalUnread > 999 ? Math.floor(totalUnread / 1000) + "к" : totalUnread}
            </span>
          </div>
        ) : isFavorite ? (
          <Pin
            className={cn(
              "text-gray h-[17px] w-[13px] shrink-0 transition-colors duration-200",
              isActive && "text-white",
            )}
            aria-label="закреплено"
          />
        ) : null}
      </div>
    </div>
  );
};
