import Image from "next/image"
import { cn } from "@/shared/shadcn/lib/utils"
import { UserStatus } from "../model/types"
import { STATUS_CONFIG } from "../model/statusConfig"

type Props = {
  name: string
  status: UserStatus
  photo?: string
  onPhotoClick: () => void
  onInfoClick: () => void
}

export const ChatHeaderUser = ({
  name,
  status,
  photo,
  onPhotoClick,
  onInfoClick,
}: Props) => {
  const statusData = STATUS_CONFIG[status]

  return (
    <div className="flex items-center flex-1 min-w-0 gap-3 h-[60px] pl-4 border-b border-light-gray md:border-none">

      <button
        onClick={onPhotoClick}
        className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full"
      >
        <Image
          src={photo ?? "/icons/profilePhoto.svg"}
          alt="profile"
          fill
          className="object-cover"
        />
      </button>

      <button
        onClick={onInfoClick}
        className="flex flex-col min-w-0 text-left"
      >
        <p className="truncate text-sm font-medium md:text-lg">
          {name}
        </p>
        <p
          className={cn(
            "truncate text-xs mt-1 md:text-sm transition-colors",
            statusData.className
          )}
        >
          {statusData.label}
        </p>
      </button>
    </div>
  )
}
