import { MouseEvent } from "react";

import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { openFilePicker } from "@/features/chat/chat/lib/openFilePicker";
import { openImagePicker } from "@/features/chat/chat/lib/openImagePicker";
import { useSendFilesStore } from "@/features/chat/chat/model/store/useChatSendFilesStore";
import { useSendImageStore } from "@/features/chat/chat/model/store/useChatSendImagesStore";
import File from "@/shared/ui/icons/sendFiles/file.svg";
import Image from "@/shared/ui/icons/sendFiles/image.svg";

import { useContextMenu } from "../ui/contextMenuProvider";

export const useSendFilesContextMenu = () => {
  const { openMenu, activeMenuId } = useContextMenu();
  const addImages = useSendImageStore((s) => s.addImages);
  const addFiles = useSendFilesStore((s) => s.addFiles);
  const openModal = useModalStore((s) => s.openModal);
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
              openModal("sendImage", { chatKey: "" });
            },
          },
          {
            label: "Выбрать файл",
            icon: File,
            onClick: async () => {
              const files = await openFilePicker();
              addFiles(files);
              openModal("sendFile", { chatKey: "" });
            },
          },
        ],
        e.clientX,
        e.clientY,
        "top-right",
      );
    },
    isOpen: activeMenuId === menuId,
  };
};
