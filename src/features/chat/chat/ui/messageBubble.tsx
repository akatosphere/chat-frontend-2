import { memo, useCallback, useMemo, useRef } from "react";

import { Avatar } from "@/entities/chat/ui/avatar";
import { getChatType } from "@/shared/lib/getChatType";
import { cn } from "@/shared/shadcn/lib/utils";
import { Checkbox } from "@/shared/ui/checkBox";

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
  const chatType = getChatType(chatMessage.chatKey);

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
      {!isMine && chatType != "chat" && (
        <div className="ml-4 flex w-8 shrink-0 items-end pb-0.5">
          {isLastInGroup && <Avatar size="s" avatarUrl={chatMessage.fromUser.avatarUrl} />}
        </div>
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
