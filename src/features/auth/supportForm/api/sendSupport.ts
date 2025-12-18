import api from "@/shared/api/apiClient";
import { errorHandler } from "@/shared/api/errorHandler";
import { Result } from "@/shared/api/types";
import { supportSchema } from "../model/schema";
import z from "zod";

export interface SendCodeSuccess {
  email: string;
  text: number;
}

export const sendSupport = async (
  data: z.infer<typeof supportSchema>
): Promise<Result<SendCodeSuccess>> => {
  try {
    const { data: response } = await api.post<SendCodeSuccess>(
      "/api/v1/service/message/",
      data
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
