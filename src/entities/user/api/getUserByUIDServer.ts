import { mapUserPreviewDto } from "@/entities/user/model/mapper";
import { UserPreviewDtoSchema } from "@/entities/user/model/schema";
import { getApiServer } from "@/shared/api/getApiServer";
import { Result } from "@/shared/api/types";

import { User } from "../model/types";

export const getUserByUIDServer = async (chatKey: string): Promise<Result<User>> => {
  try {
    const api = await getApiServer();
    const res = await api.get(`/api/v1/contact/${chatKey}/`);
    console.log("res.data: ", res.data);

    const validated = UserPreviewDtoSchema.safeParse(res.data);

    if (!validated.success) {
      console.error("Zod Validation Error:", validated.error.format());
      return { success: false, error: "Данные чата некорректны" };
    }

    const mapped = mapUserPreviewDto(validated.data);
    console.log("mapped: ", mapped);

    return { success: true, data: mapped };
  } catch {
    return { success: false, error: "Не удалось загрузить данные чата" };
  }
};
