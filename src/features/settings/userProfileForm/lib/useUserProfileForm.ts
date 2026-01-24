"use client";

import { useState } from "react";

import { uploadAvatar } from "@/entities/user/api/uploadAvatar";
import { User } from "@/entities/user/model/types";

import { getDefaultBirthday } from "./getDefaultBirthday"; // импортируем вашу функцию

type UseUserProfileFormProps = {
  profile: User;
  avatarUrl: string;
  name: string;
  lastName: string;
  nickname: string;
  description: string;
  birthday: number;
};

export const useUserProfileForm = ({
  avatarUrl,
  birthday: initialBirthday,
}: UseUserProfileFormProps) => {
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(avatarUrl);
  const [avatarError, setAvatarError] = useState<string | undefined>();
  const [isAvatarChangeModalOpen, setIsAvatarChangeModalOpen] = useState(false);

  // Формируем объект значений по умолчанию строго по схеме changeProfileSchema
  const getDefaultValues = (
    name: string,
    lastName: string,
    nickname: string,
    description: string,
  ) => ({
    name: name || "",
    lastName: lastName || "",
    nickname: nickname || "",
    description: description || "",
    birthday: getDefaultBirthday(initialBirthday), // Используем вашу функцию
  });

  const onAvatarChangeHandler = async (file: File) => {
    const res = await uploadAvatar(file);
    if (res.success) {
      setCurrentAvatarUrl(res.data.avatar_url);
      setAvatarError(undefined);
    } else {
      setAvatarError("Ошибка загрузки");
    }
    setIsAvatarChangeModalOpen(false);
  };

  return {
    currentAvatarUrl,
    avatarError,
    isAvatarChangeModalOpen,
    setIsAvatarChangeModalOpen,
    onAvatarChangeHandler,
    getDefaultValues,
  };
};
