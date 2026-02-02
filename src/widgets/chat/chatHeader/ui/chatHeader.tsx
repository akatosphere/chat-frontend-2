"use client";

import Link from "next/link";

import { BackButton } from "@/shared/ui/backButton";

import { UserStatus } from "../model/types";
import { ChatHeaderActions } from "./chatHeaderActions";
import { ChatHeaderUser } from "./chatHeaderUser";

type Props = {
  name: string;
  status: UserStatus | string;
  photo: string | null;
  backHref: string;
  profileHref: string;
  onCallClick: () => void;
  onSearchClick: () => void;
};

export const ChatHeader = ({
  name,
  status,
  photo,
  backHref,
  onCallClick,
  onSearchClick,
  profileHref,
}: Props) => {
  return (
    <header className="desktop:bg-main-light-gray desktop:border-muted desktop:rounded-t-lg desktop:border-b flex h-[60px] items-center justify-between px-4">
      <BackButton href={backHref} className="desktop:hidden mr-6 shrink-0" width={12} height={20} />
      <Link href={profileHref} className="flex w-full flex-1 items-center justify-between">
        <ChatHeaderUser name={name} status={status} photo={photo} />
      </Link>

      <ChatHeaderActions onCallClick={onCallClick} onSearchClick={onSearchClick} />
    </header>
  );
};
