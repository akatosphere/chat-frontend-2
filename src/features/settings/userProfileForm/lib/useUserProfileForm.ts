import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import { MessengerProfileResponse } from "@/entities/user/api/updateProfile";
import { uploadAvatar } from "@/entities/user/api/uploadAvatar";

import { getDefaultBirthday } from "./getDefaultBirthday";

export type UseUserProfileFormProps = {
  profile: MessengerProfileResponse;
  avatarUrl: string;
  name: string;
  lastName: string;
  nickname: string;
  description: string;
  birthday: number;
};

export const useUserProfileForm = ({ avatarUrl, birthday }: UseUserProfileFormProps) => {
  const queryClient = useQueryClient();
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(avatarUrl);
  const [avatarError, setAvatarError] = useState("");
  const [isAvatarChangeModalOpen, setIsAvatarChangeModalOpen] = useState(false);

  const getDefaultValues = (
    name: string,
    lastName: string,
    nickname: string,
    description: string,
  ) => ({
    name,
    lastName,
    description,
    nickname,
    birthday: getDefaultBirthday(birthday),
  });

  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (res) => {
      if (res.data.file_url) {
        setCurrentAvatarUrl(res.data.file_url);
        setIsAvatarChangeModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
      }
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ file: string[] }>;
      setAvatarError(axiosError.response?.data?.file?.[0] || "Ошибка загрузки аватара");
    },
  });

  const onAvatarChangeHandler = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/x-ms-bmp"];

    if (file.size === 0) {
      setAvatarError("Файл не выбран.");
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      setAvatarError("Недопустимый формат файла. Допустимые форматы: PNG, JPG, JPEG, BMP.");
      return;
    }

    avatarMutation.mutate(file);
  };

  return {
    currentAvatarUrl,
    avatarError,
    isAvatarChangeModalOpen,
    defaultBirthday: getDefaultBirthday(birthday),
    defaultValues: getDefaultValues,
    setCurrentAvatarUrl,
    setAvatarError,
    setIsAvatarChangeModalOpen,
    onAvatarChangeHandler,
  };
};
