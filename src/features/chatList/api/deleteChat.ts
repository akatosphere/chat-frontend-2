import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

export interface DeleteChatData {
  index: number;
}

export interface DeleteChatSuccess {
  index: number;
}

export const deleteChat = async (data: DeleteChatData): Promise<Result<DeleteChatSuccess>> => {
  try {
    const { data: response } = await getApiClient.delete<DeleteChatSuccess>(
      `/api/v1/chat/list/${data.index}/`,
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
