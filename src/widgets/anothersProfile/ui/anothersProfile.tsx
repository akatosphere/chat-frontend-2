"use client";

import { Avatar } from "@/entities/chat/ui/avatar";
import { User } from "@/entities/user/model/types";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { InfoItemsList } from "@/shared/ui/infoItems/infoItemsList";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { useAnothersProfileLogic } from "../lib/useAnothersProfileLogic";

type AnothersProfileProps = {
  chatKey: string;
  initialData: User | null;
};

export const AnothersProfile: React.FC<AnothersProfileProps> = ({ chatKey, initialData }) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const { title } = useAnothersProfileLogic(chatKey);
  return (
    <>
      <SidebarHeader title={title} closeButton={!isMobile} backButton={isMobile} />
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
        <div className="px-4 pt-2">
          <InfoItemsList />
        </div>
      </SidebarContainer>
    </>
  );
};
