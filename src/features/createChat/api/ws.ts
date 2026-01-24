import { sendWSRequest } from "@/shared/api/wsClient";
import { ChatObject, WSBaseResponse } from "@/shared/types/wsTypes";

import { ChatType } from "../model/types";

export type CreateChatArgs = {
  name: string;
  description?: string;
  chat_type: ChatType;
  uid_users_list: string[];
  avatar: {
    filename: string;
    data: string; // здесь будет чистый base64
  } | null;
};

export const createChat = (args: CreateChatArgs): Promise<WSBaseResponse<ChatObject>> => {
  return sendWSRequest<WSBaseResponse<ChatObject>>("create_chat", args);
};
