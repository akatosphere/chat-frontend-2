import Image from "next/image";

type AvatarProps = {
  isOnline: boolean;
  avatarUrl: string;
};

export const Avatar = ({ isOnline, avatarUrl }: AvatarProps) => (
  <div className="relative shrink-0">
    {!avatarUrl ? (
      <div className="w-15 h-15 rounded-full bg-gray flex items-center justify-center text-base font-semibold text-black">
        <Image
          src="/icons/chat/avatar_placeholder.svg"
          width={60}
          height={60}
          alt="аватар"
        />
      </div>
    ) : (
      <div></div>
    )}
    {isOnline && (
      <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    )}
  </div>
);
