import Delete from "@icons/chat/context-menu/delete.svg";
import PersonAdd from "@icons/chat/context-menu/personAdd.svg";
import SetRead from "@icons/chat/context-menu/setRead.svg";
import MarkAsUnread from "@icons/chat/markAsUnread.svg";
import Mute from "@icons/chat/mute.svg";
import Favorite from "@icons/chat/pin.svg";
import Unmute from "@icons/chat/unMute.svg";
import { MouseEvent } from "react";

import { ChatItemData } from "@/entities/chat/model/types";
import { ChatActions } from "@/features/chatList/model/types";
import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

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
            label: !chat.notifications ? "Включить уведомления" : "Выключить уведомления",
            icon: !chat.notifications ? Unmute : Mute,
            onClick: () => actions.toggleMuteStatus(chat.id, chat.notifications),
          },
          {
            label: chat.is_favorite ? "Снять закрепление" : "Закрепить",
            icon: Favorite,
            onClick: () => actions.toggleFavorite(chat.id, chat.is_favorite),
          },
          ...(chat?.last_message?.from_user !== "me"
            ? [
                {
                  label:
                    chat.new_message_count > 0 ? "Пометить прочитанным" : "Пометить непрочитанным",
                  icon: chat.new_message_count == 0 ? MarkAsUnread : SetRead,
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
