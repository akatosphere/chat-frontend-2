import Delete from "@icons/chat/context-menu/delete.svg";
import PersonAdd from "@icons/chat/context-menu/personAdd.svg";
import SetRead from "@icons/chat/context-menu/setRead.svg";
import Mute from "@icons/chat/mute.svg";
import Favorite from "@icons/chat/pin.svg";
import { MouseEvent } from "react";

import { ChatItemData } from "@/entities/chat/model/types";
import { ChatActions } from "@/features/chatList/model/types";

import { useContextMenu } from "../ui/contextMenu";

export const useChatListItemContextMenu = (chat: ChatItemData, actions: ChatActions) => {
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
            onClick: () => console.log("Добавить в контакты", chat.id),
          },
          {
            label: "Выключить уведомления",
            icon: Mute,
            onClick: () => actions.toggleMuteStatus(chat.id, chat.notifications),
          },
          {
            label: chat.is_favorite ? "Снять закрепление" : "Закрепить",
            icon: Favorite,
            onClick: () => actions.toggleFavorite(chat.id, chat.is_favorite),
          },
          {
            label: "Пометить прочитанным",
            icon: SetRead,
            onClick: () => actions.toggleReadStatus(chat.id),
          },
          {
            label: "Удалить",
            icon: Delete,
            destructive: true,
            onClick: () => actions.deleteChat(chat.id),
          },
        ],
        e.clientX,
        e.clientY,
      );
    },
    isOpen: activeMenuId === menuId,
  };
};
