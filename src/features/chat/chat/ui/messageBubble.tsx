import { memo, useCallback, useMemo, useRef } from "react";

import { Avatar } from "@/entities/chat/ui/avatar";
import { getChatType } from "@/shared/lib/getChatType";
import { cn } from "@/shared/shadcn/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";

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
  [key: `data-${string}`]: string | undefined;
};

export const MessageBubble = memo(
  ({
    className,
    chatMessage,
    currentUserId,
    isFirstInGroup,
    isLastInGroup,
    ...dataAttributes
  }: MessageBubbleProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isMine = chatMessage.fromUser.uid === currentUserId;
    const setReplyTarget = useChatStore((s) => s.setReplyTarget);

    const isHighlighted = useMessageNavigation(
      useCallback((s) => s.highlightMessageId === chatMessage.uid, [chatMessage.uid]),
    );

    const { isSelectionMode, selectedMessageUids, toggleMessageSelection } = useChatStore();
    const isSelected = selectedMessageUids.has(chatMessage.uid);

    const { onContextMenu, isOpen } = useMessageContextMenu(chatMessage);
    const chatType = getChatType(chatMessage.chatKey);

    const handleDoubleClick = () => {
      // Блокировка двойного клика в режиме выбора
      setReplyTarget(chatMessage);
    };

    const outerDataAttributes = useMemo(() => {
      const attrs: Record<string, string> = {};
      Object.entries(dataAttributes).forEach(([key, value]) => {
        if (key.startsWith("data-") && typeof value === "string") {
          attrs[key] = value;
        }
      });
      return attrs;
    }, [dataAttributes]);

    return (
      <div
        className={cn(
          "flex w-full min-w-0 flex-1 items-center py-[1px] transition-all duration-300 ease-out",
          // Добавлен мягкий фон при выделении
          (isSelected || isHighlighted || isOpen) && "bg-muted/60",
          className,
        )}
      >
        {/* Чекбокс с анимацией появления, чтобы не было резкого прыжка контента */}
        {isSelectionMode && (
          <div className="animate-in fade-in slide-in-from-left-2 ml-4 shrink-0 duration-200">
            <Checkbox
              checked={isSelected}
              onChange={() => toggleMessageSelection(chatMessage.uid)}
            />
          </div>
        )}

        {/* Аватарка: self-stretch гарантирует, что зона клика не схлопнется */}
        {!isMine && chatType !== "chat" && (
          <div className="ml-4 flex w-8 shrink-0 items-end self-stretch pb-0.5">
            {isLastInGroup ? (
              <Avatar size="s" avatarUrl={chatMessage.fromUser.avatarUrl} />
            ) : (
              // Местозаполнитель для сохранения идеальной вертикальной линии сообщений
              <div className="w-8" aria-hidden="true" />
            )}
          </div>
        )}

        <div
          ref={ref}
          id={`msg-${chatMessage.uid}`}
          className={cn(
            "flex flex-1 px-4 transition-all duration-300 ease-out select-none",
            isMine ? "justify-end" : "justify-start",
          )}
          onDoubleClick={handleDoubleClick}
          onClick={(e) => {
            if (isSelectionMode) {
              // ЗАЩИТА: Не переключаем чекбокс, если клик попал по кнопке, ссылке или самому чекбоксу
              const target = e.target as HTMLElement;
              if (target.closest('button, a, input[type="checkbox"], label')) return;

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
  },
);

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
