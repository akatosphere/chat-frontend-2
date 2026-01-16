import z from "zod";

import { MessengerProfileResponse } from "@/entities/user/api/updateUserProfile";

import { normalizeBirthday } from "../lib/normalizeBirthday";
import { changeProfileSchema } from "./schema";

export const prepareSubmitData = (
  data: z.infer<typeof changeProfileSchema>,
  profile: MessengerProfileResponse,
  originalBirthday: number,
) => {
  const timestamp = normalizeBirthday(data.birthday) || originalBirthday;

  return {
    nickname: data.nickname.trim(),
    first_name: data.name.trim(),
    last_name: data.lastName.trim(),
    patronymic: "",
    additional_information: data.description?.trim() || "",
    birthday: timestamp,
    gender: profile.gender,
    country: profile.country,
  };
};
