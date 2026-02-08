"use client";

import { useCallback, useState } from "react";

import { Avatar } from "@/entities/chat/ui/avatar";
import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useIsInContact } from "@/entities/contact/lib/useIsInContact";
import { ContactListResponse } from "@/entities/contact/model/types";
import { User } from "@/entities/user/model/types";
import { UserInfoList } from "@/entities/user/ui/UserInfoList";
import { AddToContactsProfileBtn } from "@/features/contacts/addToContacts/ui/addToContactsProfileBtn";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { Toast } from "@/shared/toast/ui/toast";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

type AnothersProfileProps = {
  initialData: User | null;
  contactsInitialData?: ContactListResponse | null;
};

export const AnothersProfile: React.FC<AnothersProfileProps> = ({
  initialData,
  contactsInitialData,
}) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const [showToast, setShowToast] = useState(false);
  useContactsSync(contactsInitialData);
  const isInContact = useIsInContact(initialData?.uid ?? "");

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleAddToContactsSuccess = useCallback(() => {
    setShowToast(true);
  }, []);

  return (
    <>
      <SidebarHeader title="Информация" closeButton={!isMobile} backButton={isMobile} />
      <SidebarContainer className="" scrollbar={isMobile}>
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
      {showToast && (
        <Toast
          message="Пользователь успешно добавлен в контакты"
          onClose={handleToastClose}
          icon={{
            mobile: "/icons/toast/checkMobile.svg",
            desktop: "/icons/toast/checkDesktop.svg",
          }}
        />
      )}
    </>
  );
};
