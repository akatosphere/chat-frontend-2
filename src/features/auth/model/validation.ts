import { z } from "zod";

const phoneSchema = z
  .string()
  .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, "Неверный формат телефона");


  
const firstNameSchema = z
.string()
  .min(1, "Заполните поле")
  .min(2, "Не менее 2 символов")
  .max(30, "Не более 30 символов")
  .regex(/^[A-Za-zА-Яа-яЁё\s-]+$/, "Только буквы, пробел или тире");

const nickNameSchema = z
.string()
.min(1, "Заполните поле")
.min(5, "Не менее 5 символов")
.max(30, "Не более 30 символов")
.regex(/^[A-Za-z0-9_-]+$/, "Латиница, цифры, тире или подчёркивание");

    
const userFormSchema = z.object({
    firstName: firstNameSchema,   // твои уже существующие схемы
    nickName: nickNameSchema,
});

type UserFormData = z.infer<typeof userFormSchema>;

export {phoneSchema, firstNameSchema, nickNameSchema, userFormSchema, type UserFormData}
