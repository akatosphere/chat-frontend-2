// wsClient.ts
import { v4 as uuidv4 } from "uuid";

import { useWSRequestStore } from "../model/wsRequest.store";
import { WSBaseResponse } from "../types/wsTypes";

type WSStatus = "idle" | "connecting" | "connected" | "reconnecting" | "closed";
type WSHandler = (data: WSBaseResponse<unknown>) => void;

let socket: WebSocket | null = null;
let currentToken: string | null = null;
let status: WSStatus = "idle";

let reconnectAttempts = 0;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let manualClose = false;

const MAX_RECONNECT_DELAY = 30_000;

const handlers = new Set<WSHandler>();

const getReconnectDelay = () => Math.min(1000 * 2 ** reconnectAttempts, MAX_RECONNECT_DELAY);

const clearReconnectTimeout = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
};

export const subscribeToWS = (handler: WSHandler) => {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
};

const attachHandlers = (ws: WebSocket) => {
  ws.onopen = () => {
    console.log("WS connected ✅");
    status = "connected";
    reconnectAttempts = 0;
    clearReconnectTimeout();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as WSBaseResponse<unknown>;
      handlers.forEach((handler) => handler(data));
      console.log("WS message 📩", data);
    } catch {
      console.log("WS raw message:", event.data);
    }
  };

  ws.onclose = (event) => {
    console.log("WS closed ❌", event.code, event.reason);
    socket = null;

    if (manualClose) {
      status = "closed";
      return;
    }

    if (!navigator.onLine) {
      status = "reconnecting";
      scheduleReconnect();
      return;
    }

    status = "reconnecting";
    scheduleReconnect();
  };

  ws.onerror = () => {
    // onerror почти бесполезен → инициируем close,
    // чтобы гарантированно попасть в onclose
    ws.close();
  };
};

export const sendWSRequest = <TResponse>(action: string, payload: unknown): Promise<TResponse> => {
  const socket = getSocket();

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    // Вместо простого throw можно сделать более умную логику (например, очередь)
    // Но для начала — просто ошибка, как и было
    return Promise.reject(new Error("WebSocket is not connected"));
  }

  const request_uid = uuidv4();

  const message = {
    action,
    request_uid,
    object: payload,
  };

  // Регистрируем ожидание ответа в сторе
  const promise = useWSRequestStore.getState().trackRequest<TResponse>(request_uid);

  // Отправляем
  socket.send(JSON.stringify(message));

  return promise;
};

const scheduleReconnect = () => {
  if (!currentToken) return;

  clearReconnectTimeout();

  const delay = getReconnectDelay();
  console.log(`WS reconnect in ${delay}ms`);

  reconnectTimeout = setTimeout(() => {
    reconnectAttempts += 1;
    connectWS(currentToken!);
  }, delay);
};

export const connectWS = (accessToken: string) => {
  // защита от лишних connect
  if (
    socket &&
    currentToken === accessToken &&
    (status === "connecting" || status === "connected")
  ) {
    return;
  }

  manualClose = false;
  currentToken = accessToken;
  status = "connecting";

  clearReconnectTimeout();

  if (socket) {
    socket.close();
    socket = null;
  }

  const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/chat?authorization=${accessToken}`;
  socket = new WebSocket(wsUrl);

  attachHandlers(socket);
};

export const disconnectWS = () => {
  manualClose = true;
  clearReconnectTimeout();

  if (socket) {
    socket.close();
    socket = null;
  }

  currentToken = null;
  status = "closed";
};

export const getSocket = () => socket;
export const getWSStatus = () => status;
