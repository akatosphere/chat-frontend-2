import api from "@/shared/api/apiClient";
import { errorHandler } from "@/shared/api/errorHandler";
import { Result } from "@/shared/api/types";
import z from "zod";
import { nicknameSchema } from "../model/validation";

export type CheckNicknameData = z.infer<typeof nicknameSchema>;

export interface CheckNicknameResponse {
  message: string;
}

export const checkNickname = async (
  data: CheckNicknameData
): Promise<Result<CheckNicknameResponse>> => {
  try {
    const result = await api.get<CheckNicknameResponse>(
      `/api/v1/auth/messenger/profile/unique_nickname_check/${data}/`,
      {}
    );
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
