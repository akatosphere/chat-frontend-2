import { z } from "zod";

export const phoneSchema = z
  .string()
  .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, "Неверный формат телефона");


export const userSchema = z.object({
  firstname: z
    .string()
    .min(1, "Заполните поле") // обязательное поле
    .min(2, "Не менее 2 символов")
    .regex(/^[A-Za-zА-Яа-яЁё\s-]+$/, "Только буквы, пробел или тире"),

  nickname: z
    .string()
    .min(1, "Заполните поле") // обязательное поле
    .min(5, "Не менее 5 символов")
    .regex(/^[A-Za-z0-9_-]+$/, "Латиница, цифры, тире или подчёркивание"),
});


