import Copy from "@icons/chat/context-menu/copy.svg";
import Delete from "@icons/chat/context-menu/delete.svg";
import Select from "@icons/chat/context-menu/select.svg";
import Forwarded from "@icons/chat/forwardedd.svg";
import { MouseEvent } from "react";

import { useContextMenu } from "../ui/contextMenu";

export const useMessageContextMenu = (messageId: string) => {
  const { openMenu, activeMenuId } = useContextMenu();

  const menuId = `message-${messageId}`;

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          { label: "Ответить", icon: Forwarded, onClick: () => console.log("Ответить", messageId) },
          {
            label: "Переслать",
            icon: Forwarded,
            onClick: () => console.log("Переслать", messageId),
          },
          {
            label: "Скопировать",
            icon: Copy,
            onClick: () => console.log("Скопировать", messageId),
          },
          { label: "Выбрать", icon: Select, onClick: () => console.log("Выбрать", messageId) },
          {
            label: "Удалить",
            icon: Delete,
            destructive: true,
            onClick: () => console.log("Удалить", messageId),
          },
        ],
        e.clientX,
        e.clientY,
      );
    },
    isOpen: activeMenuId === menuId,
  };
};
