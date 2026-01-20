import { ChatUser } from "@/entities/chat/model/types";
import api from "@/shared/api/apiClient";
import { errorHandler } from "@/shared/api/errorHandler";
import { Result } from "@/shared/api/types";
export interface GetContactsData {
  0: { phone_or_nickname: string };
  1: { phone_or_nickname: string };
}

export const getContacts = async (data: GetContactsData): Promise<Result<ChatUser[]>> => {
  try {
    const { data: response } = await api.post<ChatUser[]>("/api/v1/contact/check/list/", data);

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
