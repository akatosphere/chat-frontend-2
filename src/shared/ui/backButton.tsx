import Back from "@icons/back.svg";
import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";

type BackButtonProps = {
  className?: string;
  href: string;
  width?: number;
  height?: number;
};

export const BackButton: React.FC<BackButtonProps> = ({ className, href }) => {
  return (
    <Link className={cn("flex h-6 w-6 items-center justify-center", className)} href={href}>
      <Back
        alt="Назад"
        className={cn(
          "h-5 w-[11px] object-cover transition-all duration-200 ease-in-out hover:scale-[0.9]",
        )}
      />
    </Link>
  );
};
