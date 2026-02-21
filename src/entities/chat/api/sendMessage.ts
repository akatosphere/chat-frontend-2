import { ChatMessage } from "@/features/chat/chat/model/types/serverTypes";
import { sendWSRequest } from "@/shared/api/ws/wsClient";
import { WS_ACTIONS } from "@/shared/constants/constants";

export interface SendTextMessagePayload {
  chat_key?: string | null;
  to_user_uid?: string | null;
  content: string;
  files?: { data: string; filename: string }[];
  replied_messages?: string[] | null;
  forwarded_messages?: string[] | null;
  status?: "publish" | "draft";
}

export const sendTextMessage = async (
  params: SendTextMessagePayload & { request_uid: string },
): Promise<ChatMessage> => {
  const object: {
    content: string;
    files: { data: string; filename: string }[];
    replied_messages: string[] | null;
    forwarded_messages: string[] | null;
    chat_key?: string;
    to_user_uid?: string;
  } = {
    content: params.content,
    files: params.files ?? [],
    replied_messages: params.replied_messages ?? [],
    forwarded_messages: params.forwarded_messages ?? [],
  };

  if (params.chat_key) {
    object.chat_key = params.chat_key;
  } else if (params.to_user_uid) {
    object.to_user_uid = params.to_user_uid;
  } else {
    throw new Error("Нужно указать chat_key или to_user_uid");
  }

  try {
    const response = await sendWSRequest<{
      action: "create_text_message";
      request_uid: string;
      status: "OK" | "error";
      error?: string;
      object: ChatMessage;
    }>(WS_ACTIONS.CREATE_TEXT_MESSAGE, object, params.request_uid);

    if (response.status !== "OK") {
      console.error(`Ошибка сервера:`, response.error);
      throw new Error(response.error || "Ошибка отправки сообщения");
    }

    return response.object;
  } catch (error) {
    console.error(`Ошибка в sendTextMessage:`, error);
    throw error;
  }
};
