import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

import { CheckNicknameResponse } from "../model/types";

export const checkNicknameUnique = async (
  nickname: string,
): Promise<Result<CheckNicknameResponse>> => {
  try {
    const { data } = await getApiClient.get<CheckNicknameResponse>(
      `/api/v1/auth/messenger/profile/unique_nickname_check/${nickname}/`,
    );
    return { success: true, data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
