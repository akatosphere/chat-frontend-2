import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { formSchema } from "../model/schema";
import { useCreateChatStore } from "../model/store";
import { CreateChatFormValues } from "../model/types";

export const useCreateChat = () => {
  const { formData, updateData, setStep, groupOrChannel } = useCreateChatStore();
  const defaultType = groupOrChannel === "group" ? "private-group" : "public-channel";
  // Состояния для аватара
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(formData.avatar || "");

  const form = useForm<CreateChatFormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      avatar: formData.avatar,
      chat_type: formData.chat_type || defaultType,
    },
  });

  const handleAvatarChange = (file: File) => {
    form.setValue("avatar", file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setIsModalOpen(false);
  };

  const handleAvatarDelete = () => {
    form.setValue("avatar", null);
    setPreviewUrl("");
    setIsModalOpen(false);
  };

  const onNextStep = (data: CreateChatFormValues) => {
    // Сохраняем данные первого шага в стор
    updateData({
      title: data.title,
      description: data.description,
      avatar: previewUrl || null,
      chat_type: data.chat_type,
    });
    // Переключаем на второй шаг (выбор участников)
    setStep(2);
  };

  return {
    form,
    isModalOpen,
    setIsModalOpen,
    previewUrl,
    handleAvatarChange,
    handleAvatarDelete,
    onNextStep,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
  };
};
