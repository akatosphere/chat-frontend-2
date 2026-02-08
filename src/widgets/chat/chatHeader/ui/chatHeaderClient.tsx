"use client";

import { ChatHeader } from "./chatHeader";

export default function ChatHeaderClient() {
  const handleCallClick = () => {
    //заглушка
    console.info("Функция еще не реализована.");
  };

  return (
    <ChatHeader
      backHref="/chats"
      profileHref="/settings/profile"
      name="Ксения Ярыгина"
      status={"online"}
      photo="/icons/test.jpg"
      onCallClick={handleCallClick}
      onSearchClick={handleCallClick}
    />
  );
}
