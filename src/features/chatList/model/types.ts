import { ChatItemData } from "@/entities/chat/model/types";

export type ChatListState = {
  chats: ChatItemData[];
  isLoading: boolean;
  error: string | null;
};
