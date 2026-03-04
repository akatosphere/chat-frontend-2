import { z } from "zod";

/** Схема одного участника из эндпоинта /participants/ */
export const ChatParticipantDtoSchema = z.object({
  uid: z.string().uuid(),
  is_deleted: z.boolean(),
  first_name: z.string(),
  last_name: z.string().nullish(),
  avatar_url: z.string().nullish(),
  avatar_webp_url: z.string().nullish(),
  is_owner: z.boolean(),
  is_blocked: z.boolean(),
  is_online: z.boolean(),
  was_online_at: z.number(),
  is_in_contacts: z.boolean(),
});

/** Схема пагинированного ответа списка участников */
export const ChatParticipantListResponseDtoSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(ChatParticipantDtoSchema),
});
