import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";

export const getInviteLink = async (chatKey: string) => {
  try {
    const result = await getApiClient.post(`/api/v1/chat/list/generate-invite/${chatKey}/`);
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
