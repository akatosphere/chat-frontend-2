import Delete from "@icons/chat/context-menu/delete.svg";
import PersonAdd from "@icons/chat/context-menu/personAdd.svg";
import SetRead from "@icons/chat/context-menu/setRead.svg";
import MarkAsUnread from "@icons/chat/markAsUnread.svg";
import Mute from "@icons/chat/mute.svg";
import Favorite from "@icons/chat/pin.svg";
import Unmute from "@icons/chat/unMute.svg";
import { MouseEvent, useCallback, useState } from "react";

import { ChatListItem } from "@/entities/chat/model/types";
import { addToContacts } from "@/entities/contact/api/addToContacts";
import { ChatActions } from "@/features/chatList/model/types";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

export const useChatListItemContextMenu = (chat: ChatListItem, actions: ChatActions) => {
  const { openMenu, activeMenuId } = useContextMenu();
  const patchChat = useChatListStore((s) => s.patchChat);
  const [showAddedModal, setShowAddedModal] = useState(false);

  const menuId = `chat-${chat.id}`;

  const handleAddToContacts = () => {
    patchChat(chat.key, {
      member: { ...chat.member, is_in_contacts: true },
    });

    if (chat.member.username) {
      addToContacts({
        phone: chat.member.username,
        first_name: chat.member.first_name,
        last_name: chat.member.last_name ?? "",
      }).then((res) => {
        if (!res.success) {
          console.error(res.error);
          patchChat(chat.key, {
            member: { ...chat.member, is_in_contacts: false },
          });
        } else {
          setShowAddedModal(true);
        }
      });
    }
  };

  const handleModalClose = useCallback(() => {
    setShowAddedModal(false);
  }, []);

  return {
    showAddedModal,
    handleModalClose,
    addedContactName: {
      firstName: chat.member.first_name,
      lastName: chat.member.last_name ?? "",
    },
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          ...(chat.type === "chat" && !chat.member.is_in_contacts
            ? [
                {
                  label: "Добавить в контакты",
                  icon: PersonAdd,
                  onClick: handleAddToContacts,
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
