"use client";

import { BackButton } from "@/shared/ui/backButton";

import { UserStatus } from "../model/types";
import { ChatHeaderActions } from "./chatHeaderActions";
import { ChatHeaderUser } from "./chatHeaderUser";

type Props = {
  name: string;
  status: UserStatus;
  photo?: string;
  backHref: string;
  onCallClick: () => void;
  onSearchClick: () => void;
  onPhotoClick: () => void;
  onInfoClick: () => void;
};

export const ChatHeader = ({
  name,
  status,
  photo,
  backHref,
  onCallClick,
  onSearchClick,
  onPhotoClick,
  onInfoClick,
}: Props) => {
  return (
    <header className="desktop:bg-main-light-gray desktop:border-muted desktop:rounded-t-lg desktop:border-b flex h-[60px] items-center justify-between px-4">
      <BackButton href={backHref} className="desktop:hidden mr-6 shrink-0" width={12} height={20} />

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
