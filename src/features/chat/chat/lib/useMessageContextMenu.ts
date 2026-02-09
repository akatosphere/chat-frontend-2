import Copy from "@icons/chat/context-menu/copy.svg";
import Delete from "@icons/chat/context-menu/delete.svg";
import Select from "@icons/chat/context-menu/select.svg";
import Forwarded from "@icons/chat/forwardedd.svg";
import { MouseEvent } from "react";

import { useChatStore } from "@/entities/chat/model/useChatStore";
import { useDeleteMessage } from "@/features/chat/chat/hooks";
import { MappedChatMessage } from "@/features/chat/chat/model/types/mappedTypes";
import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

export const useMessageContextMenu = (message: MappedChatMessage) => {
  const { openMenu, activeMenuId } = useContextMenu();

  const { setReplyTarget } = useChatStore();
  const deleteMessage = useDeleteMessage();
  const menuId = `message-${message.id}`;
  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          { label: "Ответить", icon: Forwarded, onClick: () => setReplyTarget(message) },
          {
            label: "Переслать",
            icon: Forwarded,
            onClick: () => console.log("Переслать", message.id),
          },
          {
            label: "Скопировать",
            icon: Copy,
            onClick: () => console.log("Скопировать", message.id),
          },
          { label: "Выбрать", icon: Select, onClick: () => console.log("Выбрать", message.id) },
          {
            label: "Удалить",
            icon: Delete,
            destructive: true,
            onClick: () => {
              deleteMessage(message.uid, true);
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
