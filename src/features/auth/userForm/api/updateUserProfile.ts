import z from "zod";

import api from "@/shared/api/apiClient";
import { errorHandler } from "@/shared/api/errorHandler";
import { Result } from "@/shared/api/types";

export const messengerProfileSchema = z.object({
  nickname: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  patronymic: z.string().optional(),
  additional_information: z.string().optional(),
  birthday: z.number().int().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  gender: z.enum(["male", "female"]).optional(),
  country: z.string().optional(),
  city_id: z.number().int().optional(),
  phone: z.string().optional(),
});

export type MessengerProfileData = z.infer<typeof messengerProfileSchema>;

export interface MessengerProfileResponse {
  uid: string;
  username: string;
  nickname: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  additional_information: string;
  birthday: number;
  email: string;
  gender: "male" | "female";
  gender_label: string;
  country: string;
  country_label: string;
  city_id: number;
  city: string;
  phone: string;
  avatar: string;
  avatar_url: string;
  avatar_webp: string;
  avatar_webp_url: string;
  is_doctor: boolean;
  is_confirmed_doctor: boolean;
  is_filled: boolean;
  is_staff: boolean;
}

export const getMessengerProfile = async (): Promise<Result<MessengerProfileResponse>> => {
  try {
    const result = await api.post<MessengerProfileResponse>("/api/v1/auth/messenger/profile/", {});
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};

export const updateMessengerProfile = async (
  data: MessengerProfileData,
): Promise<Result<MessengerProfileResponse>> => {
  try {
    const { data: response } = await api.post<MessengerProfileResponse>(
      "/api/v1/auth/messenger/profile/",
      data,
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: errorHandler(error) };
  }
};
