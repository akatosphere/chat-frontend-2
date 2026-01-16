import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
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
    const { data: response } = await getApiClient.post<SendCodeSuccess>(
      "/api/v1/auth/messenger/login/get/code/",
      data,
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
