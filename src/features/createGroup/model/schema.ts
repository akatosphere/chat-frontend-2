import z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Обязательное поле").max(100, "Максимум 100 символов"),
  description: z.string().max(250, "Максимум 250 символов"),
  avatar: z.any().optional(),
});
