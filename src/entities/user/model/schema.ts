import { z } from "zod";

/** Схема валидации ника */
export const nicknameSchema = z
  .string()
  .min(3, "Минимум 3 символа")
  .regex(/^[a-zA-Z0-9_]+$/, "Только латиница, цифры и подчеркивание");

/** Объединенная схема профиля мессенджера */
export const updateProfileSchema = z.object({
  nickname: nicknameSchema.optional(),
  first_name: z.string().min(1, "Обязательное поле").optional(),
  last_name: z.string().min(1, "Обязательное поле").optional(),
  patronymic: z.string().optional(),
  additional_information: z.string().optional(),
  birthday: z.number().int().optional(),
  gender: z.enum(["male", "female"]).optional(),
  email: z.string().email("Некорректный email").or(z.literal("")).optional(),
  country: z.string().optional(),
  city_id: z.number().int().optional(),
  phone: z
    .string()
    .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, "Формат: +7 999 000 00 00")
    .optional(),
});

/**
 * Базовая схема (уже создана тобой)
 */
export const UserPreviewDtoSchema = z.object({
  uid: z.string().uuid(),
  username: z.string(),
  nickname: z.string(),
  first_name: z.string(),
  last_name: z.string().nullish(),
  patronymic: z.string().nullish(),
  avatar_url: z.string().nullish(),
  avatar_webp_url: z.string().nullish(),
});

/**
 * Схема для ChatMemberDto
 * Расширяет базовую схему полями участника чата / контакта
 */
export const ChatMemberDtoSchema = UserPreviewDtoSchema.extend({
  avatar: z.string().nullish(),
  avatar_webp: z.string().nullish(),
  is_blocked: z.boolean(),
  is_online: z.boolean(),
  was_online_at: z.number(),
  is_in_contacts: z.boolean(),
  chat_id: z.number().nullish(),
  birthday: z.number().nullish(),
  phone: z.string().nullish(),
  additional_information: z.string().nullish(),
});

/**
 * Схема для UserDto
 * Расширяет базовую схему полями полного профиля пользователя
 */
export const UserDtoSchema = UserPreviewDtoSchema.extend({
  avatar: z.string(),
  avatar_webp: z.string(),
  additional_information: z.string().nullish(), // В DTO string, но часто может быть пуст
  birthday: z.number().nullish().or(z.number()), // На случай если 0 или null
  email: z.string().email().or(z.string()), // .email() может упасть на пустой строке
  gender: z.enum(["male", "female"]),
  gender_label: z.string(),
  country: z.string(),
  country_label: z.string(),
  city_id: z.number(),
  city: z.string(),
  phone: z.string(),
  is_doctor: z.boolean(),
  is_confirmed_doctor: z.boolean(),
  is_filled: z.boolean(),
  is_staff: z.boolean(),
});
