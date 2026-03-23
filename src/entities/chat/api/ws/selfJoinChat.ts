import { WSBaseResponse } from "@/shared/api/ws/model/types";
import { sendWSRequest } from "@/shared/api/ws/wsClient";

export type SelfJoinChatResponse = WSBaseResponse<{
  chat_key: string;
}>;

export const selfJoinChat = async (chatKey: string) => {
  try {
    const response = await sendWSRequest<SelfJoinChatResponse>("self_join_chat", {
      chat_key: chatKey,
    });
    console.log("Сообщение доставлено:", response);
  } catch (error) {
    console.error("Ошибка отправки (или очередь полна):", error);
  }
};
