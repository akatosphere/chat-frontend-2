import { ChatDetails } from "../model/schema";

/**
 * Интерфейс, который будет использовать фронтенд (UI)
 * Избавляемся от лишней вложенности и snake_case
 */
export interface MappedChatDetails {
  id: number;
  uid: string;
  title: string;
  chatKey: string;
  type: "private-group" | "public-group" | "channel";
  description: string;
  avatar: string | null;

  // Информация о счетчиках
  unreadCount: number;
  totalMessages: number;

  // Упрощенная информация о последнем сообщении
  lastMessage: {
    text: string;
    sender: string;
    createdAt: number;
    hasFiles: boolean;
  } | null;

  // Участники
  membersCount: number;
  members: Array<{
    uid: string;
    name: string;
  }>;

  // Настройки
  isFavorite: boolean;
  isNotificationsEnabled: boolean;
}

/**
 * Функция-маппер
 */
export const mapChatDetails = (raw: ChatDetails): MappedChatDetails => {
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

    // Обработка последнего сообщения с проверкой на null
    lastMessage: raw.last_message
      ? {
          text: raw.last_message.content, // Было 10, стало 8 пробелов
          sender: raw.last_message.from_user,
          createdAt: raw.last_message.created_at,
          hasFiles: raw.last_message.files_list.length > 0,
        } // Было 8, стало 6 пробелов
      : null,

    membersCount: raw.participants.length,
    members: raw.participants.map((p) => ({
      uid: p.uid,
      name: p.full_name,
    })),

    isFavorite: raw.is_favorite,
    isNotificationsEnabled: raw.notifications,
  };
};
