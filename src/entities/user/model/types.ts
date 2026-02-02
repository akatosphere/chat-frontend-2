import { z } from "zod";

import { updateProfileSchema, UserPreviewDtoSchema } from "./schema";

/**
 * DTO (Data Transfer Object) — сырые данные от бэкенда (snake_case)
 */

// export type UserPreviewDto = {
//   uid: string;
//   username: string;
//   nickname: string;
//   first_name: string;
//   last_name?: string;
//   patronymic?: string;
//   avatar_url?: string | null;
//   avatar_webp_url?: string | null;
// };

// Выводим тип напрямую из схемы, чтобы гарантировать 100% совместимость с маппером
export type UserPreviewDto = z.infer<typeof UserPreviewDtoSchema>;

export type ChatMemberDto = UserPreviewDto & {
  avatar?: string | null;
  avatar_webp?: string | null;
  is_blocked: boolean;
  is_online: boolean;
  was_online_at: number;
  is_in_contacts: boolean;
  chat_id?: number | null;
  birthday?: number | null;
  phone?: string | null;
  additional_information?: string | null;
};

export type UserDto = UserPreviewDto & {
  avatar: string;
  avatar_webp: string;
  additional_information: string;
  birthday: number;
  email: string;
  gender: "male" | "female";
  gender_label: string;
  country: string;
  country_label: string;
  city_id: number;
  city: string;
  phone: string;
  is_doctor: boolean;
  is_confirmed_doctor: boolean;
  is_filled: boolean;
  is_staff: boolean;
};

/**
 * Domain Model — очищенные данные для использования в UI (camelCase)
 */

export type UserPreview = {
  uid: string;
  username: string;
  nickname: string;
  firstName: string;
  lastName?: string | null;
  fullName?: string;
  avatarUrl: string;
};

export type ChatMember = UserPreview & {
  isBlocked: boolean;
  isOnline: boolean;
  lastSeenAt: number;
  isInContacts: boolean;
  chatId: number | null;
  bio?: string;
};

export type User = UserPreview & {
  bio: string;
  birthday: number;
  email: string;
  gender: "male" | "female";
  phone: string;
  isFilled: boolean;
  isDoctor: boolean;
};

/** Тип данных для обновления профиля, выведенный из Zod-схемы */
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

/** Ответ на проверку ника */
export type CheckNicknameResponse = {
  message: string;
};
