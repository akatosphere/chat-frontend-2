import { useMemo } from "react";

import { getMessageStatus } from "@/entities/chat/lib/getMessageStatus";
import { cn } from "@/shared/shadcn/lib/utils";

import { MessageBlock } from "../model/messageBlock/types";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { MessageBlockRenderer } from "./messageBlockRenderer";

export const MessageLayout = ({
  isMine,
  message,
  blocks,
  isFirstInGroup,
}: {
  isMine: boolean;
  message: MappedChatMessage;
  blocks: MessageBlock[];
  isFirstInGroup?: boolean;
}) => {
  const time = new Date(message.createdAt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const status = useMemo(
    () => getMessageStatus(message.isNew, message.status),
    [message.isNew, message.status],
  );

  return (
    <div
      className={cn(
        "desktop:max-w-[500px] relative w-fit max-w-[83%] min-w-0 overflow-hidden rounded-2xl select-text",
        isMine ? "bg-light-green rounded-br-sm" : "desktop:bg-gray-tone rounded-bl-sm bg-white",
      )}
    >
      {!isMine && isFirstInGroup && (
        <div className="text-primary truncate px-3 pt-2 text-[13px] leading-none font-bold">
          {`${message.fromUser.firstName} ${message.fromUser.lastName || ""}`.trim()}
        </div>
      )}

      {blocks.map((block, i) => (
        <MessageBlockRenderer key={i} block={block} isMine={isMine} time={time} status={status} />
      ))}
    </div>
  );
};
