import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

import { mapUserDtoToUser } from "../model/mapper";
import { UpdateProfileData, User, UserDto } from "../model/types";

export const updateProfile = async (data: UpdateProfileData): Promise<Result<User>> => {
  try {
    const { data: response } = await getApiClient.post<UserDto>(
      "/api/v1/auth/messenger/profile/",
      data,
    );
    return { success: true, data: mapUserDtoToUser(response) };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
