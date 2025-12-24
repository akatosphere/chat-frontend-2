import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";

type BackButtonProps = {
  className?: string;
  href: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ className, href }) => {
  return (
    <Link className={cn("", className)} href={href}>
      <Image
        src="/icons/back.svg"
        width={12}
        height={12}
        alt="Назад"
        className="transition-all duration-200 ease-in-out hover:scale-[0.9]"
      />
    </Link>
  );
};
