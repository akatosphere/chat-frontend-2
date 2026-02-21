// features/settings/userProfileForm/model/prepareSubmitData.ts
import { z } from "zod";

import { UpdateProfileData, User } from "@/entities/user/model/types";

import { normalizeBirthday } from "../lib/normalizeBirthday";
import { changeProfileSchema } from "./schema";

export const prepareSubmitData = (
  data: z.infer<typeof changeProfileSchema>,
  profile: User,
  originalBirthday: number | null,
): UpdateProfileData => {
  const timestamp = normalizeBirthday(data.birthday) || originalBirthday || 0;

  return {
    nickname: data.nickname.trim(),
    first_name: data.name.trim(),
    last_name: data.lastName.trim(),
    // patronymic: "",
    additional_information: data.description?.trim() || "",
    birthday: timestamp,
    gender: profile.gender,
  };
};
