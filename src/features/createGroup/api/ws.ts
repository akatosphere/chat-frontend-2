import { v4 as uuidv4 } from "uuid";

import { getSocket } from "@/shared/api/wsClient";

export const createGroup = () => {
  const socket = getSocket();
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("WS не подключен");
    return;
  }

  const message = {
    action: "create_chat",
    request_uid: uuidv4(), // уникальный ID запроса
    object: {
      name: "testGroup",
      description: "",
      avatar: null, // или { filename: "", data: "" } если сервер требует объект
      chat_type: "private-group",
      uid_users_list: [], // пока только создатель
    },
  };

  socket.send(JSON.stringify(message));
};
