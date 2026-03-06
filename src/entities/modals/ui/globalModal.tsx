"use client";

import React from "react";

import { DeleteMessageModal } from "@/features/chat/chat/ui/deleteMessageModal/deleteMessageModal";
import { ForwardModal } from "@/features/chat/chat/ui/forwardModal/forwardModal";
import { SendMediaModal } from "@/features/chat/chat/ui/sendImageModal/sendImageModal";
import { DeleteChatModal } from "@/features/chatList/ui/deleteChatModal/deleteChatModal";
import { ClearChatModal } from "@/features/clearChat/ui/clearChatModal";
import { DeleteChatGlobalModal } from "@/features/deleteChatGlobal/ui/deleteChatGlobalModal";
import { LeaveChatModal } from "@/features/leaveChat/ui/leaveChatModal";

import { SendFileModal } from "../../../features/chat/chat/ui/sendFileModal/sendFileModal";
import { useModalStore } from "../model/useGlobalModalStore";
// eslint-disable-next-line
const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
  deleteChat: DeleteChatModal,
  deleteMessage: DeleteMessageModal,
  leaveChat: LeaveChatModal,
  deleteChatGlobal: DeleteChatGlobalModal,
  clearChat: ClearChatModal,
  sendImage: SendMediaModal,
  sendFile: SendFileModal,
  forward: ForwardModal,
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
