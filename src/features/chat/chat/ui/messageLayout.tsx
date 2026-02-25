"use client";

import React, { useMemo } from "react";

import { getMessageStatus } from "@/entities/chat/lib/getMessageStatus";
import { cn } from "@/shared/shadcn/lib/utils";

import { MessageBlock } from "../model/messageBlock/types";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { SendingStatus } from "../model/types/serverTypes";
import { MessageBlockRenderer } from "./messageBlockRenderer";

export const MessageLayout = ({
  isMine,
  message,
  blocks,
}: {
  isMine: boolean;
  message: MappedChatMessage;
  blocks: MessageBlock[];
  isFirstInGroup?: boolean;
}) => {
  const time = useMemo(
    () =>
      new Date(message.createdAt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [message.createdAt],
  );

  const status = useMemo(
    () => getMessageStatus(message.isNew, message.status as SendingStatus),
    [message.isNew, message.status],
  );

  return (
    <div
      className={cn(
        "desktop:max-w-[500px] relative w-fit max-w-[83%] min-w-0 overflow-hidden rounded-2xl shadow-sm select-text",
        isMine ? "bg-light-green rounded-br-sm" : "desktop:bg-gray-tone rounded-bl-sm bg-white",
      )}
    >
      {blocks.map((block, i) => (
        <MessageBlockRenderer
          key={i}
          block={block}
          isMine={isMine}
          time={time}
          status={status}
          id={message.id}
        />
      ))}
    </div>
  );
};
