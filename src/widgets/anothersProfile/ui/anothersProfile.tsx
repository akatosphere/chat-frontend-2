// import { cn } from '@/shared/shadcn/lib/utils';

import { Avatar } from "@/entities/chat/ui/avatar";
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
        <Avatar
          size="anothersProfileAvatar"
          className="flex w-full justify-center"
          avatarUrl=""
          variant="user"
        />
        <div>
          <p>{name}</p>
          <p>{status}</p>
        </div>
      </SidebarContainer>
    </>
  );
};
