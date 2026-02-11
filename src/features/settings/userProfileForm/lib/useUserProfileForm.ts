"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { uploadAvatar } from "@/entities/user/api/uploadAvatar"; // Наше новое API
import { User } from "@/entities/user/model/types"; // Наша новая типизация
import { checkAvatarParams } from "@/shared/avatar/lib/checkAvatarParams";

import { getDefaultBirthday } from "./getDefaultBirthday";

export type UseUserProfileFormProps = {
  profile: User;
  avatarUrl: string;
  name: string;
  lastName: string;
  nickname: string;
  description: string;
  birthday: number | null;
};

export const useUserProfileForm = ({ avatarUrl, birthday }: UseUserProfileFormProps) => {
  const queryClient = useQueryClient();

  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(avatarUrl);
  const [avatarError, setAvatarError] = useState<string | undefined>();
  const [isAvatarChangeModalOpen, setIsAvatarChangeModalOpen] = useState(false);

  const onAvatarChangeModalOpen = () => {
    setAvatarError("");
    setIsAvatarChangeModalOpen(true);
  };
  const onAvatarChangeModalClose = () => {
    setIsAvatarChangeModalOpen(false);
  };
  /**
   * Возвращает дефолтные значения для UI-формы (birthday как объект)
   */
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
    birthday: getDefaultBirthday(birthday),
  });

  /**
   * Мутация загрузки аватара (использует наш новый Result тип)
   */
  const avatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const res = await uploadAvatar(file);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data?.file_url) {
        setCurrentAvatarUrl(data.file_url);
      }
      setIsAvatarChangeModalOpen(false);
      setAvatarError(undefined);
      queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
    },
    onError: (error: Error) => {
      setAvatarError(error.message || "Ошибка загрузки аватара");
    },
  });

  /**
   * Мутация удаления аватара
   * Если API поддерживает отправку null для удаления, используем ту же функцию
   */
  const deleteAvatarMutation = useMutation({
    mutationFn: async () => {
      // Здесь предполагается, что API умеет обрабатывать удаление.
      // Если нужен другой эндпоинт, замените вызов.
      const res = await uploadAvatar(null);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      setCurrentAvatarUrl("");
      setIsAvatarChangeModalOpen(false);
      setAvatarError(undefined);
      queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
    },
  });

  const onAvatarDelete = () => {
    deleteAvatarMutation.mutate();
  };

  const onAvatarChangeHandler = async (file: File) => {
    const { isValid, error } = await checkAvatarParams(file);
    if (!isValid) {
      setAvatarError(error);
      return;
    }
    avatarMutation.mutate(file);
  };

  return {
    currentAvatarUrl,
    avatarError,
    isAvatarChangeModalOpen,
    getDefaultValues,
    onAvatarDelete,
    onAvatarChangeModalOpen,
    onAvatarChangeModalClose,
    onAvatarChangeHandler,
  };
};
