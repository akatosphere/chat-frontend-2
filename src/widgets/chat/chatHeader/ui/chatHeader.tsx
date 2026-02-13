"use client";

import Link from "next/link";

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
  profileHref: string;
  onCallClick: () => void;
  onSearchClick: () => void;
};

export const ChatHeader = ({ chat, backHref, onCallClick, onSearchClick, profileHref }: Props) => {
  return (
    <header className="desktop:bg-main-light-gray desktop:border-muted desktop:rounded-t-lg desktop:border-b flex h-[60px] items-center justify-between px-4">
      <BackButton href={backHref} className="desktop:hidden mr-6 shrink-0" width={12} height={20} />
      <Link href={profileHref} className="flex w-full flex-1 items-center justify-between">
        <ChatHeaderUser
          chatType={chat.chatType}
          name={chat.name}
          photo={chat.photo}
          isOnline={chat.isOnline}
          membersCount={chat.membersCount}
          wasOnlineAt={chat.wasOnlineAt}
        />
      </Link>

      <ChatHeaderActions onCallClick={onCallClick} onSearchClick={onSearchClick} />
    </header>
  );
};
