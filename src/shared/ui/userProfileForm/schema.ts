import z from "zod";

export const changeProfileSchema = z.object({
  name: z.string().min(2, "Не менее 2 символов").max(30, "Не более 30 символов"),
  lastName: z.string().min(2, "Не менее 2 символов").max(30, "Не более 30 символов"),
  phone: z.string().min(2, "Не менее 2 символов").max(30, "Не более 30 символов").optional(),
  description: z
    .string()
    .min(2, "Не менее 2 символов")
    .max(200, "Не более 200 символов")
    .optional(),
  nickname: z.string().min(2, "Не менее 2 символов").max(30, "Не более 30 символов"),
  birthday: z
    .object({
      day: z.number().min(1).max(31),
      month: z.number().min(1).max(12),
      year: z.number().min(1900).max(new Date().getFullYear()),
    })
    .refine(
      (val) => {
        const date = new Date(val.year, val.month - 1, val.day);
        return date.getDate() === val.day && date.getMonth() === val.month - 1;
      },
      { message: "Невалидная дата" },
    )
    .optional(),
});
