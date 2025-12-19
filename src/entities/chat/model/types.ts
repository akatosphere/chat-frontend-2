export type ChatType = "chat" | "group" | "channel";

export interface LastMessage {
  id: number;
  uid: string;
  from_user: string;
  content: string;
  files_summary?: {
    types: string[];
    count: number;
  } | null;
  has_replied_message?: boolean;
  has_forwarded_message?: boolean;
  new?: boolean;
  created_at: number;
  updated_at: number;
}

export interface ChatUser {
  uid: string;
  username: string;
  nickname: string | null;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  avatar_url?: string | null;
  avatar_webp?: string | null;
  avatar_webp_url?: string | null;
  is_blocked: boolean;
  is_online: boolean;
  was_online_at: number;
  is_in_contacts: boolean;
}

export interface ChatItemData {
  id: number;
  chat: ChatUser;
  is_favorite: boolean;
  notifications: boolean;
  new_message_count: number;
  new_file_count: number;
  name: string;
  chat_type: ChatType;
  chat_key: string;
  last_activity_at: number;
  last_message: LastMessage | null;
}

export interface ChatListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ChatItemData[];
}

export type MessageStatus = "sent" | "delivered" | "pending";

export type FilesSummary = {
  types: string[];
  count: number;
};

export type PreviewIconType = "photo" | "video" | "file";

export type LastMessagePreview = {
  icons: PreviewIconType[];
  text: string;
};

export type GetLastMessagePreviewParams = {
  content?: string;
  files?: FilesSummary | null;
};
