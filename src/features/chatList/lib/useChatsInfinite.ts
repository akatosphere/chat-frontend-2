import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getChatList } from "../api/getChatList";
import { useChatListStore } from "../model/useChatListStore";

export const useChatsInfinite = () => {
  const mergeFromPages = useChatListStore((store) => store.mergeFromPages);
  const setCount = useChatListStore((store) => store.setCount);

  const query = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: ({ pageParam }: { pageParam?: string }) => getChatList(pageParam),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    initialPageParam: undefined,
    // staleTime: 1000 * 60 * 10,
    // refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.data) return;

    mergeFromPages(query.data.pages);
    setCount(query.data.pages[0]?.count ?? 0);
  }, [query.data, mergeFromPages, setCount]);

  return query;
};
