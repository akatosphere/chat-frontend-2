import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

export const uploadAvatar = async (file: File | null): Promise<Result<{ avatar_url: string }>> => {
  try {
    const formData = new FormData();
    formData.append("file", file || "");

    const { data } = await getApiClient.post<{ avatar_url: string }>(
      "/api/v1/auth/messenger/profile/avatar/download/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return { success: true, data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
