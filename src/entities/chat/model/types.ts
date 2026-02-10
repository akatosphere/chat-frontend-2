import { ChatMemberDto } from "@/entities/user/model/types";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";

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

export type ChatObject = {
  chat_id: string;
  chat_key: string;
  name: string;
  description: string;
  chat_type: ChatType;
  created_by: string;
  owner_full_name: string;
  avatar: {
    filename: string;
    url: string;
  } | null;
  added_users: Array<{
    uid: string;
    full_name: string;
  }>;
};

export interface ChatListItemDto {
  id: number;
  chat: ChatMemberDto;
  is_favorite: boolean;
  notifications: boolean;
  new_message_count: number;
  new_file_count: number;
  name: string;
  chat_type: ChatType;
  chat_key: string;
  last_activity_at: number;
  last_message: LastMessage | null;
  avatar_url?: string | null;
  avatar_webp_url?: string | null;
}

export interface ChatListResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: ChatListItemDto[];
}

export interface ChatListItem {
  id: number;
  key: string;
  title: string;
  type: ChatType;

  isFavorite: boolean;
  notificationsEnabled: boolean;

  unreadMessages: number;
  unreadFiles: number;

  lastActivityAt: number;
  lastMessage: LastMessage | null;

  avatar: {
    jpg?: string | null;
    webp?: string | null;
  };

  member: ChatMemberDto;
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
