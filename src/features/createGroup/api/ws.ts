import { v4 as uuidv4 } from "uuid";

import { getSocket } from "@/shared/api/wsClient";

export type CreateGroupArgs = {
  name: string;
  description?: string;
  chat_type: "private-group" | "public-group";
  uid_users_list: string[];
};

export const createGroup = (args: CreateGroupArgs) => {
  const socket = getSocket();
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("WS не подключен");
    return;
  }

  const message = {
    action: "create_chat",
    request_uid: uuidv4(), // уникальный ID запроса
    object: {
      ...args,
      avatar: null, // или { filename: "", data: "" } если сервер требует объект
    },
  };

  socket.send(JSON.stringify(message));
};
