import { z } from "zod";

const FileSchema = z.object({
  id: z.number(),
  uid: z.uuid(),
  file_url: z.url().nullable(),
  file_type: z.string(),
  new: z.boolean(),
  created_at: z.number(),
  updated_at: z.number(),
});

const MessageSchema = z.object({
  id: z.number(),
  uid: z.uuid(),
  from_user: z.string(),
  content: z.string(),
  files_list: z.array(FileSchema),
  new: z.boolean(),
  replied_messages: z.array(z.number()),
  forwarded_messages: z.array(z.number()),
  created_at: z.number(),
  updated_at: z.number(),
});

const ParticipantSchema = z.object({
  uid: z.uuid(),
  full_name: z.string(),
});

export const UserSchema = z.object({
  uid: z.uuid(),
  username: z.string(),
  nickname: z.string(),
  first_name: z.string(),
  last_name: z.string().nullable(),
  avatar_url: z.url().nullable(),
  avatar_webp_url: z.url().nullable(),
});

export const ChatDetailsSchema = z.object({
  id: z.number(),
  chat: z.object({
    uid: z.uuid(),
    username: z.string().nullable(),
    nickname: z.string().nullable(),
    avatar_url: z.url().nullable(),
  }),
  is_active: z.boolean(),
  is_favorite: z.boolean(),
  notifications: z.boolean(),
  message_count: z.number(),
  new_message_count: z.number(),

  last_message: MessageSchema.nullable(),

  last_seen_message: z.object({ id: z.number(), uid: z.uuid() }).nullable(),
  first_new_message: z.object({ id: z.number(), uid: z.uuid() }).nullable(),

  name: z.string(),
  chat_type: z.enum(["private-group", "public-group", "private-channel", "public-channel", "chat"]),
  chat_key: z.string(),
  created_by: z.uuid(),
  description: z.string().nullable(),
  participants: z.array(ParticipantSchema),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ChatDetails = z.infer<typeof ChatDetailsSchema>;
