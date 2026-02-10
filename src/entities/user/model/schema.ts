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
