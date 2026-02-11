import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

export interface ClearChatData {
  index: number;
}

export interface ClearChatSuccess {
  index: number;
}

export const clearChat = async (data: ClearChatData): Promise<Result<ClearChatSuccess>> => {
  try {
    const { data: response } = await getApiClient.delete<ClearChatSuccess>(
      `/api/v1/chat/list/${data.index}/`,
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
