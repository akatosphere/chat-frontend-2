"use client";

import React, { useMemo } from "react";

import { getMessageStatus } from "@/entities/chat/lib/getMessageStatus";
import { MessageBlock } from "@/features/chat/chat/model/messageBlock/types";
import { MappedChatMessage } from "@/features/chat/chat/model/types/mappedTypes";
import { SendingStatus } from "@/features/chat/chat/model/types/serverTypes";
import { MessageBlockRenderer } from "@/features/chat/chat/ui/messageBlockRenderer";
import { cn } from "@/shared/shadcn/lib/utils";

export const MessageLayout = ({
  isMine,
  message,
  blocks,
  showSenderName,
}: {
  isMine: boolean;
  message: MappedChatMessage;
  blocks: MessageBlock[];
  showSenderName?: boolean;
}) => {
  const time = useMemo(
    () =>
      new Date(message.createdAt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [message.createdAt],
  );

  const hasText = blocks.some((b) => b.type === "text" && b.text !== " ");
  const isFirstBlockMedia = blocks[0]?.type === "media";

  const status = useMemo(
    () => getMessageStatus(message.isNew, message.status as SendingStatus),
    [message.isNew, message.status],
  );

  return (
    <div
      className={cn(
        "desktop:max-w-[500px] relative w-fit max-w-[83%] min-w-0 overflow-hidden rounded-2xl select-text",
        blocks.filter((b) => b.type === "media").length > 0
          ? "desktop:w-full w-fit"
          : "desktop:w-fit w-fit",
        isMine ? "bg-light-green rounded-br-sm" : "desktop:bg-gray-tone rounded-bl-sm bg-white",
        isFirstBlockMedia && "pt-0",
      )}
    >
      {showSenderName && (
        <div
          className={cn(
            "text-primary px-3 pt-2 text-xs leading-none font-medium tracking-wide",
            isFirstBlockMedia ? "mb-3" : "mb-0.5",
          )}
        >
          {message.fromUser.firstName} {message.fromUser.lastName}
        </div>
      )}

      {blocks.map((block, i) => (
        <MessageBlockRenderer
          key={i}
          block={block}
          isMine={isMine}
          hasText={hasText}
          time={time}
          status={status}
          id={message.id}
          hasNameAbove={i === 0 && showSenderName}
        />
      ))}
    </div>
  );
};
