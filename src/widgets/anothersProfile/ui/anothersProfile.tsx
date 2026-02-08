"use client";

import { Avatar } from "@/entities/chat/ui/avatar";
import { User } from "@/entities/user/model/types";
import { UserInfoList } from "@/entities/user/ui/UserInfoList";
import { AddToContactsProfileBtn } from "@/features/contacts/addToContacts/ui/addToContactsProfileBtn";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

type AnothersProfileProps = {
  initialData: User | null;
  isInContact: boolean;
};

export const AnothersProfile: React.FC<AnothersProfileProps> = ({ initialData}) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);
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
        <div className="px-4 pt-2 flex flex-col gap-6 items-start">
          <UserInfoList initialData={initialData} />
          <AddToContactsProfileBtn />
        </div>
      </SidebarContainer>
    </>
  );
};
