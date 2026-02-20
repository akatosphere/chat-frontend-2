import { getApiServer } from "@/shared/api/getApiServer";

import { mapChatParticipantListResponse } from "../model/participantMapper";
import { ChatParticipantListResponse, ChatParticipantListResponseDto } from "../model/types";

/** Для серверных компонентов (SSR) */
export const getParticipantsServer = async (
  chatKey: string,
): Promise<ChatParticipantListResponse | null> => {
  try {
    const api = await getApiServer();
    const { data } = await api.get<ChatParticipantListResponseDto>(
      `/api/v1/chat/list/groups_or_channels/${chatKey}/participants/`,
      {
        params: {
          page_size: 30,
        },
      },
    );

    return mapChatParticipantListResponse(data);
  } catch (error) {
    console.error("Failed to fetch contacts on server", error);
    return null;
  }
};
