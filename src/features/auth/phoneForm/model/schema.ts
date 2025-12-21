import { z } from "zod";

const phoneSchema = z.object({
  phone: z.string().regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, "Неверный формат телефона"),
});

type PhoneData = z.infer<typeof phoneSchema>;

export { type PhoneData, phoneSchema };
