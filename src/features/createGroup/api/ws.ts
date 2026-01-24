import { WSBaseResponse } from "@/shared/api/ws/model/types";
import { sendWSRequest } from "@/shared/api/ws/wsClient";
import { ChatObject } from "@/shared/types/wsTypes";

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
