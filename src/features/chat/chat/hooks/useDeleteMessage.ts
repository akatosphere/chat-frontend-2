import { useCallback } from "react";

import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";

export const useDeleteMessage = () => {
  const { chatKey, chatType, chatKeyUser } = useChatStore();
  const openModal = useModalStore((s) => s.openModal);
  return useCallback(
    async (uid: string) => {
      if (!chatKey) return;
      openModal("deleteMessage", {
        messageId: uid,
        chatKey,
      });
    },
    [chatKey, openModal, chatType, chatKeyUser],
  );
};
