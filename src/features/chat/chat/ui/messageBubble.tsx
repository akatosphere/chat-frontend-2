import { memo, useCallback, useMemo, useRef } from "react";

import { Avatar } from "@/entities/chat/ui/avatar"; // Проверьте правильность пути к вашему компоненту Avatar
import { cn } from "@/shared/shadcn/lib/utils";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";
import { useMessageContextMenu } from "../lib/useMessageContextMenu";
import { useMessageNavigation } from "../model/store/useChatNavigationStore";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { MessageLayout } from "./messageLayout";

type MessageBubbleProps = {
  className?: string;
  chatMessage: MappedChatMessage;
  currentUserId: string;
  isFirstInGroup?: boolean; // Добавлено
  isLastInGroup?: boolean; // Добавлено
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
  isFirstInGroup, // Принимаем
  isLastInGroup, // Принимаем
  ...dataAttributes
}: MessageBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMine = chatMessage.fromUser.uid === currentUserId;
  const setReplyTarget = useChatStore((s) => s.setReplyTarget);

  const isHighlighted = useMessageNavigation(
    useCallback((s) => s.highlightMessageId === chatMessage.uid, [chatMessage.uid]),
  );

  const handleDoubleClick = () => {
    setReplyTarget(chatMessage);
  };

  const outerDataAttributes = useMemo(() => {
    const attrs: Record<string, string> = {};
    Object.entries(dataAttributes).forEach(([key, value]) => {
      if (key.startsWith("data-") && value !== undefined) {
        attrs[key] = value;
      }
    });
    return attrs;
  }, [dataAttributes]);

  const { onContextMenu, isOpen } = useMessageContextMenu(chatMessage);

  return (
    <div
      ref={ref}
      id={`msg-${chatMessage.uid}`}
      className={cn(
        "flex gap-x-2 px-4 transition-colors duration-300 ease-out select-none", // Добавлен gap-x-2
        isMine ? "justify-end" : "justify-start",
        (isHighlighted || isOpen) && "bg-muted",
        className,
      )}
      onDoubleClick={handleDoubleClick}
      onContextMenu={onContextMenu}
      {...outerDataAttributes}
    >
      {!isMine && (
        <div className="flex w-8 shrink-0 items-end pb-0.5">
          {isLastInGroup && <Avatar size="s" avatarUrl={chatMessage.fromUser.avatarUrl} />}
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        {/* Имя отправителя (только для чужих сообщений, если это первое сообщение в блоке) */}
        {!isMine && isFirstInGroup && (
          <span className="text-primary mb-1 ml-2 text-[13px] leading-none font-medium">
            {chatMessage.fromUser.username}
          </span>
        )}

        <MessageLayout isMine={isMine} message={chatMessage} blocks={chatMessage.blocks} />
      </div>
    </div>
  );
});

export default MessageBubble;
