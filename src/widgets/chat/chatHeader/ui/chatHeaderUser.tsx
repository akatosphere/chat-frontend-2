import Image from "next/image";

import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import ProfilePhoto from "@/shared/ui/icons/chat/header/profilePhoto.svg";
import { Statusbar } from "@/shared/ui/statusbar/ui/statusbar";

type Props = {
  chat: {
    name: string;
    wasOnlineAt?: number;
    isOnline?: boolean;
    membersCount?: number;
    chatType: ChatType;
    photo: string | null;
  };
  onPhotoClick: () => void;
  onInfoClick: () => void;
};

export const ChatHeaderUser = ({ chat, onPhotoClick, onInfoClick }: Props) => {
  return (
    <div className="border-light-gray desktop:border-none flex h-[60px] min-w-0 flex-1 items-center gap-3 border-b">
      <button
        onClick={onPhotoClick}
        className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full"
      >
        {chat.photo ? (
          <Image src={chat.photo} alt="profile" fill className="object-cover" />
        ) : (
          <ProfilePhoto className="text-primary h-10 w-10" />
        )}
      </button>

      <button onClick={onInfoClick} className="flex min-w-0 cursor-pointer flex-col text-left">
        <p className="desktop:text-lg truncate text-sm font-medium">{chat.name}</p>
        <Statusbar
          time={chat.wasOnlineAt}
          isOnline={chat.isOnline}
          membersCount={chat.membersCount}
          chatType={chat.chatType}
        />
      </button>
    </div>
  );
};
