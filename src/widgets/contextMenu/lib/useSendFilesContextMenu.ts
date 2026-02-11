import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import File from "@/shared/ui/icons/sendFiles/file.svg";
import Image from "@/shared/ui/icons/sendFiles/image.svg";

import { useContextMenu } from "../ui/contextMenuProvider";

export const useSendFilesContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const router = useRouter();
  const menuId = "sendFiles";

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          {
            label: "Выбрать изображение",
            icon: Image,
            onClick: () => {
              router.push("/create-group");
            },
          },
          {
            label: "Выбрать файл",
            icon: File,
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
