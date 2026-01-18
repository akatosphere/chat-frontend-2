import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import createChannel from "@/shared/ui/icons/createGroupOrChannel/createChannel.svg";
import createGroup from "@/shared/ui/icons/createGroupOrChannel/createGroup.svg";

import { useContextMenu } from "../ui/contextMenuProvider";

export const useCreateGrOrChContextMenu = () => {
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
