import { z } from "zod";

import { updateProfileSchema } from "./schema";

/**
 * DTO (Data Transfer Object) — сырые данные от бэкенда (snake_case)
 */
export type UserDto = {
  uid: string;
  username: string;
  nickname: string;
  first_name: string;
  last_name: string;
  patronymic: string;
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
  avatar: string;
  avatar_url: string;
  avatar_webp: string;
  avatar_webp_url: string;
  is_doctor: boolean;
  is_confirmed_doctor: boolean;
  is_filled: boolean;
  is_staff: boolean;
};

/**
 * Domain Model — очищенные данные для использования в UI (camelCase)
 */
export type User = {
  uid: string;
  username: string;
  nickname: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  fullName: string;
  bio: string;
  birthday: number;
  email: string;
  gender: "male" | "female";
  phone: string;
  avatarUrl: string;
  isFilled: boolean;
  isDoctor: boolean;
  hasAvatar: boolean;
};

/** Тип данных для обновления профиля, выведенный из Zod-схемы */
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

/** Ответ на проверку ника */
export type CheckNicknameResponse = {
  message: string;
};
