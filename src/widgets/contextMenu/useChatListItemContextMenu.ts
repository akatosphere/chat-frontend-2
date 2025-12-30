import Delete from "@icons/chat/context-menu/delete.svg";
import PersonAdd from "@icons/chat/context-menu/personAdd.svg";
import SetRead from "@icons/chat/context-menu/setRead.svg";
import Mute from "@icons/chat/mute.svg";
import Favorite from "@icons/chat/pin.svg";
import { MouseEvent } from "react";

import { ChatItemData } from "@/entities/chat/model/types";

import { useContextMenu } from "./contextMenu";

export const useChatListItemContextMenu = (chat: ChatItemData) => {
  const { openMenu, activeMenuId } = useContextMenu();

  const menuId = `chat-${chat.id}`;

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          {
            label: "Добавить в контакты",
            icon: PersonAdd,
            onClick: () => console.log("Добавить", chat.id),
          },
          {
            label: "Выключить уведомления",
            icon: Mute,
            onClick: () => console.log("Мут", chat.id),
          },
          {
            label: chat.is_favorite ? "Снять закрепление" : "Закрепить",
            icon: Favorite,
            onClick: () => console.log("Закрепить", chat.id),
          },
          {
            label: "Пометить прочитанным",
            icon: SetRead,
            onClick: () => console.log("Прочитано", chat.id),
          },
          {
            label: "Удалить",
            icon: Delete,
            destructive: true,
            onClick: () => console.log("Удалить", chat.id),
          },
        ],
        e.clientX,
        e.clientY,
      );
    },
    isOpen: activeMenuId === menuId,
  };
};
