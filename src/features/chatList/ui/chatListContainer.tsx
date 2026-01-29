import { useEffect, useMemo, useRef } from "react";

import { filterChats } from "../lib/filterChats";
import { useChatsInfinite } from "../lib/useChatsInfinite";
import { useChatListStore } from "../model/useChatListStore";
import { ChatList } from "./chatList";

type ChatListContainerProps = {
  search: string;
};

export const ChatListContainer = ({ search }: ChatListContainerProps) => {
  const { isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatsInfinite();

  // собираем все страницы в один массив
  const chatsById = useChatListStore((s) => s.chatsById);
  const order = useChatListStore((s) => s.order);

  const chats = useMemo(() => order.map((id) => chatsById[id]).filter(Boolean), [order, chatsById]);

  const filtered = filterChats(chats, search);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // инфинити-скролл
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="p-4 text-center">Загрузка чатов...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Ошибка загрузки</div>;
  }

  return (
    <div className="flex flex-col">
      <ChatList chats={filtered} isSearch={search.length > 0} />

      {/* триггер подгрузки */}
      <div ref={loadMoreRef} className="h-1" />

      {isFetchingNextPage && <div className="p-2 text-center text-sm opacity-60">Загрузка...</div>}
    </div>
  );
};
