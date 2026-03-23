"use client";

import { useEffect } from "react";

import { getChatPreview } from "@/entities/chat/api/getChatPreview";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useToast } from "@/shared/toast/ui/toastProvider";

type Props = { chatKey: string; token: string };

export const ChatInviteJoinView = ({ chatKey, token }: Props) => {
  const openModal = useModalStore((s) => s.openModal);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPreview = async () => {
      const previewResult = await getChatPreview(token);
      if (!previewResult.success) {
        showToast("Срок действия ссылки истек", {
          mobile: "/icons/toast/block.svg",
          desktop: "/icons/toast/block.svg",
        });
      } else {
        openModal("chatPreview", { chatKey, token, previewData: previewResult.data });
      }
    };

    fetchPreview();
  }, [token, chatKey, openModal, showToast]);

  return (
    <div className="desktop:flex text-gray h-full w-full items-center justify-center">
      Выберите контакт для общения
    </div>
  );
};
