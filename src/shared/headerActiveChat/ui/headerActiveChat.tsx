"use client"
import Image from "next/image"
import Link from "next/link"
import { UserStatus } from "../utils/types"
import { STATUS_CONFIG } from "../utils/config"
import { cn } from "@/shared/shadcn/lib/utils"

type HeaderActiveChatProps = {
  name?: string,
  status: UserStatus,
  photo?: string
  onCallClick: () => void
  onSearchClick: () => void
  onPhotoClick: () => void
  onInfoClick: () => void
}


export const HeaderActiveChat: React.FC<HeaderActiveChatProps> = ({
    name = "Имя пользователя", 
    status,
    photo, 
    onCallClick, 
    onSearchClick, 
    onPhotoClick, 
    onInfoClick,
  }) => {

  const statusData = STATUS_CONFIG[status]
  return (
    <div className="flex items-center justify-between px-4 h-[60px] w-ful md:border-b md:border-b-light-gray md:bg-[#F5F6F8] md:rounded-t-lg">

      {/* Кнопка назад для мобилки */}
      <button className="w-6 h-6 shrink-0 md:hidden ml-2.5 ">
        <Link href="/">
          <Image src="icons/back.svg" alt="back" width={12} height={20} className=""/>
        </Link>
      </button>
      
      {/* Левый блок: кнопка назад + аватар + инфо */}
      <div className="flex items-center flex-1 min-w-0 gap-3 border-b border-b-light-gray h-[60px] pl-4 md:border-none">

        {/* Аватар */}
        <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full">
          <Image
            onClick={onPhotoClick}
            src={photo ? photo : "icons/profilePhoto.svg"}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        {/* Инфо */}
        <div 
          onClick={onInfoClick}
          className="flex flex-col min-w-0"
        >
          <p className="truncate font-medium text-sm md:font-medium md:text-lg md:leading-[1.2] md:tracking-[0.18px]">{name}</p>
          <p
            className={cn(
              "truncate text-xs transition-colors mt-1 md:font-roboto md:font-normal md:text-sm md:leading-[1.2] md:tracking-[0.14px]",
              statusData.className
            )}
          >
            {statusData.label}
          </p>
        </div>
      </div>

      {/* Правый блок: звонок*/}

      {/* Кнопка поиска для десктопа */}
      <button
        className="hidden md:flex md:w-9 md:h-9 md:shrink-0 ml-4 md:rounded-full md:items-center md:justify-center cursor-pointer"
        onClick={onSearchClick}
      >
        <Image src="icons/searchWebInChat.svg" alt="search" width={44} height={44} />
      </button>

      {/* Кнопка звонка: мобилка */}
      <button
        className="flex md:hidden w-11 h-11 shrink-0 ml-4 rounded-full items-center justify-center"
        onClick={onCallClick}
      >
        <Image src="icons/profileCall.svg" alt="call" width={44} height={44} />
      </button>

      {/* Кнопка звонка: десктоп */}
      <button
        className="hidden md:flex w-9 h-9 shrink-0 ml-3 rounded-full items-center justify-center cursor-pointer"
        onClick={onCallClick}
      >
        <Image src="icons/profileCallDesktop.svg" alt="call" width={40} height={40} />
      </button>
    </div>
  )
}


