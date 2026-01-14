import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";

export const deleteProfile = async (uid: string) => {
  try {
    const result = await getApiClient.delete(`/api/v1/auth/messenger/profile/${uid}/`);
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
