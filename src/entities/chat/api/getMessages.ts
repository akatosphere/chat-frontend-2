import { ChatMessageList } from "@/features/chat/chat/model/types/serverTypes";
import { errorHandler } from "@/shared/api/errorHandler";
import { getApiServer } from "@/shared/api/getApiServer";
import { Result } from "@/shared/api/types";

export interface GetMessagesParams {
  uid: string;
  from_me?: boolean;
  new?: boolean;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  range_time_start_created?: number;
  range_time_end_created?: number;
  range_time_start_updated?: number;
  range_time_end_updated?: number;
}

export const getMessages = async (params: GetMessagesParams): Promise<Result<ChatMessageList>> => {
  const api = await getApiServer();
  try {
    const { data } = await api.get<ChatMessageList>(`/api/v1/chat/message/text/${params.uid}/`, {
      params,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
