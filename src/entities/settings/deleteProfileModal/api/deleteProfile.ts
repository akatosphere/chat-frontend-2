import api from "@/shared/api/apiClient";
import { errorHandler } from "@/shared/api/errorHandler";

export const deleteProfile = async (uid: string) => {
  try {
    const result = await api.delete(`/api/v1/auth/messenger/profile/${uid}/`);
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
