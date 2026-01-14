import { ChatDetails } from "../model/schema";

/**
 * Интерфейс, который будет использовать фронтенд (UI)
 */
export interface MappedChatDetails {
  id: number;
  uid: string;
  title: string;
  chatKey: string;
  type: "private-group" | "public-group" | "channel";
  description: string;
  avatar: string | null;
  unreadCount: number;
  totalMessages: number;
  lastMessage: {
    text: string;
    sender: string;
    createdAt: number;
    hasFiles: boolean;
  } | null;
  membersCount: number;
  members: Array<{
    uid: string;
    name: string;
  }>;
  isFavorite: boolean;
  isNotificationsEnabled: boolean;
}

/**
 * Функция-маппер
 */
export const mapChatDetails = (raw: ChatDetails): MappedChatDetails => {
  // Выносим обработку сообщения отдельно.
  // Это убирает вложенный тернарный оператор из return,
  // и линтер перестает путаться в отступах.
  const lastMessageData = raw.last_message
    ? {
        text: raw.last_message.content,
        sender: raw.last_message.from_user,
        createdAt: raw.last_message.created_at,
        hasFiles: raw.last_message.files_list.length > 0,
      }
    : null;

  return {
    id: raw.id,
    uid: raw.chat.uid,
    title: raw.name,
    chatKey: raw.chat_key,
    type: raw.chat_type,
    description: raw.description || "",
    avatar: raw.chat.avatar_url,

    unreadCount: raw.new_message_count,
    totalMessages: raw.message_count,

    // Теперь здесь простая переменная
    lastMessage: lastMessageData,

    membersCount: raw.participants.length,
    members: raw.participants.map((p) => ({
      uid: p.uid,
      name: p.full_name,
    })),

    isFavorite: raw.is_favorite,
    isNotificationsEnabled: raw.notifications,
  };
};
