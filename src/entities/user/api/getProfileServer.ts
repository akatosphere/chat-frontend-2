import { getApiServer } from "@/shared/api/getApiServer";
import { Result } from "@/shared/api/types";

import { mapUserDto } from "../model/mapper";
import { User, UserDto } from "../model/types";

export const getProfileServer = async (): Promise<Result<User>> => {
  try {
    const api = await getApiServer();
    const { data } = await api.post<UserDto>("/api/v1/auth/messenger/profile/");
    return { success: true, data: mapUserDto(data) };
  } catch {
    return { success: false, error: "Ошибка загрузки профиля на сервере" };
  }
};
