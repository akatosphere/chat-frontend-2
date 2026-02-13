import { ChatListItem, ChatObject } from "@/entities/chat/model/types";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";

export const mapChatObjectToChatItem = (chat: ChatObject): ChatListItem => {
  const chatId = Number(chat.chat_id);

  return {
    id: chatId,

    member: {
      uid: chat.chat_key,
      username: chat.name,
      nickname: chat.name,
      first_name: chat.name,
      last_name: null,

      avatar_url: chat.avatar?.url ?? null,
      avatar_webp_url: null,

      avatar: chat.avatar?.url ?? null,
      avatar_webp: null,

      is_blocked: false,
      is_online: false,
      was_online_at: Date.now(),
      is_in_contacts: false,

      chat_id: chatId,
    },

    title: chat.name,
    type: chat.chat_type as ChatType,
    key: chat.chat_key,

    isFavorite: false,
    notificationsEnabled: true,

    unreadMessages: 0,
    unreadFiles: 0,

    lastActivityAt: Date.now(),
    lastMessage: null,

    avatar: {
      jpg: chat.avatar?.url ?? null,
    },
  };
};
