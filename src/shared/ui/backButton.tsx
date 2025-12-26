import Back from "@icons/back.svg";
import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";

type BackButtonProps = {
  className?: string;
  href: string;
  width?: number;
  height?: number;
};

export const BackButton: React.FC<BackButtonProps> = ({
  className,
  href,
  width = 12,
  height = 12,
}) => {
  return (
    <Link className={cn("", className)} href={href}>
      <Back
        alt="Назад"
        className={cn(
          "object-cover transition-all duration-200 ease-in-out hover:scale-[0.9]",
          `w-${width} h-${height}`,
        )}
      />
    </Link>
  );
};
