import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

import { mapUserDto } from "../model/mapper";
import { User, UserDto } from "../model/types";

export const getProfile = async (): Promise<Result<User>> => {
  try {
    const { data } = await getApiClient.post<UserDto>("/api/v1/auth/messenger/profile/", {});
    return { success: true, data: mapUserDto(data) };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
