import Image from "next/image";

type AvatarProps = {
  isOnline: boolean;
  avatarUrl: string;
};

export const Avatar = ({ isOnline, avatarUrl }: AvatarProps) => {
  const avatarSrc = avatarUrl || "/chat/avatar.svg";
  return (
    <div className="relative shrink-0">
      <div className="h-15 w-15 rounded-full">
        <Image src={avatarSrc} width={60} height={60} alt="аватар" />
      </div>
      {isOnline && (
        <div className="absolute right-0.5 bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
};
