import { ChatItemData } from "../model/types";
import { MessagePreview } from "./messagePreview";
import Pin from "@icons/chat/pin.svg";
import { cn } from "@/shared/shadcn/lib/utils";

type FooterProps = {
  isActive?: boolean;
  totalUnread: number;
  isFavorite: boolean;
  lastMsg: ChatItemData["last_message"];
};

export const Footer = ({
  isFavorite,
  lastMsg,
  isActive,
  totalUnread,
}: FooterProps) => {
  return (
    <div className="flex items-stretch justify-between gap-3 mt-1 h-full">
      <MessagePreview lastMsg={lastMsg} isActive={isActive} />
      <div className="shrink-0 flex items-center mt-auto mb-[6.5px] h-full">
        {totalUnread > 0 ? (
          <div className="px-[5px] min-h-[18px] min-w-[18px] rounded-full bg-primary flex items-center justify-center">
            <span className="text-white caption leading-none">
              {totalUnread > 999
                ? Math.floor(totalUnread / 1000) + "к"
                : totalUnread}
            </span>
          </div>
        ) : isFavorite ? (
          <Pin
            className={cn(
              "w-[13px] h-[17px] text-gray shrink-0 transition-colors duration-200",
              isActive && "text-white"
            )}
            aria-label="закреплено"
          />
        ) : null}
      </div>
    </div>
  );
};
