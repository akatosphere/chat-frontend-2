import { UserPreview } from "@/entities/user/model/types";

export type ContactSystemContactDto = {
  uid: string;
  avatar: string;
  avatar_url: string;
  avatar_webp: string;
  avatar_webp_url: string;
  is_online: boolean;
  was_online_at: number;
};

/** Основной объект контакта из списка /messenger-list/ */
export type ContactDto = {
  uid: string;
  owner_user: string; // UID владельца списка
  system_contact: ContactSystemContactDto;
  first_name: string; // Имя, как оно записано у владельца
  last_name: string; // Фамилия, как она записана у владельца
  phone: string;
};

/** Пагинированный ответ списка контактов */
export type ContactListResponseDto = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ContactDto[];
};

export type Contact = UserPreview & {
  phone: string;
  isOnline: boolean;
  lastSeenAt: number;
  // Мы можем хранить оригинальный UID системного пользователя,
  // если он отличается от UID записи в книге контактов
  systemUid: string;
};

/** Структура для Infinite Query и Zustand Store */
export type ContactListResponse = {
  count: number;
  next: string | null;
  results: Contact[];
};

export type AddByPhonePayload = {
  phone: string;
  first_name: string;
  last_name: string;
};
