"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { deleteChatGlobal } from "@/entities/chat/api/deleteChatGlobal";
import { ChatType } from "@/entities/chat/model/types";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { useToast } from "@/shared/toast/ui/toastProvider";

type UseDeleteChatGlobalParams = {
  chatKey: string;
  chatName: string;
  chatType: ChatType;
};

export const useDeleteChatGlobal = ({ chatKey, chatName, chatType }: UseDeleteChatGlobalParams) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const removeChat = useChatListStore((state) => state.removeChat);
  const { showToast } = useToast();
  const closeModal = useModalStore((s) => s.closeModal);

  const [isLoading, setIsLoading] = useState(false);

  // Определение варианта модалки
  const deleteModalGlobalVariant =
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
      const response = await deleteChatGlobal(chatKey);

      if (response.status === "OK") {
        // Закрыть модалку
        closeModal();

        // Показать Toast
        showToast(toastMessage, {
          mobile: "/icons/toast/checkMobile.svg",
          desktop: "/icons/toast/checkDesktop.svg",
        });

        // Удалить из store и очистить кэш React Query
        removeChat(chatKey);
        queryClient.removeQueries({ queryKey: ["chats"] });

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
  }, [chatKey, closeModal, queryClient, removeChat, router, showToast, toastMessage]);

  return {
    isLoading,
    deleteModalGlobalVariant,
    chatName,
    confirmDelete,
  };
};
