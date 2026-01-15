import api from "@/shared/api/apiClient";

export const uploadAvatar = async (file: File | null) => {
  const formData = new FormData();
  formData.append("file", file || "");

  const { data, status } = await api.post(
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
