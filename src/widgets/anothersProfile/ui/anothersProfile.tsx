"use client";

import { useCallback, useEffect, useState } from "react";

import { Avatar } from "@/entities/chat/ui/avatar";
import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useIsInContact } from "@/entities/contact/lib/useIsInContact";
import { ContactListResponse } from "@/entities/contact/model/types";
import { User } from "@/entities/user/model/types";
import { UserInfoList } from "@/entities/user/ui/UserInfoList";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { AddedToContactsModal } from "@/features/contacts/addToContacts/ui/AddedToContactsModal";
import { AddToContactsProfileBtn } from "@/features/contacts/addToContacts/ui/addToContactsProfileBtn";
import { ProfileNotifications } from "@/features/notifications/ui/profileNotifications";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { OurTabsList } from "@/shared/ourTabs/ourTabsList";
import { OurTabsTrigger } from "@/shared/ourTabs/ourTabsTrigger";
import { Tabs, TabsContent } from "@/shared/shadcn/ui/tabs";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { useAnothersProfileContextMenu } from "../lib/useAnothersProfileContextMenu";
import { useProfileClose } from "../lib/useProfileClose";
import { useAnothersProfileUIStore } from "../model/anothersProfileUIStore";
import { FilesPage } from "./tabs/filesPage";
import { LinksPage } from "./tabs/linksPage";
import { MediaPage } from "./tabs/mediaPage";
import { VoicesPage } from "./tabs/voicesPage";

type AnothersProfileProps = {
  initialData: User | null;
  contactsInitialData?: ContactListResponse | null;
};

export const AnothersProfile: React.FC<AnothersProfileProps> = ({
  initialData,
  contactsInitialData,
}) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const getChatId = useChatListStore((s) => s.getChatIdByUid);
  const chatId = getChatId(initialData?.uid ?? "");
  const closeProfile = useProfileClose();
  const activeSection = useAnothersProfileUIStore((s) => s.activeSection);
  const setActiveSection = useAnothersProfileUIStore((s) => s.setActiveSection);
  const resetTabsUI = useAnothersProfileUIStore((s) => s.reset);
  const [showModal, setShowModal] = useState(false);
  useContactsSync(contactsInitialData);
  const isInContact = useIsInContact(initialData?.uid ?? "");

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleAddToContactsSuccess = useCallback(() => {
    setShowModal(true);
  }, []);

  const contextMenu = useAnothersProfileContextMenu({
    chatId,
    chatName: initialData?.fullName ?? "",
  });

  useEffect(() => {
    setActiveSection("media");
    console.log("setActiveSection media");
    return () => resetTabsUI();
  }, []);

  return (
    <>
      <SidebarHeader
        title="Информация"
        closeButton={!isMobile}
        closeButtonFn={closeProfile}
        backButtonFn={closeProfile}
        backButton={isMobile}
        contextMenu={contextMenu}
      />
      <SidebarContainer className="desktop:p-0 p-4" scrollbar={isMobile}>
        <div className="relative">
          <Avatar
            size="anothersProfileAvatar"
            className="flex w-full justify-center"
            avatarUrl={initialData?.avatarUrl}
            variant="user"
          />
          <div className="absolute bottom-3 left-4 text-white">
            <p className="title font-medium">{initialData?.fullName}</p>
            <p className="text">{initialData?.isOnline ? "В сети" : "Не в сети"}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 px-4 pt-4 pb-6">
          <ProfileNotifications />
          <UserInfoList initialData={initialData} />
          {initialData && !isInContact && (
            <AddToContactsProfileBtn
              phone={initialData.username}
              firstName={initialData.firstName}
              lastName={initialData.lastName}
              onSuccess={handleAddToContactsSuccess}
            />
          )}
        </div>
        <Tabs defaultValue={activeSection}>
          <OurTabsList>
            <OurTabsTrigger value="media">Медиа</OurTabsTrigger>
            <OurTabsTrigger value="files">Файлы</OurTabsTrigger>
            <OurTabsTrigger value="voices">Голосовые</OurTabsTrigger>
            <OurTabsTrigger value="links">Ссылки</OurTabsTrigger>
          </OurTabsList>
          <TabsContent value="media">
            <MediaPage />
          </TabsContent>
          <TabsContent value="files">
            <FilesPage />
          </TabsContent>
          <TabsContent value="voices">
            <VoicesPage />
          </TabsContent>
          <TabsContent value="links">
            <LinksPage />
          </TabsContent>
        </Tabs>
      </SidebarContainer>
      {initialData && (
        <AddedToContactsModal
          isOpen={showModal}
          onClose={handleModalClose}
          firstName={initialData.firstName}
          lastName={initialData.lastName}
        />
      )}
    </>
  );
};
