import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";

export const getGroupChannel = async (chatKey: string) => {
  try {
    const result = await getApiClient.get(`/api/v1/chat/list/groups_or_channels/${chatKey}/`);
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
