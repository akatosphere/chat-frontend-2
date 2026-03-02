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

  const status = useMemo(
    () => getMessageStatus(message.isNew, message.status as SendingStatus),
    [message.isNew, message.status],
  );

  // Проверка на наличие медиа для корректного отступа имени
  const hasMedia = useMemo(() => blocks.some((b) => b.type === "media"), [blocks]);

  return (
    <div className={cn("flex flex-col", isMine ? "items-end" : "items-start")}>
      <div
        className={cn(
          "relative w-fit min-w-0 overflow-hidden rounded-2xl select-text",
          isMine ? "bg-light-green rounded-br-sm" : "desktop:bg-gray-tone rounded-bl-sm bg-white",
          hasMedia && blocks[0]?.type === "media" && "pt-0",
        )}
      >
        {/* Блок имени перенесен внутрь пузыря */}
        {showSenderName && (
          <div
            className={cn(
              "px-4 pt-2 text-xs leading-none font-medium tracking-wide text-blue-600",
              hasMedia && blocks[0]?.type === "media" ? "mb-3" : "mb-0",
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
            time={time}
            status={status}
            id={message.id}
          />
        ))}
      </div>
    </div>
  );
};
