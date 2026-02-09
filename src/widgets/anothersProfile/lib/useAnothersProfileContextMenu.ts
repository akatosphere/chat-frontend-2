import { MouseEvent } from "react";

import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";
import createChannel from "@/shared/ui/icons/createChat/createChannel.svg";
import createGroup from "@/shared/ui/icons/createChat/createGroup.svg";

export const useAnothersProfileContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const menuId = "anothersProfile";

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          {
            label: "Поделиться профилем",
            icon: createGroup,
            onClick: () => {
              console.warn("Заблокировать пользователя - заглушка");
            },
          },
          {
            label: "Очистить чат",
            icon: createChannel,
            onClick: () => {
              console.warn("Пожаловаться - заглушка");
            },
          },
          {
            label: "Заблокировать",
            icon: createChannel,
            onClick: () => {
              console.warn("Пожаловаться - заглушка");
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
