"use client";

import React from "react";

import { ClearChatModal } from "@/entities/modals/ui/clearChatModal/clearChatModal";
import { DeleteMessageModal } from "@/entities/modals/ui/deleteMessageModal/deleteMessageModal";
import { DeleteChatGlobalModal } from "@/features/deleteChatGlobal/ui/deleteChatGlobalModal";
import { LeaveChatModal } from "@/features/leaveChat/ui/leaveChatModal";

import { useModalStore } from "../model/useGlobalModalStore";
// eslint-disable-next-line
const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
  clearChat: ClearChatModal,
  deleteMessage: DeleteMessageModal,
  leaveChat: LeaveChatModal,
  deleteChatGlobal: DeleteChatGlobalModal,
  // новые модалки сюда
};

export const GlobalModal: React.FC = () => {
  const { type, payload, open, closeModal } = useModalStore();

  if (!open || !type) return null;
  // eslint-disable-next-line
  const ModalComponent = MODAL_COMPONENTS[type];
  if (!ModalComponent) {
    console.error(`Модалка ${type} не найдена в globalModal.tsx`);
    return null;
  }

  return <ModalComponent isOpen={open} onClose={closeModal} {...payload} />;
};
