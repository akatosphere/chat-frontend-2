import { getApiServer } from "@/shared/api/getApiServer";

export const getProfileServer = async () => {
  try {
    const api = await getApiServer();

    const res = await api.post("/api/v1/auth/messenger/profile/");
    return { success: true, data: res.data };
  } catch {
    return { success: false, error: "Ошибка загрузки профиля" };
  }
};
