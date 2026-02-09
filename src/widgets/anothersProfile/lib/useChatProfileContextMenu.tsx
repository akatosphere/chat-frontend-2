import erase from "@icons/erase.svg";
import exit from "@icons/menu/exit.svg";
import trashCan from "@icons/trashCan.svg";
import { MouseEvent } from "react";

import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

export const useChatProfileContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const menuId = "chatProfile";

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          {
            label: "Очистить чат",
            icon: erase,
            onClick: () => {
              console.warn("Пожаловаться - заглушка");
            },
          },
          {
            label: "Покинуть группу",
            icon: exit,
            onClick: () => {
              console.warn("Заблокировать пользователя - заглушка");
            },
          },
          {
            label: "Удалить группу",
            icon: trashCan,
            destructive: true,
            onClick: () => {
              console.warn("Заблокировать пользователя - заглушка");
            },
          },
        ],
        e.clientX,
        e.clientY,
      );
    },
    isOpen: activeMenuId === menuId,
  };
};
