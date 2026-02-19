"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { ChatTypeLight } from "@/entities/chat/model/types";
import { ContactListResponse } from "@/entities/contact/model/types";
import { User } from "@/entities/user/model/types";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { getProfileHeaderText } from "../lib/getProfileHeaderText";
import { useAnothersProfileContextMenu } from "../lib/useAnothersProfileContextMenu";
import { useProfileClose } from "../lib/useProfileClose";
import { useAnothersProfileUIStore } from "../model/anothersProfileUIStore";
import { AnothersProfile } from "./anothersProfile";
import { FilesPage } from "./tabs/filesPage";
import { LinksPage } from "./tabs/linksPage";
import { MediaPage } from "./tabs/mediaPage";
import { ParticipantsPage } from "./tabs/participantsPage";
import { VoicesPage } from "./tabs/voicesPage";

type AnothersProfileClientProps = {
  chatType: ChatTypeLight;
  chatInfo: User | null;
  contacts: ContactListResponse | null;
};

export const AnothersProfileClient: React.FC<AnothersProfileClientProps> = ({
  chatType,
  chatInfo,
  contacts,
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
  const contextMenu = useAnothersProfileContextMenu({
    chatId: chatInfo?.id || null,
    chatName: chatInfo?.fullName ?? "",
  });

  useEffect(() => {
    setActiveSection("media");
    return () => resetTabsUI();
  }, []);

  const tabs: Record<string, React.ReactNode> = {
    participants: <ParticipantsPage />,
    media: <MediaPage />,
    files: <FilesPage />,
    voices: <VoicesPage />,
    links: <LinksPage />,
  };

  if (!chatInfo) {
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
        <AnothersProfile
          initialData={chatInfo}
          contactsInitialData={contacts}
          isMobile={isMobile}
        />
      ) : (
        tabs[activeSection] || <LinksPage />
      )}
    </>
  );
};
