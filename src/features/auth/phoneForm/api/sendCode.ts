import { apiClient } from "@/shared/api/apiClient";
import { errorHandler } from "@/shared/api/errorHandler";
import { Result } from "@/shared/api/types";

export interface SendCodeData {
  phone_number: string;
  code_length: number;
}

export interface SendCodeSuccess {
  phone_number: string;
  code_length: number;
}

export const sendCode = async (data: SendCodeData): Promise<Result<SendCodeSuccess>> => {
  try {
    const { data: response } = await apiClient.post<SendCodeSuccess>(
      "/api/v1/auth/messenger/login/get/code/",
      data,
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
