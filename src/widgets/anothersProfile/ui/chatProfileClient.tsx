"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { ChatTypeLight } from "@/entities/chat/model/types";
import { useChatInfoStore } from "@/entities/chat/model/useChatInfoStore";
import { useUserStore } from "@/entities/user/model/userStore";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { getProfileHeaderText } from "../lib/getProfileHeaderText";
import { useChatProfileContextMenu } from "../lib/useChatProfileContextMenu";
import { useProfileClose } from "../lib/useProfileClose";
import { useAnothersProfileUIStore } from "../model/anothersProfileUIStore";
import { ChatProfile } from "./chatProfile";
import { FilesPage } from "./tabs/filesPage";
import { LinksPage } from "./tabs/linksPage";
import { MediaPage } from "./tabs/mediaPage";
import { ParticipantsPage } from "./tabs/participantsPage";
import { VoicesPage } from "./tabs/voicesPage";

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
  const { isMainActive, activeSection, setActiveSection, resetTabsUI } = useAnothersProfileUIStore(
    useShallow((s) => ({
      isMainActive: s.isMainActive,
      activeSection: s.activeSection,
      setActiveSection: s.setActiveSection,
      resetTabsUI: s.reset,
    })),
  );
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const sidebarHeaderText = getProfileHeaderText({ chatType, isMainActive, activeSection });
  const closeProfile = useProfileClose();
  const currentUserUid = useUserStore((s) => s.userId);
  const cachedChatInfo = useChatInfoStore((s) => s.chatInfoByKey[chatKey]);

  useEffect(() => {
    if (chatInfo) {
      useChatInfoStore.getState().setChatInfo(chatKey, chatInfo);
    }
    setActiveSection("participants");
    return () => resetTabsUI();
  }, [chatKey, chatInfo]);

  const displayData = cachedChatInfo ?? chatInfo;

  const isOwner = currentUserUid === displayData?.createdBy;
  const contextMenu = useChatProfileContextMenu({
    isOwner,
    chatType,
    chatKey,
    chatName: displayData?.title || "",
    fullChatType: displayData?.type || "chat",
    chatId: displayData?.id || null,
  });

  const tabs: Record<string, React.ReactNode> = {
    participants: <ParticipantsPage />,
    media: <MediaPage />,
    files: <FilesPage />,
    voices: <VoicesPage />,
    links: <LinksPage />,
  };

  if (!displayData) {
    return <div>Ошибка загрузки профиля</div>;
  }

  return (
    <>
      <SidebarHeader
        title={sidebarHeaderText}
        closeButton={!isMobile && isMainActive}
        closeButtonFn={closeProfile}
        backButtonFn={closeProfile}
        backButton={isMobile || !isMainActive}
        contextMenu={contextMenu}
      />
      {isMainActive ? (
        <ChatProfile initialData={displayData} isMobile={isMobile} isOwner={isOwner} />
      ) : (
        tabs[activeSection] || <LinksPage />
      )}
    </>
  );
};
