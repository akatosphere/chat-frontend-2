import { DomainHandler, WSBaseResponse } from "./model/types";

const domainHandlers: Record<string, DomainHandler[]> = {};

export const registerWSHandler = (action: string, handler: DomainHandler) => {
  if (!domainHandlers[action]) domainHandlers[action] = [];
  domainHandlers[action].push(handler);

  // Возвращаем функцию отписки
  return () => {
    domainHandlers[action] = domainHandlers[action].filter((h) => h !== handler);
  };
};

export const dispatchWSEvent = (data: WSBaseResponse<unknown>) => {
  const handlers = domainHandlers[data.action];
  if (handlers) {
    handlers.forEach((handler) => handler(data));
  }
};
