import { WSBaseResponse } from "@/shared/api/ws/model/types";
import { sendWSRequest } from "@/shared/api/ws/wsClient";
import { WS_ACTIONS } from "@/shared/constants/constants";

export type DeleteChatResponse = WSBaseResponse<{
  chat_key: string;
}>;

export const deleteChat = async (chatKey: string): Promise<DeleteChatResponse> => {
  const response = await sendWSRequest<DeleteChatResponse>(WS_ACTIONS.DELETE_CHAT, {
    chat_key: chatKey,
  });

  if (response.status !== "OK") {
    throw new Error(response.error || "Ошибка при удалении чата");
  }

  return response;
};
