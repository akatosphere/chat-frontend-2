"use client";

import { useCallback, useState } from "react";

import { Avatar } from "@/entities/chat/ui/avatar";
import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useIsInContact } from "@/entities/contact/lib/useIsInContact";
import { ContactListResponse } from "@/entities/contact/model/types";
import { User } from "@/entities/user/model/types";
import { UserInfoList } from "@/entities/user/ui/UserInfoList";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { AddedToContactsModal } from "@/features/contacts/addToContacts/ui/AddedToContactsModal";
import { AddToContactsProfileBtn } from "@/features/contacts/addToContacts/ui/addToContactsProfileBtn";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { useAnothersProfileContextMenu } from "../lib/useAnothersProfileContextMenu";
import { useProfileClose } from "../lib/useProfileClose";

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
        <div className="flex flex-col items-start gap-6 px-4 pt-2">
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
