import { ChatItemData } from "@/entities/chat/model/types";

export type ChatListState = {
  chats: ChatItemData[];
  count: number;
  next: string | null;
  isLoading: boolean;
  error: string | null;
};
export type ChatActions = {
  toggleReadStatus: (chatId: number) => void;
  deleteChat: (chatId: number) => void;
  toggleFavorite: (chatId: number, pin: boolean) => void;
  toggleMuteStatus: (chatId: number, mute: boolean) => void;
};
