import { ChatListResponse } from "@/entities/chat/model/types";
import { getApiClient } from "@/shared/api/getApiClient";

export const getChatList = async (url?: string): Promise<ChatListResponse> => {
  let endpoint = "/api/v1/chat/list/";

  if (url) {
    const parsed = new URL(url);
    endpoint = parsed.pathname + parsed.search;
  }

  const res = await getApiClient.get<ChatListResponse>(endpoint);
  return res.data;
};
