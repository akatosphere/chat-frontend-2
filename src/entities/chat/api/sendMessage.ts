import {
  ChatMessage,
  ForwardedMessage,
  MessageFile,
  RepliedMessage,
} from "@/features/chat/chat/model/types/serverTypes";
import { sendWSRequest } from "@/shared/api/wsClient";

export interface SendTextMessagePayload {
  chat_key?: string;
  to_user_uid?: string;
  content: string;
  files?: MessageFile[];
  replied_messages?: RepliedMessage[];
  forwarded_messages?: ForwardedMessage[];
  status?: "publish" | "draft";
}

export const sendTextMessage = async (
  params: SendTextMessagePayload & { request_uid: string },
): Promise<ChatMessage> => {
  const object: {
    content: string;
    files: MessageFile[];
    replied_messages: RepliedMessage[];
    forwarded_messages: ForwardedMessage[];
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
    }>("create_text_message", object, params.request_uid);

    if (response.status !== "OK") {
      console.error(`Ошибка сервера:`, response.error);
      throw new Error(response.error || "Ошибка отправки сообщения");
    }

    console.log(`Сообщение успешно отправлено, ID: ${response.object.id}`);
    return response.object;
  } catch (error) {
    console.error(`Ошибка в sendTextMessage:`, error);
    throw error;
  }
};
