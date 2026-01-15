import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

import { MessengerProfileResponse } from "@/features/auth/userForm/api/updateUserProfile";
import { uploadAvatar } from "@/features/auth/userForm/api/uploadAvatar";
import { checkAvatarParams } from "@/widgets/imageCropper/lib/checkAvatarParams";

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
    mutationFn: (file: File | null) => uploadAvatar(file),
    onSuccess: (res) => {
      if (res.data.file_url) {
        setCurrentAvatarUrl(res.data.file_url);
        setIsAvatarChangeModalOpen(false);
        setAvatarError("");
        queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
      }
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ file: string[] }>;
      setAvatarError(axiosError.response?.data?.file?.[0] || "Ошибка загрузки аватара");
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: () => uploadAvatar(null),
    onSuccess: () => {
      setCurrentAvatarUrl("");
      setIsAvatarChangeModalOpen(false);
      setAvatarError("");
      queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
    },
  });

  const onAvatarDelete = () => {
    deleteAvatarMutation.mutate();
  };

  const onAvatarChangeHandler = async (file: File) => {
    const { isValid, error } = await checkAvatarParams(file);
    if (!isValid) {
      setAvatarError(error || "");
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
    onAvatarDelete,
    setAvatarError,
    setIsAvatarChangeModalOpen,
    onAvatarChangeHandler,
  };
};
