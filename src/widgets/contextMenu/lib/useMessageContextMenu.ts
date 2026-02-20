import Copy from "@icons/chat/context-menu/copy.svg";
import Delete from "@icons/chat/context-menu/delete.svg";
import Select from "@icons/chat/context-menu/select.svg";
import Forwarded from "@icons/chat/forwardedd.svg";
import { MouseEvent } from "react";

import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useDeleteMessage } from "@/features/chat/chat/hooks";
import { useChatStore } from "@/features/chat/chat/model/store/useChatStore";
import { MappedChatMessage } from "@/features/chat/chat/model/types/mappedTypes";

import { useContextMenu } from "../ui/contextMenuProvider";

export const useMessageContextMenu = (message: MappedChatMessage) => {
  const { openMenu, activeMenuId } = useContextMenu();
  const { openModal } = useModalStore();
  const { setReplyTarget, chatType, setForwardTarget, enterSelectionMode } = useChatStore();
  const isOwner = useChatStore((s) => s.createdBy === s.currentUserId);
  const isAviableToDelete =
    chatType === "chat" || chatType === "public-group" || chatType === "private-group"
      ? true
      : (chatType === "public-channel" || chatType === "private-channel") && isOwner
        ? true
        : false;
  const deleteMessage = useDeleteMessage();

  const menuId = `message-${message.id}`;
  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          { label: "Ответить", icon: Forwarded, onClick: () => setReplyTarget(message) },
          {
            label: "Переслать",
            icon: Forwarded,
            onClick: () => {
              setForwardTarget(message);
              openModal("forward", { chatKey: message.chatKey, messageId: message.id });
            },
          },
          {
            label: "Скопировать",
            icon: Copy,
            onClick: () => console.log("Скопировать", message.id),
          },
          { label: "Выбрать", icon: Select, onClick: () => enterSelectionMode(message.uid) },
          ...(isAviableToDelete
            ? [
                {
                  label: "Удалить",
                  icon: Delete,
                  destructive: true,
                  onClick: () => {
                    deleteMessage(message.uid);
                  },
                },
              ]
            : []),
        ],
        e.clientX,
        e.clientY,
      );
    },
    isOpen: activeMenuId === menuId,
  };
};
