"use client";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { ChatTypeLight } from "@/entities/chat/model/types";
import { useUserStore } from "@/entities/user/model/userStore";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { getProfileHeaderText } from "../lib/getProfileHeaderText";
import { useChatProfileContextMenu } from "../lib/useChatProfileContextMenu";
import { useProfileClose } from "../lib/useProfileClose";
import { useAnothersProfileUIStore } from "../model/anothersProfileUIStore";
import { ChatProfile } from "./chatProfile";

type ChatProfileClientProps = {
  chatKey: string;
  chatType: ChatTypeLight;
  chatInfo: MappedChatDetails | null;
};

export const ChatProfileClient: React.FC<ChatProfileClientProps> = ({
  chatKey,
  chatType,
  chatInfo,
}) => {
  const { isMainActive, activeSection } = useAnothersProfileUIStore((s) => ({
    isMainActive: s.isMainActive,
    activeSection: s.activeSection,
  }));
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const sidebarHeaderText = getProfileHeaderText({ chatType, isMainActive, activeSection });
  const closeProfile = useProfileClose();
  const currentUserUid = useUserStore((s) => s.userId);
  const isOwner = currentUserUid === chatInfo?.createdBy;
  const contextMenu = useChatProfileContextMenu({
    isOwner,
    chatType,
    chatKey,
    chatName: chatInfo?.title || "",
    fullChatType: chatInfo?.type || "chat",
    chatId: chatInfo?.id || null,
  });

  if (!chatInfo) {
    return <div>Ошибка загрузки профиля</div>;
  }

  return (
    <>
      <SidebarHeader
        title={sidebarHeaderText}
        closeButton={!isMobile}
        closeButtonFn={closeProfile}
        backButtonFn={closeProfile}
        backButton={isMobile}
        contextMenu={contextMenu}
      />
      <ChatProfile initialData={chatInfo} isMobile={isMobile} isOwner={isOwner} />
    </>
  );
};
