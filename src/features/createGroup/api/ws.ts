import { sendWSRequest } from "@/shared/api/wsClient";
import { ChatObject, WSBaseResponse } from "@/shared/types/wsTypes";

export type CreateGroupArgs = {
  name: string;
  description?: string;
  chat_type: "private-group" | "public-group";
  uid_users_list: string[];
};

export const createGroup = (args: CreateGroupArgs): Promise<WSBaseResponse<ChatObject>> => {
  return sendWSRequest<WSBaseResponse<ChatObject>>("create_chat", {
    ...args,
    avatar: null,
  });
};
