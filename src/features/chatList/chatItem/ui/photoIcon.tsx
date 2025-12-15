import Image from "next/image";

export const PhotoIcon = () => (
  <Image
    src="/icons/chat/picture.svg"
    alt="photo"
    width={14}
    height={14}
    className="shrink-0"
  />
);
