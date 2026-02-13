"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { clearChat } from "@/entities/chat/api/clearChat";
import { ChatType } from "@/entities/chat/model/types";
import { useChatStore } from "@/entities/chat/model/useChatStore";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useToast } from "@/shared/toast/ui/toastProvider";

type UseClearChatParams = {
  chatId: number | undefined;
  chatName: string;
  chatType: ChatType;
};

export const useClearChat = ({ chatId, chatName, chatType }: UseClearChatParams) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const closeModal = useModalStore((s) => s.closeModal);
  const clearMessages = useChatStore((s) => s.clearMessages);

  const [isLoading, setIsLoading] = useState(false);

  // Определение варианта модалки
  const clearChatModalVariant =
    chatType === "public-channel" || chatType === "private-channel"
      ? ("channel" as const)
      : chatType === "public-group" || chatType === "private-group"
        ? ("group" as const)
        : ("chat" as const);

  // Определение текста Toast
  const toastMessage =
    chatType === "public-channel" || chatType === "private-channel"
      ? "История канала удалена"
      : "История чата удалена";

  const confirmClear = useCallback(async () => {
    setIsLoading(true);
    try {
      await clearChat({ index: chatId });
      // Закрыть модалку
      closeModal();
      queryClient.removeQueries({ queryKey: ["chats"] });
      // Показать Toast
      clearMessages();
      showToast(toastMessage, {
        mobile: "/icons/toast/checkMobile.svg",
        desktop: "/icons/toast/checkDesktop.svg",
      });
    } catch (error) {
      console.error("Ошибка при выходе из чата:", error);
    } finally {
      setIsLoading(false);
    }
  }, [closeModal, showToast, toastMessage, clearMessages, chatId, queryClient]);

  return {
    isLoading,
    clearChatModalVariant,
    chatName,
    confirmClear,
  };
};
