import erase from "@icons/erase.svg";
import exit from "@icons/menu/exit.svg";
import trashCan from "@icons/trashCan.svg";
import { MouseEvent } from "react";

import { MenuItem, useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

type UseChatProfileContextMenuParams = {
  isOwner: boolean;
  chatType: "group" | "channel";
};

export const useChatProfileContextMenu = ({
  isOwner,
  chatType,
}: UseChatProfileContextMenuParams) => {
  const { openMenu, activeMenuId } = useContextMenu();
  const menuId = "chatProfile";

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
        console.warn("Покинуть - заглушка");
      },
    },
  ];

  if (isOwner) {
    menuItems.push({
      label: deleteLabel,
      icon: trashCan,
      destructive: true,
      onClick: () => {
        console.warn("Удалить - заглушка");
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
