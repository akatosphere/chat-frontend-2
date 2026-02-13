import erase from "@icons/erase.svg";
import exit from "@icons/menu/exit.svg";
import trashCan from "@icons/trashCan.svg";
import { MouseEvent } from "react";

import { ChatType } from "@/entities/chat/model/types";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useDeleteChatGlobal } from "@/features/deleteChatGlobal/lib/useDeleteChatGlobal";
import { useLeaveChat } from "@/features/leaveChat/lib/useLeaveChat";
import { MenuItem, useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

type UseChatProfileContextMenuParams = {
  isOwner: boolean;
  chatType: "group" | "channel";
  chatKey: string;
  chatName: string;
  fullChatType: ChatType;
};

export const useChatProfileContextMenu = ({
  isOwner,
  chatType,
  chatKey,
  chatName,
  fullChatType,
}: UseChatProfileContextMenuParams) => {
  const { openMenu, activeMenuId } = useContextMenu();
  const openModal = useModalStore((s) => s.openModal);

  const { leaveModalVariant, confirmLeave } = useLeaveChat({
    chatKey,
    chatName,
    chatType: fullChatType,
  });

  const { deleteModalGlobalVariant, confirmDelete } = useDeleteChatGlobal({
    chatKey,
    chatName,
    chatType: fullChatType,
  });

  const clearLabel = chatType === "channel" ? "Очистить канал" : "Очистить чат";
  const leaveLabel = chatType === "channel" ? "Покинуть канал" : "Покинуть группу";
  const deleteLabel = chatType === "channel" ? "Удалить канал" : "Удалить группу";

  const menuItems: MenuItem[] = [
    {
      label: clearLabel,
      icon: erase,
      onClick: () => {
        console.warn("Очистить - заглушка");
      },
    },
    {
      label: leaveLabel,
      icon: exit,
      onClick: () => {
        openModal("leaveChat", {
          chatName,
          modalVariant: leaveModalVariant,
          onConfirm: confirmLeave,
        });
      },
    },
  ];

  if (isOwner) {
    menuItems.push({
      label: deleteLabel,
      icon: trashCan,
      destructive: true,
      onClick: () => {
        openModal("deleteChatGlobal", {
          chatName,
          modalVariant: deleteModalGlobalVariant,
          onConfirm: confirmDelete,
        });
      },
    });
  }

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(menuId, menuItems, e.clientX, e.clientY);
    },
    isOpen: activeMenuId === menuId,
  };
};

const menuId = "chatProfile";
