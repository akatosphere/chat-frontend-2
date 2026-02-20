import { memo, useCallback, useMemo, useRef } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import { useMessageContextMenu } from "@/widgets/contextMenu/lib/useMessageContextMenu";

import { useMessageNavigation } from "../model/store/useChatNavigationStore";
import { useChatStore } from "../model/store/useChatStore";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { MessageLayout } from "./messageLayout";

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
  const setReplyTarget = useChatStore((s) => s.setReplyTarget);

  const isHighlighted = useMessageNavigation(
    useCallback((s) => s.highlightMessageId === chatMessage.uid, [chatMessage.uid]),
  );

  const { isSelectionMode, selectedMessageUids, toggleMessageSelection } = useChatStore();

  const isSelected = selectedMessageUids.has(chatMessage.uid);

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
      className={cn(
        "flex w-full min-w-0 flex-1 items-center transition-colors duration-300 ease-out",
        (selectedMessageUids.has(chatMessage.uid) || isHighlighted || isOpen) && "bg-muted",
        className,
      )}
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={() => toggleMessageSelection(chatMessage.uid)}
          className="ml-4"
        />
      )}
      <div
        ref={ref}
        id={`msg-${chatMessage.uid}`}
        className={cn(
          "flex flex-1 px-4 transition-colors duration-300 ease-out select-none",
          isMine ? "justify-end" : "justify-start",
        )}
        onDoubleClick={handleDoubleClick}
        onClick={(e) => {
          if (isSelectionMode) {
            e.stopPropagation();
            toggleMessageSelection(chatMessage.uid);
          }
        }}
        onContextMenu={onContextMenu}
        {...outerDataAttributes}
      >
        <MessageLayout isMine={isMine} message={chatMessage} blocks={chatMessage.blocks} />
      </div>
    </div>
  );
});

export default MessageBubble;
