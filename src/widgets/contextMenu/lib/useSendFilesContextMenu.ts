import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

import { openImagePicker } from "@/features/chat/chat/lib/openImagePicker";
import { useSendMessageStore } from "@/features/chat/chat/model/store/useChatSendFilesStore";
import File from "@/shared/ui/icons/sendFiles/file.svg";
import Image from "@/shared/ui/icons/sendFiles/image.svg";

import { useContextMenu } from "../ui/contextMenuProvider";

export const useSendFilesContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const addImages = useSendMessageStore((s) => s.addImages);
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
            onClick: async () => {
              const files = await openImagePicker();
              addImages(files);
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
