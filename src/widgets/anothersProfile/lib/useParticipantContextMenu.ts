import Delete from "@icons/chat/context-menu/delete.svg";
import { MouseEvent } from "react";

import { ChatParticipant } from "@/entities/chat/model/types";
import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { useRemoveParticipant } from "@/features/removeParticipant/lib/useRemoveParticipant";
import { useContextMenu } from "@/shared/ui/contextMenu/contextMenuProvider";

type UseParticipantContextMenuParams = {
  participant: ChatParticipant;
  chatKey: string;
  chatType: "group" | "channel" | "chat";
};

export const useParticipantContextMenu = ({
  participant,
  chatKey,
  chatType,
}: UseParticipantContextMenuParams) => {
  const { openMenu, activeMenuId } = useContextMenu();
  const openModal = useModalStore((s) => s.openModal);

  const menuId = `participant-${participant.uid}`;

  const { confirmRemove } = useRemoveParticipant({
    chatKey,
    participantUid: participant.uid,
    participantName: participant.fullName,
  });

  return {
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault();
      openMenu(
        menuId,
        [
          {
            label: "Удалить",
            icon: Delete,
            destructive: true,
            onClick: () => {
              openModal("removeParticipant", {
                participantName: participant.fullName,
                onConfirm: confirmRemove,
                chatType: chatType,
              });
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
