import { useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/shallow";

import { filterChats } from "../lib/filterChats";
import { useChatsInfinite } from "../lib/useChatsInfinite";
import { useChatListStore } from "../model/useChatListStore";
import { ChatList } from "./chatList";

type Props = {
  search: string;
};

export const ChatListContainer = ({ search }: Props) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useChatsInfinite();

  const { chatsById, order } = useChatListStore(
    useShallow((s) => ({
      chatsById: s.chatsByKey,
      order: s.order,
    })),
  );

  const chats = useMemo(() => order.map((id) => chatsById[id]).filter(Boolean), [order, chatsById]);

  const filtered = useMemo(() => filterChats(chats, search), [chats, search]);
  console.log("filtered:", filtered);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div className="p-4 text-center">Загрузка чатов...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Ошибка загрузки</div>;
  }

  return (
    <div className="flex flex-col">
      <ChatList chats={filtered} isSearch={!!search} />

      <div ref={loadMoreRef} className="h-1" />

      {isFetchingNextPage && <div className="p-2 text-center text-sm opacity-60">Загрузка...</div>}
    </div>
  );
};
