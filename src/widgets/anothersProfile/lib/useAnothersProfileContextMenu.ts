import block from "@icons/block.svg";
import forwardedd from "@icons/chat/forwardedd.svg";
import erase from "@icons/erase.svg";
import { MouseEvent, useMemo } from "react";

import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

export const useAnothersProfileContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const menuId = "anothersProfile";

  return useMemo(
    () => ({
      onContextMenu: (e: MouseEvent) => {
        e.preventDefault();
        openMenu(
          menuId,
          [
            {
              label: "Поделиться профилем",
              icon: forwardedd,
              onClick: () => {
                console.warn("Заблокировать пользователя - заглушка");
              },
            },
            {
              label: "Очистить чат",
              icon: erase,
              onClick: () => {
                console.warn("Пожаловаться - заглушка");
              },
            },
            {
              label: "Заблокировать",
              icon: block,
              destructive: true,
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
    }),
    [openMenu, activeMenuId],
  );
};
