import { ChatListResponseDto } from "@/entities/chat/model/types";
import { getApiClient } from "@/shared/api/getApiClient";

export const getChatList = async (url?: string): Promise<ChatListResponseDto> => {
  let endpoint = "/api/v1/chat/list/";

  if (url) {
    const parsed = new URL(url);
    endpoint = parsed.pathname + parsed.search;
  }

  const res = await getApiClient.get<ChatListResponseDto>(endpoint, {
    params: {
      page_size: 12,
      ordering: "-is_favorite,-last_activity_at",
    },
  });

  return res.data;
};
