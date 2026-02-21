import { memo, useCallback, useMemo, useRef } from "react";

import { Avatar } from "@/entities/chat/ui/avatar";
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
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
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
  isFirstInGroup,
  isLastInGroup,
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
        "flex gap-x-2 px-4 transition-colors duration-300 ease-out select-none",
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
        <MessageLayout
          isMine={isMine}
          message={chatMessage}
          blocks={chatMessage.blocks}
          isFirstInGroup={isFirstInGroup}
        />
      </div>
    </div>
  );
});

export default MessageBubble;
