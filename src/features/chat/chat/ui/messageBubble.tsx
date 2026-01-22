import { memo, useMemo, useRef } from "react";

import { getMessageStatus } from "@/entities/chat/lib/getMessageStatus";
import { StatusIcon } from "@/entities/chat/ui/statusIcon";
import { cn } from "@/shared/shadcn/lib/utils";

import { MappedChatMessage } from "../model/types/mappedTypes";

type MessageBubbleProps = {
  className?: string;
  chatMessage: MappedChatMessage;
  currentUserId: string;
  "data-message-uid"?: string;
  "data-chat-key"?: string;
  "data-is-from-current-user"?: string;
  "data-is-new"?: string;
  [key: `data-${string}`]: string | undefined;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MessageBubble = memo(function MessageBubble({
  className,
  chatMessage,
  currentUserId,
  ...dataAttributes
}: MessageBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMine = chatMessage.fromUser.uid === currentUserId;

  const time = useMemo(() => new Date(chatMessage.createdAt * 1000), [chatMessage.createdAt]);

  const formattedTime = useMemo(
    () => time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [time],
  );

  const status = useMemo(
    () => getMessageStatus(chatMessage.isNew, chatMessage.status),
    [chatMessage.isNew, chatMessage.status],
  );

  const outerDataAttributes = useMemo(() => {
    const attrs: Record<string, string> = {};
    Object.entries(dataAttributes).forEach(([key, value]) => {
      if (key.startsWith("data-") && value !== undefined) {
        attrs[key] = value;
      }
    });
    return attrs;
  }, [dataAttributes]);

  return (
    <div
      ref={ref}
      id={`msg-${chatMessage.uid}`}
      className={cn("flex", isMine ? "justify-end" : "justify-start", className)}
      {...outerDataAttributes}
    >
      <div
        className={cn(
          "desktop:max-w-[500px] relative flex w-fit max-w-[83%] min-w-0 items-stretch rounded-2xl px-3 py-2.5",
          isMine
            ? "bg-light-green desktop:bg-light-green rounded-br-sm"
            : "desktop:bg-gray-tone rounded-bl-sm bg-white",
        )}
      >
        {chatMessage.content && (
          <p className="subtext emojis-apple min-w-0 pr-2 wrap-break-word whitespace-pre-wrap">
            {chatMessage.content}
          </p>
        )}

        <div className="flex h-full flex-col justify-end">
          <div className="minitext text-gray leading-subtext mt-auto flex items-center gap-0.5 select-none">
            <span>{formattedTime}</span>

            {isMine && <StatusIcon status={status} className="h-2.5 w-3.5" />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MessageBubble;
