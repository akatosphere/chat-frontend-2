import { errorHandler } from "@/shared/api/errorHandler";
import getApiClient from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

export interface SearchMessageResponse {
  id: number;
  uid: string;
  page: number;
  position: number;
}

export const searchMessagePosition = async ({
  userUid,
  query,
  pageSize = 5,
}: {
  userUid: string;
  query: string;
  pageSize?: number;
}): Promise<Result<SearchMessageResponse[]>> => {
  try {
    const { data } = await getApiClient.post(`/api/v1/chat/message/text/${userUid}/search`, {
      field: "id_or_uid",
      query,
      chat_page_size: pageSize,
      params: {
        ordering: "-created_at",
        user_uid: userUid,
      },
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
