"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { leaveChat } from "@/entities/chat/api/leaveChat";
import { ChatType } from "@/entities/chat/model/types";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { useToast } from "@/shared/toast/ui/toastProvider";

type UseLeaveChatParams = {
  chatKey: string;
  chatName: string;
  chatType: ChatType;
};

export const useLeaveChat = ({ chatKey, chatName, chatType }: UseLeaveChatParams) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const removeChat = useChatListStore((state) => state.removeChat);
  const { showToast } = useToast();
  const closeModal = useModalStore((s) => s.closeModal);

  const [isLoading, setIsLoading] = useState(false);

  // Определение варианта модалки
  const leaveModalVariant =
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

  const confirmLeave = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await leaveChat(chatKey);

      if (response.status === "OK") {
        // Закрыть модалку
        closeModal();

        // Удалить из store
        removeChat(chatKey);
        queryClient.removeQueries({ queryKey: ["chats"] });

        setTimeout(() => {
          router.push("/chats");
          router.refresh();
        }, 300);
        // Показать Toast
        showToast(toastMessage, {
          mobile: "/icons/toast/checkMobile.svg",
          desktop: "/icons/toast/checkDesktop.svg",
        });
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
    leaveModalVariant,
    chatName,
    confirmLeave,
  };
};
