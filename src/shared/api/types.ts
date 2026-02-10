import { UserPreviewDto } from "@/entities/user/model/types";

export type Result<T = void> = { success: true; data: T } | { success: false; error: string };

export type ValidationError = Record<string, string[]>;
export type MessageError = { message?: string; detail?: string };

export type ApiFile = {
  id: number;
  uid: string;
  file_url: string;
  file_webp_url: string;
  file_type: string;
  created_at: number;
};

export type ApiMessage = {
  id: number;
  uid: string;
  from_user: UserPreviewDto;
  to_user: UserPreviewDto;
  content: string;
  files_list: ApiFile[];
  replied_messages: ApiMessage[];
  forwarded_messages: ApiMessage[];
  new: boolean;
  created_at: number;
  updated_at: number;
  chat_id: number;
};
