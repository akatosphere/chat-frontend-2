import z from "zod";

export const supportSchema = z.object({
  email: z.email("Некорректный e-mail"),
  text: z.string().min(10, "Не менее 10 символов"),
});
