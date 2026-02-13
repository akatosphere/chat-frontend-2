import { ChatMemberDto } from "@/entities/user/model/types";
import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";
export interface GetContactsData {
  0: { phone_or_nickname: string };
  1: { phone_or_nickname: string };
}

export const getUsers = async (data: GetContactsData): Promise<Result<ChatMemberDto[]>> => {
  try {
    const { data: response } = await getApiClient.post<ChatMemberDto[]>(
      "/api/v1/contact/check/list/",
      data,
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
