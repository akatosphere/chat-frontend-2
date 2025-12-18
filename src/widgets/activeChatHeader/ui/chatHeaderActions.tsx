import Image from "next/image"

type Props = {
  onCallClick: () => void
  onSearchClick: () => void
}

export const ChatHeaderActions = ({
  onCallClick,
  onSearchClick,
}: Props) => {
  return (
    <div className="flex items-center">

      <button
        onClick={onSearchClick}
        className="hidden md:flex w-9 h-9 rounded-full items-center justify-center"
      >
        <Image
          src="/icons/searchWebInChat.svg"
          alt="search"
          width={44}
          height={44}
        />
      </button>

      <button
        onClick={onCallClick}
        className="flex md:hidden w-11 h-11 ml-4 rounded-full items-center justify-center"
      >
        <Image
          src="/icons/profileCall.svg"
          alt="call"
          width={44}
          height={44}
        />
      </button>

      <button
        onClick={onCallClick}
        className="hidden md:flex w-9 h-9 ml-3 rounded-full items-center justify-center"
      >
        <Image
          src="/icons/profileCallDesktop.svg"
          alt="call"
          width={40}
          height={40}
        />
      </button>
    </div>
  )
}
