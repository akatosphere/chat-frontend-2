import z from "zod";

export const changeProfileSchema = z.object({
  name: z.string().min(2, "Не менее 2 символов").max(30, "Не более 30 символов"),
  lastName: z
    .string()
    .min(2, "Не менее 2 символов")
    .max(30, "Не более 30 символов")
    .or(z.literal("")),
  phone: z.string().min(2, "Не менее 2 символов").max(30, "Не более 30 символов").optional(),
  description: z
    .string()
    .min(2, "Не менее 2 символов")
    .max(200, "Не более 200 символов")
    .or(z.literal("")),
  nickname: z
    .string()
    .min(2, "Не менее 2 символов")
    .max(30, "Не более 30 символов")
    .regex(/^[a-zA-Z]+$/, {
      message: "Только латинские буквы",
    }),
  birthday: z
    .object({
      day: z.number().min(1).max(31).optional(),
      month: z.number().min(1).max(12).optional(),
      year: z.number().min(1900).max(new Date().getFullYear()).optional(),
    })
    .refine(
      (val) => {
        if (!val.day || !val.month || !val.year) return true;
        const date = new Date(val.year, val.month - 1, val.day);
        return date.getDate() === val.day && date.getMonth() === val.month - 1;
      },
      { message: "Невалидная дата" },
    )
    .optional(),
});
