// import { cn } from '@/shared/shadcn/lib/utils';

import { Avatar } from "@/entities/chat/ui/avatar";
import { InfoItemsList } from "@/shared/ui/infoItems/infoItemsList";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { useAnothersProfileLogic } from "./lib/useAnothersProfileLogic";

type AnothersProfileProps = {
  chatKey: string;
};

export const AnothersProfile: React.FC<AnothersProfileProps> = ({ chatKey }) => {
  const { title, name, status } = useAnothersProfileLogic(chatKey);
  return (
    <>
      <SidebarHeader title={title} closeButton />
      <SidebarContainer className="" scrollbar={false}>
        <div className="relative">
          <Avatar
            size="anothersProfileAvatar"
            className="flex w-full justify-center"
            avatarUrl=""
            variant="user"
          />
          <div className="absolute bottom-3 left-4 text-white">
            <p className="title font-medium">{name}</p>
            <p className="text">{status}</p>
          </div>
        </div>
        <div className="px-4 pt-2">
          <InfoItemsList />
        </div>
      </SidebarContainer>
    </>
  );
};
