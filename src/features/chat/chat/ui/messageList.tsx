import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";
import { useAutoRead } from "../hooks";
import { useMessageScroll } from "../hooks/useMessageScroll";
import { groupMessagesByDate } from "../lib/getMessageByDate";
import { useMessageNavigation } from "../model/store/useChatNavigationStore";
import { MessageGroup } from "./messageGroup";
import { MessageListEmptyInfo } from "./messageListEpmtyInfo";
import { ScrollDownBtn } from "./scrollDownBtn";

interface MessageListProps {
  className?: string;
  currentUserId: string;
  isOwner: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ className, currentUserId, isOwner }) => {
  const messages = useChatStore((s) => s.messages);
  const isReady = useChatStore((s) => s.isReady);
  const chatType = useChatStore((s) => s.chatType);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const groups = useMemo(() => groupMessagesByDate(messages), [messages]);

  const { isAtBottom, handleScroll, scrollToBottom, performInitialScroll, scrollToMessage } =
    useMessageScroll({
      messages,
      groups,
      currentUserId,
      scrollToUnread: true,
      scrollBehavior: "auto",
      topOffset: 16,
      scrollContainerRef,
    });

  useAutoRead({
    messages,
    autoReadEnabled: true,
    readThreshold: 0.1,
    readRootMargin: "50px",
    batchDelay: 150,
    scrollContainerRef,
  });

  useEffect(() => {
    if (isReady) {
      performInitialScroll();
      const timer = setTimeout(() => setIsInitialLoading(false), 50);
      return () => clearTimeout(timer);
    }
  }, [isReady, performInitialScroll]);

  const targetMessageId = useMessageNavigation((s) => s.targetMessageId);
  const requestId = useMessageNavigation((s) => s.requestId);
  const clearHighlight = useMessageNavigation((s) => s.clearHighlight);

  useEffect(() => {
    if (!targetMessageId) return;

    scrollToMessage(targetMessageId);

    const timer = setTimeout(() => {
      clearHighlight();
    }, 1200);

    return () => clearTimeout(timer);
    // Добавляем все зависимости, которые просит линтер:
  }, [requestId, targetMessageId, scrollToMessage, clearHighlight]);
  const showEmptyState = groups.length === 0 && !isInitialLoading;
  const showLoadingState = isInitialLoading || !isReady;

  return (
    <div ref={wrapperRef} className="relative flex h-full min-h-0 flex-col">
      {showLoadingState && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fafbfd]">
          <div className="flex flex-col items-center gap-3">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            <p className="text-gray subtext">Загрузка сообщений...</p>
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={cn(
          "desktop:gap-5 desktop:py-2 bg-accent desktop:bg-[#fafbfd] relative flex h-full flex-col gap-3 overflow-y-auto py-4 transition-opacity duration-300",
          showLoadingState ? "pointer-events-none opacity-0" : "opacity-100",
          className,
        )}
      >
        {showEmptyState && <MessageListEmptyInfo type={chatType} isOwner={isOwner} />}

        <div className="mt-auto flex flex-col gap-3">
          {groups.map((group) => (
            <MessageGroup
              key={group.id}
              label={group.label}
              messages={group.messages}
              currentUserId={currentUserId}
              passDataAttributes={true}
              isGroup={chatType === "public-group" || chatType === "private-group"}
            />
          ))}
        </div>
      </div>

      {!isAtBottom && !showLoadingState && (
        <ScrollDownBtn className="absolute right-3 bottom-2" onClick={scrollToBottom} />
      )}
    </div>
  );
};

export default MessageList;
