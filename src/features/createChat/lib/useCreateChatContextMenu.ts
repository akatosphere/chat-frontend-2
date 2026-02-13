import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";
import createChannel from "@/shared/ui/icons/createChat/createChannel.svg";
import createGroup from "@/shared/ui/icons/createChat/createGroup.svg";

export const useCreateChatContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const router = useRouter();
  const menuId = "createGrOrCh";

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          {
            label: "Создать группу",
            icon: createGroup,
            onClick: () => {
              router.push("/create-group");
            },
          },
          {
            label: "Создать канал",
            icon: createChannel,
            onClick: () => {
              router.push("/create-channel");
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
