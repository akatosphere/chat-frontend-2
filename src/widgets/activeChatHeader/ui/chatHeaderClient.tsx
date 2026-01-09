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
      name="Ксения Ярыгина"
      status={"online"}
      photo="/icons/test.jpg"
      onCallClick={handleCallClick}
      onSearchClick={handleCallClick}
      onPhotoClick={handleCallClick}
      onInfoClick={handleCallClick}
    />
  );
}
