import { v4 as uuidv4 } from "uuid";

import { getSocket } from "@/shared/api/wsClient";
import { useWSRequestStore } from "@/shared/model/wsRequest.store";
import { ChatObject, WSBaseResponse } from "@/shared/types/wsTypes";

export type CreateGroupArgs = {
  name: string;
  description?: string;
  chat_type: "private-group" | "public-group";
  uid_users_list: string[];
};

export const createGroup = (args: CreateGroupArgs): Promise<WSBaseResponse<ChatObject>> => {
  const socket = getSocket();
  if (!socket) throw new Error("No socket");

  const request_uid = uuidv4();
  const message = {
    action: "create_chat",
    request_uid, // уникальный ID запроса
    object: {
      ...args,
      avatar: null, // или { filename: "", data: "" } если сервер требует объект
    },
  };

  const promise = useWSRequestStore
    .getState()
    .trackRequest<WSBaseResponse<ChatObject>>(request_uid);

  socket.send(JSON.stringify(message));

  return promise;
};
