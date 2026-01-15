import { ChatListResponse } from "@/entities/chat/model/types";
import api from "@/shared/api/apiClient";

export const getChatList = async (url?: string): Promise<ChatListResponse> => {
  let endpoint = "/api/v1/chat/list/";

  if (url) {
    const parsed = new URL(url);
    endpoint = parsed.pathname + parsed.search;
  }

  const res = await api.get<ChatListResponse>(endpoint);
  return res.data;
};
