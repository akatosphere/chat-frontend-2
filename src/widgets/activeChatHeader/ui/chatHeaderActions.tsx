// import Image from "next/imag

import ProfileCall from "@/shared/ui/icons/chat/header/profileCall.svg";
import ProfileCallInChatDesktop from "@/shared/ui/icons/chat/header/profileCallDesktop.svg";
import SearchInChat from "@/shared/ui/icons/chat/header/searchWebInChat.svg";

type Props = {
  onCallClick: () => void;
  onSearchClick: () => void;
};

export const ChatHeaderActions = ({ onCallClick, onSearchClick }: Props) => {
  return (
    <div className="flex items-center">
      {/* Поиск на десктопе */}
      <button
        aria-label="Поиск"
        onClick={onSearchClick}
        className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full md:flex"
      >
        <SearchInChat className="text-primary h-11 w-11" />
      </button>

      {/* Звонок на мобилке */}
      <button
        aria-label="Позвонить"
        onClick={onCallClick}
        className="ml-4 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
      >
        <ProfileCall className="text-primary h-11 w-11" />
      </button>

      {/* Звонок на десктопе */}
      <button
        aria-label="Позвонить"
        onClick={onCallClick}
        className="ml-3 hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full md:flex"
      >
        <ProfileCallInChatDesktop className="text-primary h-10 w-10" />
      </button>
    </div>
  );
};
