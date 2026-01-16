import { getGroupChannelServer } from "./getGroupChannelServer";

// Здесь будет импорт функции для личных чатов, когда вы её напишете
// import { getPrivateChatServer } from "./getPrivateChatServer";

export const getChatServer = async (chatKey: string) => {
  // 1. Пытаемся загрузить как группу или канал
  const groupRes = await getGroupChannelServer(chatKey);

  if (groupRes.success) {
    return groupRes;
  }

  // 2. Если не нашли группу, пробуем загрузить как личный чат (по UID пользователя)
  // const privateRes = await getPrivateChatServer(chatKey);
  // return privateRes;

  return groupRes; // Возвращаем исходную ошибку, если ничего не подошло
};
