"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ChatMessageList } from "@/features/chat/chat/model/types/serverTypes";

import { getMessages, GetMessagesParams } from "../api/getMessages";

export const useChatMessages = (params: GetMessagesParams) => {
  return useInfiniteQuery<ChatMessageList>(
    ["chatMessages", params.user_uid],
    async ({ pageParam = 1 }) => {
      const result = await getMessages({ ...params, page: pageParam });
      if (!result.success) throw new Error(result.error || "Ошибка получения сообщений");
      return result.data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          return Number(url.searchParams.get("page")) || undefined;
        }
        return undefined;
      },
    },
  );
};
