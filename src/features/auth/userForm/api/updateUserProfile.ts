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

export const MessengerProfileSchema = z.object({
  nickname: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  patronymic: z.string().optional(),
  additional_information: z.string().optional(),
  birthday: z.number().int().optional(),
  gender: z.enum(["male", "female"]).optional(),
  email: z.string().email().or(z.literal("")).optional(),
  country: z.string().optional(),
  city_id: z.number().int().optional(),
  phone: z
    .string()
    .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, "Неверный формат телефона")
    .optional(),
});

export const getMessengerProfile = async (): Promise<Result<MessengerProfileResponse>> => {
  try {
    const result = await api.post<MessengerProfileResponse>("/api/v1/auth/messenger/profile/", {});
    console.log(result);
    return { success: true, data: result.data };
  } catch (error) {
    console.log(error);
    return { success: false, error: "error" };
  }
};

export const updateMessengerProfile = async (
  data: z.infer<typeof MessengerProfileSchema>,
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
