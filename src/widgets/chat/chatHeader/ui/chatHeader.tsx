"use client";

import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { BackButton } from "@/shared/ui/backButton";

import { ChatHeaderActions } from "./chatHeaderActions";
import { ChatHeaderUser } from "./chatHeaderUser";

type Props = {
  chat: {
    name: string;
    wasOnlineAt?: number | null;
    isOnline?: boolean | null;
    membersCount?: number;
    chatType: ChatType;
    photo: string | null;
  };
  backHref: string;
  onCallClick: () => void;
  onSearchClick: () => void;
  onPhotoClick: () => void;
  onInfoClick: () => void;
};

export const ChatHeader = ({
  chat,
  backHref,
  onCallClick,
  onSearchClick,
  onPhotoClick,
  onInfoClick,
}: Props) => {
  return (
    <header className="desktop:bg-main-light-gray desktop:border-muted desktop:rounded-t-lg desktop:border-b flex h-[60px] items-center justify-between px-4">
      <BackButton href={backHref} className="desktop:hidden mr-6 shrink-0" width={12} height={20} />

      <ChatHeaderUser onPhotoClick={onPhotoClick} onInfoClick={onInfoClick} chat={chat} />

      <ChatHeaderActions onCallClick={onCallClick} onSearchClick={onSearchClick} />
    </header>
  );
};
