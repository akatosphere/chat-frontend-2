import { getApiServer } from "@/shared/api/getApiServer";
import { Result } from "@/shared/api/types";

import { mapChatDetails, MappedChatDetails } from "../lib/mapChat";
import { ChatDetailsSchema } from "../model/schema";

export const getGroupChannelServer = async (
  chatKey: string,
): Promise<Result<MappedChatDetails>> => {
  try {
    const api = await getApiServer();
    const res = await api.get(`/api/v1/chat/list/groups_or_channels/${chatKey}/`);
    console.log("res: ", res.data);

    const validated = ChatDetailsSchema.safeParse(res.data);
    if (!validated.success) {
      console.error("Zod Validation Error:", validated.error.format());
      return { success: false, error: "Данные чата некорректны" };
    }

    const mappedData = mapChatDetails(validated.data);

    return { success: true, data: mappedData };
  } catch {
    return { success: false, error: "Не удалось загрузить данные чата" };
  }
};
