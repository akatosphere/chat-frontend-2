import { getApiClient } from "@/shared/api/getApiClient";

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data, status } = await getApiClient.post(
    "/api/v1/auth/messenger/profile/avatar/download/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return { data, status };
};
