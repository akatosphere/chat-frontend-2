"use client"

import { HeaderActiveChat } from "./headerActiveChat"


export default function ChatHeaderClient() {
  const handleCallClick = () => {
    //заглушка
    console.info("Функция [Вызова] еще не реализована.")
  }

  return (
    <HeaderActiveChat
      name="Ксения Ярыгина"
      status={"online"}
      photo="/icons/test.jpg"
      onCallClick={handleCallClick}
      onSearchClick={handleCallClick}
      onPhotoClick={handleCallClick}
      onInfoClick={handleCallClick}
    />
  )
}
