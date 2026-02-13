import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";

export const getUserByUID = async (chatKey: string) => {
  try {
    const result = await getApiClient.get(`/api/v1/contact/${chatKey}/`);
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
