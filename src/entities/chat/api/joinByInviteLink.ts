import { WSBaseResponse } from "@/shared/api/ws/model/types";
import { sendWSRequest } from "@/shared/api/ws/wsClient";
import { WS_ACTIONS } from "@/shared/constants/constants";

type JoinByInviteLinkResponse = WSBaseResponse<{
  chat_key: string;
}>;

export const joinByInviteLink = async (token: string): Promise<JoinByInviteLinkResponse> => {
  const response = await sendWSRequest<JoinByInviteLinkResponse>(WS_ACTIONS.JOIN_BY_INVITE_LINK, {
    token,
  });

  if (response.status !== "OK") {
    throw new Error(response.error || "Ошибка при вступлении в чат");
  }

  return response;
};
