"use client";

import { BackButton } from "@/shared/ui/backButton";

import { UserStatus } from "../model/types";
import { ChatHeaderActions } from "./chatHeaderActions";
import { ChatHeaderUser } from "./chatHeaderUser";

type Props = {
  name: string;
  status: UserStatus;
  photo?: string;
  onCallClick: () => void;
  onSearchClick: () => void;
  onPhotoClick: () => void;
  onInfoClick: () => void;
};

export const ChatHeader = ({
  name,
  status,
  photo,
  onCallClick,
  onSearchClick,
  onPhotoClick,
  onInfoClick,
}: Props) => {
  return (
    <header className="md:bg-main-gray md:border-light-gray flex h-[60px] items-center justify-between px-4 md:rounded-t-lg md:border-b">
      <BackButton href="/" className="ml-2.5 h-6 w-6 shrink-0 md:hidden" width={12} height={20} />

      <ChatHeaderUser
        name={name}
        status={status}
        photo={photo}
        onPhotoClick={onPhotoClick}
        onInfoClick={onInfoClick}
      />

      <ChatHeaderActions onCallClick={onCallClick} onSearchClick={onSearchClick} />
    </header>
  );
};
