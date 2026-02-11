import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { mapChatList } from "@/entities/chat/model/mapper";

import { getChatList } from "../api/getChatList";
import { useChatListStore } from "../model/useChatListStore";

export const useChatsInfinite = () => {
  const mergeChats = useChatListStore((s) => s.mergeChats);
  const setCount = useChatListStore((s) => s.setCount);

  const query = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: ({ pageParam }: { pageParam?: string }) => getChatList(pageParam),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    initialPageParam: undefined,
  });

  useEffect(() => {
    if (!query.data) return;

    const pages = query.data.pages;
    if (!pages.length) return;

    const lastPage = pages[pages.length - 1];
    const mappedChats = mapChatList(lastPage.results);
    mergeChats(mappedChats);

    if (pages.length === 1 && typeof lastPage.count === "number") {
      setCount(lastPage.count);
    }
  }, [query.data?.pages.length]);

  return query;
};
