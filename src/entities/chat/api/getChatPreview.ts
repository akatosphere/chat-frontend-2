import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";

import { ChatPreview, ChatPreviewDto } from "../model/types";

const mapChatPreview = (dto: ChatPreviewDto): ChatPreview => ({
  name: dto.name,
  description: dto.description,
  participantsCount: dto.participants_count,
  avatarUrl: dto.avatar_webp_url,
});

export const getChatPreview = async (token: string) => {
  try {
    const result = await getApiClient.get<ChatPreviewDto>(
      "/api/v1/chat/list/groups_or_channels/preview",
      { params: { token } },
    );
    return { success: true as const, data: mapChatPreview(result.data) };
  } catch (error) {
    return { success: false as const, error: errorHandler(error) };
  }
};
