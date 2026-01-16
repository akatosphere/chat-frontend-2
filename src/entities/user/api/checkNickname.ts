import z from "zod";

import { nicknameSchema } from "@/features/auth/userForm/model/validation";
import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

export type CheckNicknameData = z.infer<typeof nicknameSchema>;

export interface CheckNicknameResponse {
  message: string;
}

export const checkNickname = async (
  data: CheckNicknameData,
): Promise<Result<CheckNicknameResponse>> => {
  try {
    const result = await getApiClient.get<CheckNicknameResponse>(
      `/api/v1/auth/messenger/profile/unique_nickname_check/${data}/`,
      {},
    );
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
