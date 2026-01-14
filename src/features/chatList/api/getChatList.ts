import { ChatItemData, ChatListResponse } from "@/entities/chat/model/types";
import api from "@/shared/api/apiClient";

export const getChatList = async (): Promise<ChatItemData[]> => {
  const res = await api.get<ChatListResponse>("/api/v1/chat/list/");
  return res.data.results;
};
