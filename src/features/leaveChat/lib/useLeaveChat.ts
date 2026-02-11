"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { leaveChat } from "@/entities/chat/api/leaveChat";
import { ChatType } from "@/entities/chat/model/types";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { useMainContentStore } from "@/shared/model/mainContent.store";
import { useToast } from "@/shared/toast/ui/toastProvider";

type UseLeaveChatParams = {
  chatKey: string;
  chatName: string;
  chatType: ChatType;
};

export const useLeaveChat = ({ chatKey, chatName, chatType }: UseLeaveChatParams) => {
  const router = useRouter();
  const removeChat = useChatListStore((state) => state.removeChat);
  const setShouldShowDefault = useMainContentStore((state) => state.setShouldShowDefault);
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Определение варианта модалки
  const modalVariant =
    chatType === "public-group"
      ? ("public-group" as const)
      : chatType === "private-group"
        ? ("private-group" as const)
        : ("channel" as const);

  // Определение текста Toast
  const toastMessage =
    chatType === "public-channel" || chatType === "private-channel"
      ? "Вы отписались от канала"
      : "Вы покинули группу";

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const confirmLeave = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await leaveChat(chatKey);

      if (response.status === "OK") {
        // Закрыть модалку
        closeModal();

        // Показать Toast
        showToast(toastMessage, {
          mobile: "/icons/toast/checkMobile.svg",
          desktop: "/icons/toast/checkDesktop.svg",
        });

        // Удалить из store
        removeChat(chatKey);

        // Установить флаг для показа default контента
        setShouldShowDefault(true);

        setTimeout(() => {
          router.push("/chats");
        }, 300);
      } else {
        console.error("Ошибка при выходе из чата:", response.error);
      }
    } catch (error) {
      console.error("Ошибка при выходе из чата:", error);
    } finally {
      setIsLoading(false);
    }
  }, [chatKey, closeModal, removeChat, router, showToast, toastMessage, setShouldShowDefault]);

  return {
    isModalOpen,
    isLoading,
    modalVariant,
    chatName,
    openModal,
    closeModal,
    confirmLeave,
  };
};
