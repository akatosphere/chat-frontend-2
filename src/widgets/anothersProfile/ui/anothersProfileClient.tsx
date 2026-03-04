"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { ChatTypeLight } from "@/entities/chat/model/types";
import { ContactListResponse } from "@/entities/contact/model/types";
import { User } from "@/entities/user/model/types";
import { useUserInfoStore } from "@/entities/user/model/useUserInfoStore";
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

  const cachedUserInfo = useUserInfoStore((s) =>
    chatInfo ? s.userInfoByUid[chatInfo.uid] : undefined,
  );

  useEffect(() => {
    if (chatInfo) {
      useUserInfoStore.getState().setUserInfo(chatInfo.uid, chatInfo);
    }
    setActiveSection("media");
    return () => resetTabsUI();
  }, [chatInfo]);

  const displayData = cachedUserInfo ?? chatInfo;

  const contextMenu = useAnothersProfileContextMenu({
    chatId: displayData?.id || null,
    chatName: displayData?.fullName ?? "",
  });

  const tabs: Record<string, React.ReactNode> = {
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
        <AnothersProfile
          initialData={displayData}
          contactsInitialData={contacts}
          isMobile={isMobile}
        />
      ) : (
        tabs[activeSection] || <LinksPage />
      )}
    </>
  );
};
