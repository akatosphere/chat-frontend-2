import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(11, "Некорректный номер")
  .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, "Некорректный номер");
