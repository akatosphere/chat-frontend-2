import { z } from "zod";

const firstNameSchema = z
  .string()
  .min(1, "Заполните поле")
  .min(2, "Не менее 2 символов")
  .max(30, "Не более 30 символов")
  .regex(/^[A-Za-zА-Яа-яЁё\s-]+$/, "Только буквы, пробел или тире");

const nicknameSchema = z
.string()
.min(1, "Заполните поле")
.min(5, "Не менее 5 символов")
.max(30, "Не более 30 символов")
.regex(/^[A-Za-z0-9_-]+$/, "Латиница, цифры, тире или подчёркивание");

    
const userFormSchema = z.object({
    firstName: firstNameSchema,
    nickname: nicknameSchema,
});

type UserFormData = z.infer<typeof userFormSchema>;

export {firstNameSchema, nicknameSchema, userFormSchema, type UserFormData}
