import { cn } from "@/shared/shadcn/lib/utils";
import Image from "next/image";
import Link from "next/link";

type BackButtonProps = {
  className?: string;
  href: string;
  width?:number
  height?:number
};

export const BackButton: React.FC<BackButtonProps> = ({ className, href, width = 12, height = 12 }) => {
  return (
    <Link className={cn("", className)} href={href}>
      <Image
        src="/icons/back.svg"
        width={width}
        height={height}
        alt="Назад"
        className="hover:scale-[0.9] transition-all duration-200 ease-in-out"
      />
    </Link>
  );
};
