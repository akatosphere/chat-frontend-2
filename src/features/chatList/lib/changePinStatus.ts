import { mockChats } from "./data";

export const changePinStatus = async (chatId: string, pin: boolean) => {
  const mock = mockChats.results.find((c) => c.id === +chatId)!;
  if (mock) mock.is_favorite = pin;
};
