import { ChatMessage } from "@/features/chat/chat/model/types/serverTypes";
import { sendWSRequest } from "@/shared/api/ws/wsClient";
import { WS_ACTIONS } from "@/shared/constants/constants";

export interface DeleteMessagePayload {
  chat_key?: string | null;
  for_all?: boolean;
  uid?: string;
}

export interface DeleteMessageResponse {
  id: number;
  uid: string;
  chat_id: string;
  from_user: ChatMessage["from_user"];
  to_user: ChatMessage["to_user"];
}

export const deleteTextMessage = async (
  params: DeleteMessagePayload & { request_uid: string },
): Promise<DeleteMessageResponse> => {
  const object: DeleteMessagePayload = params;

  try {
    const response = await sendWSRequest<{
      action: "delete_message";
      request_uid: string;
      status: "OK" | "error";
      error?: string;
      object: DeleteMessageResponse;
    }>(WS_ACTIONS.DELETE_MESSAGE, object, params.request_uid);

    if (response.status !== "OK") {
      console.error(`Ошибка сервера:`, response.error);
      throw new Error(response.error || "Ошибка удаления сообщения");
    }

    return response.object;
  } catch (error) {
    console.error(`Ошибка в deleteMessage:`, error);
    throw error;
  }
};
