import { ChatItemData, ChatType } from "@/entities/chat/model/types";
import { ChatObject } from "@/shared/types/wsTypes";

export const mapGroupType = (type: "open" | "closed"): "public-group" | "private-group" =>
  type === "open" ? "public-group" : "private-group";

export const mapChatObjectToChatItem = (chat: ChatObject): ChatItemData => ({
  id: Number(chat.chat_id),
  name: chat.name,

  // chat: null,
  chat_type: chat.chat_type as ChatType,
  chat_key: chat.chat_key,

  is_favorite: false,
  notifications: false,
  new_message_count: 0,
  new_file_count: 0,

  last_message: null,
  last_activity_at: Date.now(),

  avatar_url: chat.avatar?.url ?? null,
  avatar_webp_url: null,
});
