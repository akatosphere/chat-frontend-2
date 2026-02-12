// entities/chat/model/chatInfo.ts

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { UserPreview } from "@/entities/user/model/types";

import { ChatType } from "../model/types/serverTypes";

export interface ChatInfo {
  id?: number;
  type: ChatType;
  uid: string;
  createdBy?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  avatarUrl?: string;
  membersCount?: number;
  isOnline?: boolean | null;
  description?: string;
  created_at?: string;
  wasOnlineAt?: number | null;
}

export const normalizeChatInfo = (info: MappedChatDetails | UserPreview): ChatInfo => {
  // Если это группа/канал
  if ("type" in info) {
    return {
      id: info.id,
      uid: info.uid,
      type: info.type,
      title: info.title,
      createdBy: info.createdBy,
      avatar: info.avatar || "",
      membersCount: info.membersCount,
      description: info.description,
    };
  }

  // Если это личный чат
  return {
    id: info.id,
    uid: info.uid,
    type: "chat" as ChatType,
    firstName: info.firstName,
    lastName: info.lastName,
    avatarUrl: info.avatarUrl,
    wasOnlineAt: info.wasOnlineAt,
    isOnline: info.isOnline,
  };
};
