"use client";

import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useChatStore } from "@/entities/chat/model/useChatStore";
import { cn } from "@/shared/shadcn/lib/utils";

import { useAutoRead } from "../hooks";
import { useMessageScroll } from "../hooks/useMessageScroll";
import { groupMessagesByDate } from "../lib/getMessageByDate";
import { useMessageNavigation } from "../model/store/useChatNavigationStore";
import { MessageGroup } from "./messageGroup";
import { MessageListEmptyInfo } from "./messageListEpmtyInfo";
import { ScrollDownBtn } from "./scrollDownBtn";
import TopLoader from "./topLoader";

interface MessageListProps {
  className?: string;
  currentUserId: string;
  fetchNextPage?: UseInfiniteQueryResult["fetchNextPage"];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  loadedPages?: number;
  isOwner: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  className,
  currentUserId,
  isOwner,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
  loadedPages = 1,
}) => {
  const messages = useChatStore((s) => s.messages);
  const isReady = useChatStore((s) => s.isReady);
  const chatType = useChatStore((s) => s.chatType);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topLoaderRef = useRef<HTMLDivElement>(null);

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const prevScrollHeightRef = useRef<number>(0);
  const prevMessagesCountRef = useRef<number>(0);

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
    if (!isReady) return;

    performInitialScroll();

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [isReady, performInitialScroll]);

  const targetMessageId = useMessageNavigation((s) => s.targetMessageId);
  const targetPage = useMessageNavigation((s) => s.targetPage);
  const requestId = useMessageNavigation((s) => s.requestId);
  const clearHighlight = useMessageNavigation((s) => s.clearHighlight);
  const reset = useMessageNavigation((s) => s.reset);

  const saveScrollSnapshot = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    prevScrollHeightRef.current = container.scrollHeight;
    prevMessagesCountRef.current = messages.length;
  };
  useEffect(() => {
    if (targetPage === null) return;

    if (loadedPages < targetPage && hasNextPage && !isFetchingNextPage) {
      saveScrollSnapshot();
      fetchNextPage?.();
    }
  }, [targetPage, loadedPages, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!targetMessageId) return;

    const exists = messages.some((m) => m.uid === targetMessageId);

    if (!exists) return;

    scrollToMessage(targetMessageId);

    const timer = setTimeout(() => {
      clearHighlight();
      reset();
    }, 1500);

    return () => clearTimeout(timer);
  }, [messages, requestId, targetMessageId, scrollToMessage, clearHighlight, reset]);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (messages.length <= prevMessagesCountRef.current) return;

    const newScrollHeight = container.scrollHeight;
    const heightDiff = newScrollHeight - prevScrollHeightRef.current;

    if (heightDiff > 0) {
      container.scrollTop += heightDiff;
    }

    prevScrollHeightRef.current = newScrollHeight;
    prevMessagesCountRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (!topLoaderRef.current) return;
    if (!fetchNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !isFetchingNextPage) {
          saveScrollSnapshot();
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.1,
      },
    );

    observer.observe(topLoaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const showEmptyState = groups.length === 0 && !isInitialLoading;
  const showLoadingState = isInitialLoading || !isReady;

  return (
    <div className="relative flex h-full min-h-0 flex-col">
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
          "bg-accent desktop:bg-[#fafbfd] relative flex h-full flex-col gap-3 overflow-y-auto py-4",
          showLoadingState ? "pointer-events-none opacity-0" : "opacity-100",
          className,
        )}
      >
        {/* <div ref={topLoaderRef} className="flex w-full justify-center py-2"> */}
        {isFetchingNextPage && <TopLoader />}
        {/* </div> */}

        {showEmptyState && <MessageListEmptyInfo type={chatType} isOwner={isOwner} />}

        <div className="mt-auto flex flex-col gap-3">
          {groups.map((group) => (
            <MessageGroup
              key={group.id}
              label={group.label}
              messages={group.messages}
              currentUserId={currentUserId}
              passDataAttributes
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
