import Delete from "@icons/chat/context-menu/delete.svg";
import PersonAdd from "@icons/chat/context-menu/personAdd.svg";
import SetRead from "@icons/chat/context-menu/setRead.svg";
import MarkAsUnread from "@icons/chat/markAsUnread.svg";
import Mute from "@icons/chat/mute.svg";
import Favorite from "@icons/chat/pin.svg";
import Unmute from "@icons/chat/unMute.svg";
import { MouseEvent } from "react";

import { ChatListItem } from "@/entities/chat/model/types";
import { ChatActions } from "@/features/chatList/model/types";
import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

export const useChatListItemContextMenu = (chat: ChatListItem, actions: ChatActions) => {
  const { openMenu, activeMenuId } = useContextMenu();

  const menuId = `chat-${chat.id}`;

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          ...(chat.type === "chat"
            ? [
                {
                  label: "Добавить в контакты",
                  icon: PersonAdd,
                  onClick: () => console.log("Добавить в контакты", chat.id),
                },
              ]
            : []),
          {
            label: !chat.notificationsEnabled ? "Включить уведомления" : "Выключить уведомления",
            icon: !chat.notificationsEnabled ? Unmute : Mute,
            onClick: () => actions.toggleMuteStatus(chat.id),
          },
          {
            label: chat.isFavorite ? "Снять закрепление" : "Закрепить",
            icon: Favorite,
            onClick: () => actions.toggleFavorite(chat.id),
          },
          ...(chat?.lastMessage?.from_user !== "me"
            ? [
                {
                  label:
                    chat.unreadMessages > 0 ? "Пометить прочитанным" : "Пометить непрочитанным",
                  icon: chat.unreadMessages == 0 ? MarkAsUnread : SetRead,
                  onClick: () => actions.toggleReadStatus(chat.id),
                },
              ]
            : []),
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
