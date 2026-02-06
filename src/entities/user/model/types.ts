import { z } from "zod";

import {
  ChatMemberDtoSchema,
  updateProfileSchema,
  UserDtoSchema,
  UserPreviewDtoSchema,
} from "./schema";

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
export type ChatMemberDto = z.infer<typeof ChatMemberDtoSchema>;
export type UserDto = z.infer<typeof UserDtoSchema>;

/**
 * Domain Model — очищенные данные для использования в UI (camelCase)
 */

export type UserPreview = {
  uid: string;
  username: string;
  nickname: string;
  firstName: string;
  lastName: string; // В Entity лучше хранить строку, пустую по умолчанию
  patronymic: string;
  fullName: string;
  avatarUrl: string;
  avatarWebpUrl: string;
};

export type ChatMember = UserPreview & {
  // Дополнительные поля аватаров, которые приходят в ChatMemberDto
  avatarExtra: string | null;
  avatarWebpExtra: string | null;
  isBlocked: boolean;
  isOnline: boolean;
  lastSeenAt: number;
  isInContacts: boolean;
  chatId: number | null;
  birthday: number | null;
  phone: string;
  bio: string; // Из additional_information
};

export type User = UserPreview & {
  avatar: string;
  avatarWebp: string;
  bio: string; // Из additional_information
  birthday: number | null;
  email: string;
  gender: "male" | "female";
  genderLabel: string;
  country: string;
  countryLabel: string;
  cityId: number;
  city: string;
  phone: string;
  isDoctor: boolean;
  isConfirmedDoctor: boolean;
  isFilled: boolean;
  isStaff: boolean;
};

export type UserEntity = UserPreview | ChatMember | User;

/** Тип данных для обновления профиля, выведенный из Zod-схемы */
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

/** Ответ на проверку ника */
export type CheckNicknameResponse = {
  message: string;
};
