import { WSBaseResponse, WSHandler } from "./model/types";

const wsHandlers: Record<string, WSHandler[]> = {};

export const registerWSHandler = (action: string, handler: WSHandler) => {
  if (!wsHandlers[action]) wsHandlers[action] = [];
  wsHandlers[action].push(handler);

  // Возвращаем функцию отписки
  return () => {
    wsHandlers[action] = wsHandlers[action].filter((h) => h !== handler);
  };
};

export const dispatchWSEvent = (data: WSBaseResponse<unknown>) => {
  const handlers = wsHandlers[data.action];
  if (handlers) {
    handlers.forEach((handler) => handler(data));
  }
};
