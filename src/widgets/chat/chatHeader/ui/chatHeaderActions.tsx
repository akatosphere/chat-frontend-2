// import Image from "next/imag

import { Button } from "@/shared/shadcn/ui/button";
import ProfileCall from "@/shared/ui/icons/chat/header/profileCall.svg";
import ProfileCallInChatDesktop from "@/shared/ui/icons/chat/header/profileCallDesktop.svg";
import SearchInChat from "@/shared/ui/icons/chat/header/searchWebInChat.svg";

type Props = {
  onCallClick: () => void;
  onSearchClick: () => void;
  join?: boolean;
};

export const ChatHeaderActions = ({ onCallClick, onSearchClick, join = false }: Props) => {
  return (
    <div className="flex items-center">
      {join ? (
        <div className="flex gap-3">
          <Button size="sm">Вступить</Button>
          {/* Поиск на десктопе */}
          <button
            aria-label="Поиск"
            onClick={onSearchClick}
            className="desktop:flex hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full"
          >
            <SearchInChat className="text-primary h-11 w-11" />
          </button>
        </div>
      ) : (
        <>
          {/* Поиск на десктопе */}
          <button
            aria-label="Поиск"
            onClick={onSearchClick}
            className="desktop:flex hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full"
          >
            <SearchInChat className="text-primary h-11 w-11" />
          </button>
          {/* Звонок на мобилке */}
          <button
            aria-label="Позвонить"
            onClick={onCallClick}
            className="desktop:hidden ml-4 flex h-11 w-11 items-center justify-center rounded-full"
          >
            <ProfileCall className="text-primary h-11 w-11" />
          </button>

          {/* Звонок на десктопе */}
          <button
            aria-label="Позвонить"
            onClick={onCallClick}
            className="desktop:flex ml-3 hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full"
          >
            <ProfileCallInChatDesktop className="text-primary h-10 w-10" />
          </button>
        </>
      )}
    </div>
  );
};
