"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { deleteChat } from "@/entities/chat/api/deleteChat";
import { ChatType } from "@/entities/chat/model/types";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { useToast } from "@/shared/toast/ui/toastProvider";

type UseDeleteChatParams = {
  chatKey: string;
  chatName: string;
  chatType: ChatType;
};

export const useDeleteChat = ({ chatKey, chatName, chatType }: UseDeleteChatParams) => {
  const router = useRouter();
  const removeChat = useChatListStore((state) => state.removeChat);
  const { showToast } = useToast();
  const closeModal = useModalStore((s) => s.closeModal);

  const [isLoading, setIsLoading] = useState(false);

  // Определение варианта модалки
  const deleteModalVariant =
    chatType === "public-channel" || chatType === "private-channel"
      ? ("channel" as const)
      : ("group" as const);

  // Определение текста Toast
  const toastMessage =
    chatType === "public-channel" || chatType === "private-channel"
      ? "Канал удалён"
      : "Группа удалена";

  const confirmDelete = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await deleteChat(chatKey);

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

        setTimeout(() => {
          router.push("/chats");
          router.refresh();
        }, 300);
      } else {
        console.error("Ошибка при выходе из чата:", response.error);
      }
    } catch (error) {
      console.error("Ошибка при выходе из чата:", error);
    } finally {
      setIsLoading(false);
    }
  }, [chatKey, closeModal, removeChat, router, showToast, toastMessage]);

  return {
    isLoading,
    deleteModalVariant,
    chatName,
    confirmDelete,
  };
};
