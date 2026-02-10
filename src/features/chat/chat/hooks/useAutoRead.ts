import { useCallback, useEffect, useRef } from "react";

import { sendReadStatus } from "@/entities/chat/api/sendReadStatus";

import { AUTO_READ_CONFIG } from "../lib/constants";
import { MappedChatMessage } from "../model/types/mappedTypes";

type BatchItem = {
  chatKey: string;
  messageUid: string;
};

interface UseAutoReadProps {
  messages: MappedChatMessage[];
  autoReadEnabled: boolean;
  readThreshold: number;
  readRootMargin: string;
  batchDelay: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

interface UseAutoReadReturn {
  observerRef: React.MutableRefObject<IntersectionObserver | null>;
  processedUIDsRef: React.MutableRefObject<Set<string>>;
}

export const useAutoRead = ({
  messages,
  autoReadEnabled,
  readThreshold = AUTO_READ_CONFIG.READ_THRESHOLD,
  readRootMargin = AUTO_READ_CONFIG.READ_ROOT_MARGIN,
  batchDelay = AUTO_READ_CONFIG.BATCH_DELAY,
  scrollContainerRef,
}: UseAutoReadProps): UseAutoReadReturn => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const processedUIDsRef = useRef<Set<string>>(new Set());
  const batchQueueRef = useRef<BatchItem[]>([]);
  const batchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const flushBatch = useCallback(async () => {
    if (batchQueueRef.current.length === 0) return;

    const batch = [...batchQueueRef.current];
    batchQueueRef.current = [];

    // Выполняем все запросы параллельно и собираем ошибки
    const results = await Promise.allSettled(
      batch.map(async ({ chatKey, messageUid }) => {
        await sendReadStatus({ chatKey, idOrUid: messageUid });
        processedUIDsRef.current.add(messageUid);
        return { success: true, messageUid };
      }),
    );

    // Логируем ошибки, если есть
    const errors = results.filter(
      (result): result is PromiseRejectedResult => result.status === "rejected",
    );
    if (errors.length > 0) {
      console.error(`Ошибки прочтения сообщений: ${errors.length} из ${batch.length}`, errors);
    }
  }, []);

  // Обработка видимого сообщения
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!autoReadEnabled) return;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target as HTMLElement;
        const messageUid = element.getAttribute("data-message-uid");
        const chatKey = element.getAttribute("data-chat-key");
        const isFromCurrentUser = element.getAttribute("data-is-from-current-user") === "true";
        const isNew = element.getAttribute("data-is-new") === "true";

        if (!messageUid || !chatKey) return;
        if (isFromCurrentUser || !isNew) return;
        if (processedUIDsRef.current.has(messageUid)) return;

        processedUIDsRef.current.add(messageUid);
        batchQueueRef.current.push({ chatKey, messageUid });

        if (batchTimerRef.current) {
          clearTimeout(batchTimerRef.current);
        }
        batchTimerRef.current = setTimeout(flushBatch, batchDelay);
      });
    },
    [autoReadEnabled, batchDelay, flushBatch],
  );

  // Инициализация observer один раз
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: scrollContainerRef.current,
      threshold: readThreshold,
      rootMargin: readRootMargin,
    });

    return () => {
      observerRef.current?.disconnect();
      if (batchTimerRef.current) {
        clearTimeout(batchTimerRef.current);
      }
    };
  }, [handleIntersection, readThreshold, readRootMargin, scrollContainerRef]);

  // Обновление наблюдаемых элементов
  useEffect(() => {
    if (!observerRef.current || !scrollContainerRef.current) return;

    const observer = observerRef.current;

    // Наблюдаем за всеми сообщениями с data-message-uid
    const elements = scrollContainerRef.current.querySelectorAll("[data-message-uid]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [messages, scrollContainerRef]);

  return {
    observerRef,
    processedUIDsRef,
  };
};
